import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { appRoutes } from './routes'

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          { appRoutes.map( ({path, component, exact}) =>
            <Route exact={exact} path={path} component={component}/>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
