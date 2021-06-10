import React from "react";

import Login from "../views/Login";
import Home from "../views/Home";
import ProductsView from "../views/Products";
import SupplierView from "../views/Suppliers";
import UserView from "../views/Users";
import ProductForm from "../views/Products/Form";
import SupplierForm from "../views/Suppliers/Form";
import UserForm from "../views/Users/Form";

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
  },
  {
    path: '/supplier',
    component: SupplierView,
    exact: true
  },
  {
    path: '/supplier/form',
    component: SupplierForm,
    exact: true
  },
  {
    path: '/supplier/form/:id',
    component: SupplierForm,
    exact: true
  },
  {
    path: '/product',
    component: ProductsView,
    exact: true
  },
  {
    path: '/product/form',
    component: ProductForm,
    exact: true
  },
  {
    path: '/product/form/:id',
    component: ProductForm,
    exact: true
  },
  {
    path: '/user',
    component: UserView,
    exact: true
  },
  {
    path: '/user/form',
    component: UserForm,
    exact: true
  },
  {
    path: '/user/form/:id',
    component: UserForm,
    exact: true
  },
]
