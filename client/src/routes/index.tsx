import React from "react";

import Login from "../views/Login";
import Home from "../views/Home";
import ProductsPage from "../views/Products";
import Supplier from "../views/Suppliers";
import SupplierForm from "../views/Suppliers/supplierForm";

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
    path: '/suppliers',
    component: Supplier,
    exact: true
  },
    {
    path: '/supplier/update/:id',
    component: SupplierForm,
    exact: true
  },
  {
    path: '/product',
    component: ProductsPage,
    exact: true
  }
]
