+++
title="internationalizing and localizing your app, part 2: web tooling"
description="second part of an article about internationalization, orginally posted on the OkCupid tech blog"
date=2021-07-17

[taxonomies]
tags = ["i18n"]
categories = ["software"]
+++
# Internationalizing and Localizing Your App, Part 2: Web Tooling

*In part two of this four part tutorial, learn how to pick the right tools to support a modern React web app with legacy HTML templated components.*

*Check out part 1 of this series [here](https://tech.okcupid.com/internationalizing-and-localizing-your-app-part-1-understanding-different-cultures-cd25422378f0).*

## Legacy Apps, Legacy Tools

An awareness of the state of the existing codebase’s technology is an important consideration when picking the right tools for localizing your product. OkCupid is a 17 year old codebase but refreshingly, most of our app these days is in a single page React application. Despite this, we still have a few stubborn lingering legacy pages and older REST endpoints that we support. So, we really needed tools that would fit the mold of what our application required.

For our older codebase that houses our older template-based web files, REST API, web views loaded by the mobile apps, and some older vanilla javascript files, we ended up using a custom implementation of **[gettext](https://en.wikipedia.org/wiki/Gettext)**, a mature GNU library that includes a suite of simple yet robust localization utilities such searching files for keywords and extracting them as messages in a catalog format file type known as **Portable Object**, or PO files. Essentially, we would update these older files to use **gettext** keywords, and extract them to PO catalogs for submitting to translators.

PO files are great for this purpose, as they not only support the typical key-value pairs needed for translations, but also support tons of optional metadata fields like comments which can be populated to help give translators a higher fidelity picture into how a given string is being used or should be interpreted. It’s also worth noting that a team at **Mozilla** has released an initial version of [Fluent](https://projectfluent.org), a very flexible message syntax for localization, which I think is certainly something to consider, given how many of the internationalization problems it seems to have accounted for right off the bat. We’ll definitely be keeping an eye on it as it matures.

## React App, React Tools

For the bulk of the user-facing frontend web code, our single page React app, we ended up deciding to us a tool called **[Lingui JS](https://github.com/lingui/js-lingui)**, a tiny vanilla JavaScript library with some very interesting React and Babel bindings. It has a general toolkit of internationalization solutions like variable interpolation, plural rules, translating with grammatical gender, date / time / number formatting, and more. It’s nice that Lingui can be used in the context of both React and plain ole JavaScript, as it means we have the flexibility to leverage Lingui regardless of whether or not we’re in a strictly React context. However, one of the main reasons we decided to choose this tool was how its API and automation capability were as close to a drop-in solution as we would get given the status of our codebase at the time. It also allows for various configurations, one of which includes using PO files with messages encoded in the [ICU message format](http://userguide.icu-project.org/formatparse/messages), giving us both the simplicity and metadata of the PO files along with added features from the ICU message format like grammatical gender and JSX-like tokenization.

We could perform some refactors to use Lingui while we localized the app, and then leverage the **Lingui CLI to extract all of our user-facing messages out into our PO catalog files** so they can be sent to translators. Let’s take a look at what a simple example of what the old custom code we had would have looked like, then refactor a bit and break down how Lingui helps us to achieve our goal:

```jsx
import React from "react";
import { Str, Strf } from "src/util/StringFormatting";

const LikedYouMessageCTA = ({ username, numberOfLikes }) => (
	<h2>
		<Strf vars={{ $username: <b>{username}</b> }}>
			$username liked you!
		</Strf>
		<Strf vars={{ $numberOfLikes: numberOfLikes }}>
			$numberOfLikes other users also liked you!
		</Strf>
	</h2>
	<button>
		<Str>Click Here to View!</Str>
	</button>
);
```

There are a few main issues with internationalizing this component. Firstly, the h2's content is using a custom formatting component which will interpolate complex values into strings which is nice, but it doesn't account for either pluralization rules or grammatical gender rules. In the first phrase, {username} liked you!, there are languages like Italian in which the translation of the rest of the sentence depends on the gender of username. In the second example, we always show the words other users regardless of the value of numberOfLikes. In English this wouldn't be correct, as the value could be 1 and then the message should be other user. That's fine, just check if the value of `numberOfLikes === 1` and then display a different message, right? Well, no... many other languages have different plural rules, in which words or phrases change based on whether the value of a subject is equal to 1, or 2, or 5, or 21... you get the idea, there are specific rules for this in each language (as well as language specific rules about **ordinality**, such as first, second, third, etc).

On top of that, the vars definition here is a tad clunky, and needs to depend on a placeholder format which is not native to React, meaning developers who want to use it will need to learn how it specifically works. Let's see how we'd handle this with Lingui:

```jsx
import React from "react";
import { Trans, Plural, Select } from "@lingui/macro";
const LikedYouMessageCTA = ({ username, userGender, numberOfLikes }) => (
	<h2>
		<Select
			value={userGender}
			male={`{username} liked you!`}
			female={`{username} liked you!`}
			other={`They liked you!`}
		/>
		<Plural
			value={numberOfLikes}
			one="One other user also liked you!"
			other="# other users also liked you!"
		/>
	</h2>
	<button>
		<Trans>Click Here to View!</Trans>
	</button>
);
```

That looks a lot better, so now let’s take a look at what these messages will extract to when they are pulled out into our catalogs. Here, the msgid is the ID of the message (in our case, the source English string), and the msgstr is the translated version (in this case, it's English but if this were translated, it would be the translated version of the text):

```
#: src/LikedYouMessageCTA.jsx
msgid "Click Here to View!"
msgstr "Click Here to View!"

#: src/LikedYouMessageCTA.jsx
msgid "{numberOfLikes, plural, one {One other user also liked you!} other {# other users also liked you!}}"
msgstr "{numberOfLikes, plural, one {One other user also liked you!} other {# other users also liked you!}}"

#: src/LikedYouMessageCTA.jsx
msgid "{userGender, select, male {{username} liked you!} female {{username} liked you!} other {They liked you!}}"
msgstr "{userGender, select, male {{username} liked you!} female {{username} liked you!} other {They liked you!}}"
```

We can see that our Select and Plural are pulled out into the respective syntaxes in ICU message format, allowing us to send these strings up to translators and allowing them to properly populate them with different values, including `msgstr`s that include translated ICU plurals and selects. But if other languages have different plural rules, the `msgstr` will change given those rules, no?

That’s correct, and imagine for the purpose of demonstration that there is a slightly different component rendering a shorter plural. Something like this would happen when we would send our message to be translated into Polish:

```
#: src/SomeOtherComponent.jsx
msgid "{numberOfEyes, plural, one {One eye} other {# eyes}}"
msgstr "{numberOfEyes, plural, one {Jedno oko} few {# oczy} many {# oczu} other {# oczów}}"
```

This is where the beauty of Lingui comes into play. We can simply define our components using only the plural forms needed by our source language, and Lingui’s macro components will handle the rest. These macros leverage [babel macros](https://github.com/kentcdodds/babel-plugin-macros) to hook into babel to run compile-time transformations of our code. When we extract our messages, the macros are used to tell Lingui that a message should be pulled out and what metadata it should include. When we compile, the macros will replace references from @lingui/macro to references from the @lingui/react package which houses the "real" React components. These are Context.Consumers of Lingui's I18nProvider and can read the locale-specific plural data from the active catalog and know exactly how to pluralize or genderize the translated message.

There are [many other great features of Lingui outlined in their docs](https://lingui.js.org/), but there are far too many for me to cover entirely in this post, so I’ll leave the discussion of Lingui with the comment that it has been fairly ergonomic and has easily fit itself in many different situations in our ever-evolving React codebase, so it’s definitely worth consideration.

*Check out part 3 of this series [here](https://tech.okcupid.com/internationalizing-and-localizing-your-app-part-3-technical-challenges-8d91b6cb9125).*
