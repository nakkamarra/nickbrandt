import React from 'react';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

const getContributions = loader('../services/getContributions.gql');

interface Props {
  className?: string;
}

export const GitHub: React.FC<Props> = ({
  className = 'github',
}: Props) => {
  const { error, loading, data } = useQuery(getContributions, {
    variables: { login: 'nakkamarra' },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error :( ${error}`}</p>;

  return (
    <div className={className}>
      <a href={data.user.url}>
        {data.user.login}
      </a>
    </div>
  );
};