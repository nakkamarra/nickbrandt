import React from 'react';

interface Props {
  className?: string;
}

export const Bio: React.FC<Props> = ({
  className = 'biography',
}: Props) => (
  <div className={className} />
);