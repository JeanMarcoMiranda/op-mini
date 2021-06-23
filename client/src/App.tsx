import { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { appRoutes, navRoutes } from './routes';
import { Header, SideBar } from './components/layout';
import './App.css';
import AuthRoute from './routes/AuthRoute';

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white App">
      <Router>
        <Header navToggle={setSideBarOpen} />
        <SideBar routes={navRoutes} isOpen={sideBarOpen} />
        <div
          className="h-full mt-14"
          onClick={() => {
            if (sideBarOpen) setSideBarOpen(false);
          }}
        >
          <Switch>
            {appRoutes.map(({ path, component, exact, type }) => (
              <AuthRoute
                exact={exact}
                path={path}
                component={component}
                type={type}
              />
            ))}
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
