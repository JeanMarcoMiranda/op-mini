import { BriefcaseIcon, ClipboardListIcon, HomeIcon, UsersIcon, ClipboardCheckIcon, BookmarkAltIcon } from "@heroicons/react/solid";

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
    path: '/categories',
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
    roles: ['Administrador']
  },
]

export default navRoutes
