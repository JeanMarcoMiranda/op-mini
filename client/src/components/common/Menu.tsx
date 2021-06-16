import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function MenuComponent() {
  const MENU_ITEM_DEFAULT_STYLE =
    'group flex rounded-md items-center w-full p-2 text-sm';

  const { userData, access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  return (
    <Menu>
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {userData && access_token ? userData.name : 'User'}
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          {/* Items to render when button is clicked */}
          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute p-1 right-0 w-56 mt-2 origin-top-right bg-withe divede-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${MENU_ITEM_DEFAULT_STYLE} ${
                      active ? 'bg-blue-500 text-white' : 'text-black'
                    }`}
                  >
                    Account settings
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${MENU_ITEM_DEFAULT_STYLE} ${
                      active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                    }`}
                  >
                    Documentation
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${MENU_ITEM_DEFAULT_STYLE} ${
                      active ? 'bg-red-500 text-white' : 'bg-white text-black'
                    }`}
                  >
                    Cerrar Sesión
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default MenuComponent;
