import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { appRoutes } from './Routes'

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          { appRoutes.map( ({path, component, exact}) =>
            <Route exact={exact} path={path} component={component} key={path}/>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
