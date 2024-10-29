import React from 'react';
import { useRouteMatch } from 'react-router';

type Props = {};

const ConnectApp = (props: Props) => {
  const match = useRouteMatch();

  return (
    <div>
      <h1>ConnectApp</h1>

      <p>Region: {match.params.region}</p>
      <p>ID: {match.params.id}</p>
    </div>
  );
};

export default ConnectApp;
