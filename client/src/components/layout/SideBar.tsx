import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import { generateString } from '../utils'
import { RootState } from '../../store/store';

interface SideBarProps {
  routes: RouteSideBar[],
  color?: string,
  activeColor?: string,
  isOpen: boolean,
}

const SideBar: React.FC<SideBarProps> = ({
  routes,
  color = "gray",
  activeColor = "blue",
  isOpen,
}) => {
  const { pathname } = useLocation()
  const { userData: { role: { name } } } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  return (
    <div className={`fixed flex flex-col top-14 left-0 w-72 h-full duration-500 border-none z-10 shadow-lg transform
     ${isOpen
        ? "translate-x-0 ease-out transition-medium"
        : "-translate-x-72 ease-in transition-medium"
      }
    `}>
      <div className="bg-white h-full dark:bg-gray-700 py-4">
        <nav className="">
          <div className="text-left text-sm font-normal tracking-wide text-gray-600 dark:text-white uppercase pl-5 mb-4">
            Principal
          </div>
          <div>
            {routes.map( ({ label, Icon, path, roles }) => {
              if ( !roles.find(r => r === name) ) return
              return (<NavLink className={`
                w-full font-thin uppercase flex items-center p-4
                transition-colors duration-200 justify-start
                ${ pathname === path ? `
                  text-${activeColor}-600
                  bg-gradient-to-r from-white to-${activeColor}-100
                  border-r-4 border-${activeColor}-600
                  dark:from-gray-700 dark:to-gray-800
                  border-r-4 border-${activeColor}-600
                  ` : `
                  text-${color}-600
                  dark:text-${color}-200
                  hover:text-${activeColor}-600
                ` }
              `} to={path} key={generateString(5)}>
                <span className="text-left">
                  <Icon width={20} height={20} />
                </span>
                <span className="mx-4 text-sm font-normal">
                  {label}
                </span>
              </NavLink>
            )})}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default SideBar
