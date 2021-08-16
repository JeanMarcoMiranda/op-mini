import Login from "../views/Login";
import Home from "../views/Home";
import ProductsView from "../views/Products";
import SupplierView from "../views/Suppliers";
import UserView from "../views/Users";
import ProductForm from "../views/Products/Form";
import SupplierForm from "../views/Suppliers/Form";
import navRoutes from "./navRoutes";
import UserForm from "../views/Users/Form";
import OrderView from "../views/Orders";
import OrderForm from "../views/Orders/Form";


const appRoutes: RouteData[] = [
  {
    path: '/login',
    component: Login,
    exact: true,
    type: 'guest'
  },
  {
    path: '/',
    component: Home,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Almacenero', 'Empleado', 'Comprador']
  },
  {
    path: '/supplier',
    component: SupplierView,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Empleado', 'Comprador']
  },
  {
    path: '/supplier/form',
    component: SupplierForm,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/supplier/form/:id',
    component: SupplierForm,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/product',
    component: ProductsView,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Almacenero', 'Empleado', 'Comprador']
  },
  {
    path: '/product/form',
    component: ProductForm,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Almacenero']
  },
  {
    path: '/product/form/:id',
    component: ProductForm,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Almacenero']
  },
  {
    path: '/product/search/:name',
    component: ProductsView,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Almacenero', 'Empleado', 'Comprador']
  },
  {
    path: '/user',
    component: UserView,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/user/form',
    component: UserForm,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/user/form/:id',
    component: UserForm,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/user/edit',
    component: UserForm,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Almacenero', 'Empleado', 'Comprador']
  },
  {
    path: '/order',
    component: OrderView,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Comprador']
  },
  {
    path: '/order/create/:id',
    component: OrderForm,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
]

export { appRoutes, navRoutes }
