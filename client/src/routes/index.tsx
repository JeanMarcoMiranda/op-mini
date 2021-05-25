import React from "react";
import Home from "../views/Home";
import Supplier from "../views/Suppliers";

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
    path: '/supplier',
    component: Supplier,
    exact: true
  }
]
