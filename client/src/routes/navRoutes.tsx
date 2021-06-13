import { ComponentProps } from "react";
import { BriefcaseIcon, ClipboardListIcon, HomeIcon, UsersIcon } from "@heroicons/react/solid";

interface RouteSideBar {
  label: string;
  Icon: (props: ComponentProps<'svg'>) => JSX.Element;
  path: string;
}

const navRoutes: RouteSideBar[] = [
  {
    label: 'Inicio',
    Icon: HomeIcon,
    path: '/'
  },
  {
    label: 'Productos',
    Icon: ClipboardListIcon,
    path: '/product'
  },
  {
    label: 'Proveedores',
    Icon: BriefcaseIcon,
    path: '/supplier'
  },
  {
    label: 'Usuarios',
    Icon: UsersIcon,
    path: '/user'
  },
]

export default navRoutes
