+++
title="why we decided against graphql for local state management"
description="an article about graphql and state management, orginally posted on the OkCupid tech blog"
date=2020-08-20

[taxonomies]
tags = ["react", "graphql", "redux"]
categories = ["software"]
+++
# Why we decided against GraphQL for local state management

## Preface and motivation

Here at OkCupid, we're pretty big fans of using [GraphQL](https://graphql.org/). When it comes to fetching data 
on any of our client platforms, the abstraction that the query language provides grants the flexibility for us to 
fetch precisely the data that we need in each situation.

At the end of the day, GraphQL really is just that: an abstraction. The mutation, query, and subscription types abstractly model the fundamental ways in which we interact with any data. The schema serves as a contract between some source of data and its destination, and it defines what data can be queried and how it ought to be queried. The data that an incoming query outlines would be resolved by our GraphQL server instance in this case, but the destination of that data (in our case, let's say it's a mobile app or web app acting as a client), doesn't really need to know about the source or resolution strategy of the data in question.

This is really nice, because it means that the data can come from anywhere that the GraphQL server has access to. Maybe we want to resolve our data using something in the filesystem, or maybe a local database, or maybe a remote one. Perhaps we can call some other server exposed to us, via RPC or REST or any protocol, really. Maybe our data is currently in memory somewhere and that's technically fine as well! That indifference of our datasource(s) is what allows this model, and the architecture of a data graph to be so scalable (Mandi Wise has a great video that demonstrates this while [covering the concept of a federated graph](https://www.youtube.com/watch?v=v_1bn2sHdk4&feature=emb_title)).

Regardless of the source of the data, the client implementation doesn't really need to change at all, and that's **crucially** important to understanding the notion of using GraphQL for local state management. Imagine your application's local state: it really is just another source of data, after all, isn't it? So, then the question is, what is stopping us from leveraging the abstraction provided to us by this query language paradigm to manage this data as well? 

## How it works

Well, the answer is nothing *really*. If you are storing state somewhere in your application, you can theoretically just resolve GraphQL queries with that state data if you want. The implementation from [Apollo](https://www.apollographql.com/) that we experimented with uses a GraphQL directive to denote which pieces of a given query should be resolved in this manner: `@client`. One can then write a query for local data like so:

```graphql
query fetchUserData($userId: ID!) {
	user(id: $userId) {
		name
		bio
		somePieceOfClientSideState @client
	}
}
```

Due to the [strategy](https://github.com/apollographql/apollo-client/blob/144155c5b16dd36f052d8f7f9401bde51162b8b4/src/utilities/graphql/directives.ts#L46) for resolving this directive being a traversal, it means that we can apply this directive across parent-child and neighbor-neighbor relationships in our data, allowing us to achieve the same experience of a data graph, except with our client state. It also allows us to use the `@client` directive to resolve only specific Fields or Fragments of a given query using the data on the client, and the rest can resolve to hitting our server or whatever we've configured our `ApolloClient` instance to use. 

What does this mean? Well, in practicality, let's take the example of the field we defined above, `somePieceOfClientSideState`. If the field is Scalar, everything works fine, but imagine it as another object node that we may want to fetch data for, as well. The top-level `@client` directive denotes that the object node and any of it's fields, too, should be resolved from the client.

```graphql
query fetchUserData($userId: ID!) {
	user(id: $userId) {
		name
		bio
		somePieceOfClientSideState @client {
			somePropertyOfClientSideState
		}
	}
}
```

So, how does something like this work? Well, under the hood, we need to add some new pieces of configuration to our `ApolloClient` instance in order for it to have a strategy for resolving client-side queries. To do so, we explicitly spell this out by adding some new resolvers to our client, just like we would write to resolve queries on our server instance. The `ApolloClient` instance can add resolvers both upon initialization, as well as on an ad-hoc basis using `client.addResolver(someNewResolverToAdd)`. Apollo defines the function signature that handles resolution like so, which ought to look very familiar if you've worked with `apollo-server` in the past: 

```typescript
type ResolverFn = (
  parent: any, 
  args: any, 
  { cache } : { cache: ApolloCache<any> }
) => any;
```

Ignoring the parent node and the arguments, we see that we destructure a property off of an object, called `cache`, much like we destructure a `dataSources` property in the `apollo-server` parallel to this function type. That's because in this scenario, our cache has taken the responsibility of the datasource in our client-side world. Let's see what a client-side resolver setup would look like in this context:

```javascript
const defaultResolver = {
	Query: {
		user: {
			somePieceOfClientSideState: (parent, args, { cache }) => {
				// reference the cache to get your data,
				// this is just an example
				return cache.readQuery({  
					query: SOME_QUERY,
					variables: {
						id: parent.id,
					}
				})
			},
		},
	},
};
```

After that, we'll also want to provide the cache with some initial state too, so that our first cache read will resolve, so we'll want to define that as well and feed it to our cache upon initialization.

```javascript
// define initial client-side state 
const defaultState = {
	user: {
		somePieceOfClientState: {
			__typename: "ClientSideState",
			somePropertyOfClientSideState: false,
		}
	}
}

const client = new ApolloClient({
	// other apollo config, such as link
	// and cache definitions
	resolvers: defaultResolver,
});

// Prime the cache with your initial state
client.writeData({
	query: SOME_QUERY,
	data: {
		defaultState,
	}
})
```

The intuition that Apollo had was to not only provide this directive and the option to resolve queries on the client side, but to offer up the client-side cache that most `ApolloClient` instances define anyway (which is normally used to store responses for our queries that do actually resolve on the server) as a location to store this client state. This makes a lot of sense, we have a local store (our `ApolloClient`'s cache) and we have a way to interact with that store (using gql)... This is, in essence, what a solution like [Redux](https://redux.js.org) (which I'm sure needs no introduction at this point) or [MobX](https://mobx.js.org) offers us right?

Well, yes. It works perfectly fine, too! As we explored this as an option however, we noticed a few things that eventually led us to make the decision to not rely on Apollo for state management.

## The issues we encountered

So why did we decide against implementing this then? Well, the reasoning behind the decision is certainly specific to our scenario and maybe won't be as important to others, but does contain some insights that I feel will be considerations that anyone going down the Apollo path will have to weigh as well. 

### The developer overhead and learning curve

Although this works as a stage management solution, it comes with some new overhead. One will have to write resolvers for their client-side state now, and although that is the case for *any* state management option, it is not as simple as it may seem. To really write these resolvers properly, you will want to have some experience / aptitude in working with the cache directly. As of version 3.0, `apollo/client` has had some [pretty drastic updates to how the cache handles normalized and non-normalized data](https://github.com/apollographql/apollo-client/pull/5146). Understanding how the cache uses `id`s and `__typename`s, deciding whether to merge or replace data, and learning how to do so are all par for the course with this paradigm. *Sidenote, Khalil @ Apollo just recently published [an incredible blog post](https://www.apollographql.com/blogdemystifying-cache-normalization/) going into depth about the Apollo cache and understanding cache normalization.* Contrasting this paradigm against something like [React's Context API](https://reactjs.org/docs/context.html) in tandem with the [useReducer hook](https://reactjs.org/docshooks-reference.html#usereducer), or even the Redux architecture, it seems like the Apollo solution is more to understand and manage from a developerperspective. For that tradeoff, though, we do gain the ability to think about and interact with **ALL of our application's data** in the same manner, which is undoubtedly an awesome benefit. But is it worth it? 

### Something new, something borrowed?

Well, we're already working with Redux here at OkC. The "Redux is dead" argument has been posed many times, and the traditional costs associated with it that come in the form of **tons** of boilerplate and wrapping components can easily be argued to not be very scalable, as one has to make changes to a handful of files before getting anywhere. Despite this, though, it definitely has matured over the years. If done right, it can definitely be a breeze to work with and it clearly does have some staying power (not to mention, working with the Redux hooks is actually really nice). Ripping out existing architecture would take months, and adding another paradigm to learn and follow alongside the existing Redux would cause more context switching when writing code, and probably just confuse and burden the developers more.

On top of that, there are also countless resources at one's disposal for using and understanding Redux (or any mature OSS, for that matter), one thing that I certainly had issues with personally when researching the Apollo client-side state management; there just aren't as many docs, videos, and articles on the Apollo approach, perhaps because it is more obscure or infant when compared to something like Redux. Also, a more mature solution could potentially offer more value in the terms of defining a stable API for the developer to work with, whereas a younger one could be more turbulent in that regard (that is all very situational, though, I will admit). However, the common argument against Redux of having to "change so many files" and "it being overly complicated" doesn't really seem remedied by Apollo's solution. We'd still want to sensibly colocate the definition of resolvers and initial state, and after having done something like that myself, I felt like I was just writing the boilerplate for some Redux which felt pretty ironic to me. Working with the cache directly doesn't seem less complicated to me than working with the store,either.

Apollo also has a Dev Tools offering as well, which I really liked using and found to be useful as well, but it too feels a tad immature when put up against something like Redux's parallel. Sometimes, it doesn't want to launch. It doesn't offer interesting features like Time Travel, and the one thing I was excited about using it for, which was the client-side introspection, would have required defining `typeDefs` on the `ApolloClient` instance (another whole set of things to worry about and manage, but I'll admit that perhaps Typescript or codegen could really shine in this scenario).

### Other options

We also have been experimenting with React's Context API, and presumably will want to consider some other options in the future as well. However, the consideration of what we choose having implications on our bundle size is super important to us as well. Could Context/Apollo remove the need for a state management dependency altogether? For some simpler applications, I think there examples out there where Context has been proven to be more than enough. Likewise, there are some examples of Apollo's solution being more than enough as well! There's also MobX, and even some more interesting  proposals like modeling your client-side state using a state machine with [XState](https://xstate.js.org/).

## Where do we net out?

It is hard not to recognize the incredible work that Apollo has done. Pursuing this option, however, has major implications for our codebase, and at this time we just didn't feel the argument was compelling enough given the maturity of Apollo's client-side state management. The return-on-investment of implementing something new in a codebase with a lot of existing architecture needs to be relatively high in my opinion. Armed with some new insights after having explored Apollo's offering some more, we will hopefully be able to come to a better conclusion eventually though about what we should rely on to solve this problem, and how we should think about the approach, architecture, and trade-offs of any library, framework, or tool we decide to roll with. Until then, we'll continue to keep on our eyes on it for sure.

[Originally posted on the OkCupid tech blog](https://tech.okcupid.com/okcupid-blog-why-we-decided-against-graphql-for-local-state-management-a45ba442a0a6)