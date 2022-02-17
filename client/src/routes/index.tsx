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
import CategoryView from "../views/Categories";
import CategoryForm from "../views/Categories/Form";
import SaleView from "../views/Sales";
import SaleForm from "../views/Sales/Form";
import ShiftView from "../views/Shifts";
import ShiftForm from "../views/Shifts/Form";
import ActivityView from "../views/Activities";
import ReportView from "../views/Reports";

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
    roles: ['Administrador', 'Almacenero', 'Empleado', 'Comprador']
  },
  {
    path: '/order/create/:id',
    component: OrderForm,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Empleado']
  },
  {
    path: '/category',
    component: CategoryView,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Almacenero', 'Empleado', 'Comprador']
  },
  {
    path: '/category/form',
    component: CategoryForm,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Almacenero']
  },
  {
    path: '/category/form/:id',
    component: CategoryForm,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Almacenero']
  },
  {
    path: '/category/update/:id',
    component: CategoryForm,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/sale',
    component: SaleView,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Empleado']
  },
  {
    path: '/sale/form',
    component: SaleForm,
    exact: true,
    type: 'private',
    roles: ['Administrador', 'Empleado']
  },
  {
    path: '/sale/form/:id',
    component: SaleForm,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/shift',
    component: ShiftView,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/shift/form',
    component: ShiftForm,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/shift/form/:id',
    component: ShiftForm,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/activity',
    component: ActivityView,
    exact: true,
    type: 'private',
    roles: ['Administrador']
  },
  {
    path: '/reportes',
    component: ReportView,
    exact: false,
    type: 'private',
    roles: ['Administrador']
  }
]

export { appRoutes, navRoutes }
