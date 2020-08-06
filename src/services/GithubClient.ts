import ApolloClient from 'apollo-boost';

export const githubClient = new ApolloClient({
  headers: {
    authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
  },
  uri: process.env.REACT_APP_GITHUB_API_URL,
});