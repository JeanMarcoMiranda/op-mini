import React from "react";

import Home from "../views/Home/Home";

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
  }
]