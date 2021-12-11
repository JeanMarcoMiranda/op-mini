import { BriefcaseIcon, ClipboardListIcon, HomeIcon, UsersIcon, ClipboardCheckIcon, BookmarkAltIcon, ShoppingCartIcon, ClipboardIcon, PresentationChartBarIcon, DocumentReportIcon } from "@heroicons/react/solid";

const navRoutes: RouteSideBar[] = [
  {
    label: 'Inicio',
    Icon: HomeIcon,
    path: '/',
    roles: ['Administrador', 'Almacenero', 'Empleado', 'Comprador']
  },
  {
    label: 'Productos',
    Icon: ClipboardListIcon,
    path: '/product',
    roles: ['Administrador', 'Almacenero', 'Empleado', 'Comprador']
  },
  {
    label: 'Categorías',
    Icon: BookmarkAltIcon,
    path: '/category',
    roles: ['Administrador', 'Almacenero', 'Empleado', 'Comprador']
  },
  {
    label: 'Proveedores',
    Icon: BriefcaseIcon,
    path: '/supplier',
    roles: ['Administrador', 'Empleado', 'Comprador']
  },
  {
    label: 'Usuarios',
    Icon: UsersIcon,
    path: '/user',
    roles: ['Administrador']
  },
  {
    label: 'Pedidos',
    Icon: ClipboardCheckIcon,
    path: '/order',
    roles: ['Administrador', 'Empleado', 'Comprador']
  },
  {
    label: 'Ventas',
    Icon: ShoppingCartIcon,
    path: '/sale',
    roles: ['Administrador', 'Empleado']
  },
  {
    label: 'Turnos',
    Icon: ClipboardIcon,
    path: '/shift',
    roles: ['Administrador', 'Empleado']
  },
  {
    label: 'Movimientos',
    Icon: PresentationChartBarIcon,
    path: '/activity',
    roles: ['Administrador', 'Empleado']
  },
  {
    label: 'Reportes',
    Icon: DocumentReportIcon,
    path: '/reportes',
    roles: ['Administrador', 'Empleado']
  }
]

export default navRoutes
