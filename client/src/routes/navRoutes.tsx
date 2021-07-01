import { BriefcaseIcon, ClipboardListIcon, HomeIcon, UsersIcon } from "@heroicons/react/solid";

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
]

export default navRoutes
