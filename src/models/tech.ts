/**
 * Describes the necessary information to style and
 * render a tech icon
 */
export interface TechIconMeta {
  href: string;
  title: string;
  type: TechIconType;
  fill: string;
}

/**
 * Describes the possible values for the icon names; used
 * to clarify which `.svg` file to import.
 */
export type TechIconType =
  | 'apollo'
  | 'docker'
  | 'elastic'
  | 'go'
  | 'graphql'
  | 'letsencrypt'
  | 'react'
  | 'redux'
  | 'rust'
  | 'typescript'
  | 'yarn';

const ApolloMeta: TechIconMeta = {
  href: 'https://www.apollographql.com/',
  title: 'Apollo GraphQL',
  type: 'apollo',
  fill: '#2F353F',
};

const DockerMeta: TechIconMeta = {
  href: 'https://www.docker.com/',
  title: 'Docker',
  type: 'docker',
  fill: '#007bff',
};

const ElasticMeta: TechIconMeta = {
  href: 'https://www.elastic.co/',
  title: 'Elastic',
  type: 'elastic',
  fill: '#ffc107',
};

const GolangMeta: TechIconMeta = {
  href: 'https://www.golang.org/',
  title: 'Golang',
  type: 'go',
  fill: '#00acd7',
};

const GraphqlMeta: TechIconMeta = {
  href: 'https://graphql.org/',
  title: 'GraphQL',
  type: 'graphql',
  fill: '#e10098',
};

const LetsEncryptMeta: TechIconMeta = {
  href: 'https://letsencrypt.org/',
  title: 'Let\'s Encrypt',
  type: 'letsencrypt',
  fill: '#2C3C69',
};

const ReactMeta: TechIconMeta = {
  href: 'https://reactjs.org/',
  title: 'React JS',
  type: 'react',
  fill: '#61dafb',
};

const ReduxMeta: TechIconMeta = {
  href: 'https://redux.js.org/',
  title: 'Redux JS',
  type: 'redux',
  fill: '#593d88',
};

const RustMeta: TechIconMeta = {
  href: 'https://www.rust-lang.org//',
  title: 'The Rust programming language',
  type: 'rust',
  fill: '#000000',
};

const TypescriptMeta: TechIconMeta = {
  href: 'https://typescriptlang.org/',
  title: 'Typescript',
  type: 'typescript',
  fill: '#3178c6',
};

const YarnMeta: TechIconMeta = {
  href: 'https://yarnpkg.com/',
  title: 'Yarn Package Manager',
  type: 'yarn',
  fill: '#25799f',
};

export const TechMetadata = [
  ApolloMeta,
  DockerMeta,
  ElasticMeta,
  GolangMeta,
  GraphqlMeta,
  LetsEncryptMeta,
  ReactMeta,
  ReduxMeta,
  RustMeta,
  TypescriptMeta,
  YarnMeta,
];