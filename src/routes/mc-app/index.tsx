import React from 'react';
import { useRouteMatch } from 'react-router';

type Props = {};

const McApp = (props: Props) => {
  const match = useRouteMatch();

  return (
    <div>
      <h1>MC App</h1>

      <p>Region: {match.params.region}</p>
      <p>ID: {match.params.id}</p>
    </div>
  );
};

export default McApp;
