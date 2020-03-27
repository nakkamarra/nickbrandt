import React from 'react';
import { SocialIconMeta, SocialIconType } from '../models/social';

import { ReactComponent as LinkedIn } from '../assets/social/linkedin.svg';
import { ReactComponent as Twitter } from '../assets/social/twitter.svg';
import { ReactComponent as Medium } from '../assets/social/medium.svg';
import { ReactComponent as GitHub } from '../assets/social/github.svg';


interface Props {
  meta: SocialIconMeta;
}

export const SocialIcon: React.FC<Props> = ({
  meta,
}: Props) => (
  <a
    href={meta.href}
    title={meta.title}
    aria-label={meta.description}
  >
    <SVGIcon
      type={meta.type}
      fill={meta.fill}
      alt={meta.title}
    />
  </a>
);

interface SVGProps {
  type: SocialIconType;
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
    case 'linkedin':
      return <LinkedIn fill={fill} title={alt} height={height} width={width} />;
    case 'twitter':
      return <Twitter fill={fill} title={alt} height={height} width={width} />;
    case 'medium':
      return <Medium fill={fill} title={alt} height={height} width={width} />;
    case 'github':
      return <GitHub fill={fill} title={alt} height={height} width={width} />;
    default:
      return <svg fill={fill} />;
  }
};