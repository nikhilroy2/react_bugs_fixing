import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { defaultRoutesArray } from '../services/routes';

const Main = () => (
  <Switch>
    {defaultRoutesArray?.map((route) => (
      <Route key={route.id} exact path={route.link} component={route.component} />
    ))}
  </Switch>
);

export default Main;
