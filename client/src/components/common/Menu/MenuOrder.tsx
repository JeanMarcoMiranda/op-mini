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
import { Link, useHistory } from 'react-router-dom';

const initialUserRole: IRole = {
  _id: '',
  name: '',
  isActive: false,
  description: '',
};

const initialUserState: IUserData = {
  _id: '',
  name: '',
  email: '',
  documentType: '',
  documentNumber: '',
  isActive: false,
  role: initialUserRole,
};

const MenuComponentOrder: React.FC = () => {
  const MENU_ITEM_DEFAULT_STYLE =
    'group flex rounded-md items-center w-full p-2 text-sm';

  const { userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const userRole = userData.role;
  const dispatch = useDispatch()
  const history = useHistory()

  const logOutUser = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    dispatch(setUserData(initialUserState))
    dispatch(setAuthUser(false))
    dispatch(setToken(''))

    history.push('/login')
  }

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
                <Menu.Item>
                  {({ active }) => (
                    <Link to={`/user/edit`}>
                      <button
                        className={`${MENU_ITEM_DEFAULT_STYLE} ${
                          active ? 'bg-gray-500 text-white' : 'text-gray-900'
                        }`}
                      >
                        {active ? (
                          <CogIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        ) : (
                          <OutlineCogIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        )}
                        Completar
                      </button>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${MENU_ITEM_DEFAULT_STYLE} ${
                        active ? 'bg-gray-500 text-white' : 'text-gray-900'
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

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${MENU_ITEM_DEFAULT_STYLE} ${
                        active ? 'bg-gray-500 text-white' : 'text-gray-900'
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

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${MENU_ITEM_DEFAULT_STYLE} ${
                        active ? 'bg-gray-500 text-white' : 'text-gray-900'
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
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default MenuComponentOrder;
