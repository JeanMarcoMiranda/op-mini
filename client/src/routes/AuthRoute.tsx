import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'

import { RootState } from '../store/store';

const AuthRoute: React.FC<RouteData> = ({
  type,
  exact,
  path,
  component,
  roles = []
}) => {
  const { isAuthUser, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  if (type === 'guest' && isAuthUser) return <Redirect to='/' />;
  else if (type === 'private' && !isAuthUser) return <Redirect to='/login' />;

  if (type === 'private') {
    if (!roles.find(r => r === userData.role.name)) return <Redirect to='/' />
  }

  return <Route
    exact={exact}
    path={path}
    component={component}
    key={path}
  />
}

export default AuthRoute
