import React, { Dispatch, SetStateAction } from 'react';
import { IconComponent, MenuComponent } from '../common';
import { MenuIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

interface HeaderProps {
  navToggle: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  navToggle,
}) => {
  return (
    <header className="sticky top-0 flex items-center justify-between py-3 w-full h-14 z-10 bg-gradient-to-l from-green-400 to-green-600">
      <div className="text-white flex items-center ml-6">
        <IconComponent
          Icon={MenuIcon}
          width={10}
          onClick={() => navToggle((z) => !z)}
        />
        <Link to="/">
          <span className="ml-5 font-semibold text-lg tracking-wide">OPERACION M.I.N.I</span>
        </Link>
      </div>
      <div className="mr-8">
        <MenuComponent/>
      </div>
    </header>
  );
};

export default Header;
