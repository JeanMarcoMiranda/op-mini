import React from "react";

import Home from "../views/Home";
import Login from "../views/Login";

interface RouteData {
  path: string,
  component: React.ComponentType,
  exact: boolean
}

export const appRoutes: RouteData[] = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  }
]
