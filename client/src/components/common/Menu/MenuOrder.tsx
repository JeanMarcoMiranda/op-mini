import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  CogIcon,
  DocumentTextIcon,
  LogoutIcon
} from '@heroicons/react/solid';
import {
  CogIcon as OutlineCogIcon,
  DocumentTextIcon as OutlineDocumentTextIcon,
  LogoutIcon as OutlineLogoutIcon
} from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setToken, setAuthUser } from '../../../store/action/actions';
import { RootState } from '../../../store/store';
import { Link, useHistory, useLocation } from 'react-router-dom';

interface MenuOrderProps {
  menuUpdate?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menuDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menuComplete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menuCancel?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menuApprove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IRolesForField {
  [key: string]: {
    roles: Array<String>,
    routes: Array<String>
  }
}

const MenuComponentOrder: React.FC<MenuOrderProps> = ({
  menuUpdate,
  menuCancel,
  menuComplete,
  menuDelete,
  menuApprove
}) => {
  const MENU_ITEM_DEFAULT_STYLE = 'group flex rounded-md items-center w-full p-2 text-sm';

  const { pathname: currentPath } = useLocation()

  // == GLOBAL STATE
  const { userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const userRole = userData.role;

  // == BASED ON ROL ADMINISTRATION VARIABLES
  const ACCESS_ADMINISTRATION_FOR_FIELD: IRolesForField = {
    actions: {
      roles: ["Administrador", "Almacenero"],
      routes: ["/user"]
    }
  }
  const ROLE_KEYS = Object.keys(ACCESS_ADMINISTRATION_FOR_FIELD)
  //const FIELD_NAMES = theadData?.map(field => field.name)

  //console.log(userRole)

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full py-2 text-sm font-medium text-white rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          {/* Items to render when button is clicked */}
          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-36 mt-2 origin-top-right bg-white divide-y divide-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">

              <div className="px-1 py-1">
                {menuComplete && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={menuComplete}
                        className={`${MENU_ITEM_DEFAULT_STYLE} ${active ? 'bg-gray-500 text-white' : 'text-gray-900'
                          }`}
                      >
                        {active ? (
                          <CogIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        ) : (
                          <OutlineCogIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        )}
                        Completar
                      </button>
                    )}
                  </Menu.Item>
                )}
                {menuUpdate && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={menuUpdate}
                        className={`${MENU_ITEM_DEFAULT_STYLE} ${active ? 'bg-gray-500 text-white' : 'text-gray-900'
                          }`}
                      >
                        {active ? (
                          <DocumentTextIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        ) : (
                          <OutlineDocumentTextIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        )}
                        Actualizar
                      </button>
                    )}
                  </Menu.Item>
                )}
                {menuCancel && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={menuCancel}
                        className={`${MENU_ITEM_DEFAULT_STYLE} ${active ? 'bg-gray-500 text-white' : 'text-gray-900'
                          }`}
                      >
                        {active ? (
                          <DocumentTextIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        ) : (
                          <OutlineDocumentTextIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        )}
                        Cancelar
                      </button>
                    )}
                  </Menu.Item>
                )}
                {menuDelete && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={menuDelete}
                        className={`${MENU_ITEM_DEFAULT_STYLE} ${active ? 'bg-gray-500 text-white' : 'text-gray-900'
                          }`}
                      >
                        {active ? (
                          <DocumentTextIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        ) : (
                          <OutlineDocumentTextIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        )}
                        Eliminar
                      </button>
                    )}
                  </Menu.Item>
                )}
                {menuApprove && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={menuApprove}
                        className={`${MENU_ITEM_DEFAULT_STYLE} ${
                          active ? 'bg-gray-500 text-white' : 'text-gray-900'
                        }`}
                      >
                        {active ? (
                          <DocumentTextIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        ) : (
                          <OutlineDocumentTextIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        )}
                        Aprobar
                      </button>
                    )}
                  </Menu.Item>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default MenuComponentOrder;
