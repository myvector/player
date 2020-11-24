import React from 'react';
import globalStyles from './app.css';
import withStore from '~/hocs/withStore';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from '~/router';

class App extends React.Component {
  state = {};

  render() {
    const routesComponents = routes.map((el) => {
      return (
        <Route
          key={el.path}
          path={el.path}
          component={el.component}
          exact={el.exact}
        />
      );
    });
    return <Router>{<Switch>{routesComponents}</Switch>}</Router>;
  }
}

export default withStore(App);
