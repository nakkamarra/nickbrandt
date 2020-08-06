import React from 'react';

import {
  TechIconMeta,
  TechIconType,
} from '../models/tech';

// SVGs
import { ReactComponent as GoLogo } from '../assets/tech/go.svg';
import { ReactComponent as RustLogo } from '../assets/tech/rust.svg';
import { ReactComponent as DockerLogo } from '../assets/tech/docker.svg';
import { ReactComponent as TypescriptLogo } from '../assets/tech/typescript.svg';
import { ReactComponent as ReduxLogo } from '../assets/tech/redux.svg';
import { ReactComponent as GraphQLLogo } from '../assets/tech/graphql.svg';
import { ReactComponent as ApolloLogo } from '../assets/tech/apollo.svg';
import { ReactComponent as ReactLogo } from '../assets/tech/react.svg';
import { ReactComponent as YarnLogo } from '../assets/tech/yarn.svg';
import { ReactComponent as ElasticLogo } from '../assets/tech/elastic.svg';
import { ReactComponent as LetsEncryptLogo } from '../assets/tech/letsencrypt.svg';


interface Props {
  meta: TechIconMeta;
}

export const TechIcon: React.FC<Props> = ({
  meta,
}: Props) => (
  <a
    href={meta.href}
    title={meta.title}
    aria-label={meta.title}
  >
    <SVGIcon
      type={meta.type}
      fill={meta.fill}
      alt={meta.title}
    />
  </a>
);

interface SVGProps {
  type: TechIconType;
  fill?: string;
  alt?: string;
  height?: number;
  width?: number;
}

const SVGIcon: React.FC<SVGProps> = ({
  type,
  fill = '#000000',
  alt = 'SVG Icon',
  height = 48,
  width = 48,
}: SVGProps) => {
  switch (type) {
    case 'apollo':
      return <ApolloLogo fill={fill} title={alt} height={height} width={width} />;
    case 'docker':
      return <DockerLogo fill={fill} title={alt} height={height} width={width} />;
    case 'elastic':
      return <ElasticLogo fill={fill} title={alt} height={height} width={width} />;
    case 'go':
      return <GoLogo fill={fill} title={alt} height={height} width={width} />;
    case 'graphql':
      return <GraphQLLogo fill={fill} title={alt} height={height} width={width} />;
    case 'letsencrypt':
      return <LetsEncryptLogo fill={fill} title={alt} height={height} width={width} />;
    case 'react':
      return <ReactLogo fill={fill} title={alt} height={height} width={width} />;
    case 'redux':
      return <ReduxLogo fill={fill} title={alt} height={height} width={width} />;
    case 'rust':
      return <RustLogo fill={fill} title={alt} height={height} width={width} />;
    case 'typescript':
      return <TypescriptLogo fill={fill} title={alt} height={height} width={width} />;
    case 'yarn':
      return <YarnLogo fill={fill} title={alt} height={height} width={width} />;
    default:
      return <svg fill={fill} />;
  }
};