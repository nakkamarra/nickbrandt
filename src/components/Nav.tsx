import React from 'react';

interface Props {
  className?: string;
}

export const Nav: React.FC<Props> = ({
  className = 'navigation',
}: Props) => (
  <nav className={className} />
);