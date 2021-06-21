import React, { Dispatch, SetStateAction } from 'react';
import { IconComponent } from '../common';
import { MenuIcon } from '@heroicons/react/solid';
import Menu from '../common/Menu'

interface HeaderProps {
  navToggle: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ navToggle }) => {
  return (
    <header className="flex items-center justify-between py-3 w-full h-14 z-10 bg-gradient-to-l from-green-400 to-green-600">
      <div className="text-white flex items-center ml-5">
        <IconComponent
          Icon={MenuIcon}
          width={10}
          onClick={() => navToggle((z) => !z)}
        />
        <span className="ml-5 font-semibold text-lg tracking-wide">OPERACION M.I.N.I</span>
      </div>
      <div className="mr-10">
        <Menu/>
      </div>
    </header>
  );
};

export default Header;
