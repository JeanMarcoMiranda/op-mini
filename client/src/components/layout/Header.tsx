import React, { Dispatch, SetStateAction } from "react";
import { IconComponent } from "../common";
import { MenuIcon } from "@heroicons/react/solid";

interface HeaderProps {
  navToggle: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({
  navToggle,
}) => {
  return (
    <>
      <header className="fixed w-full items-center justify-between h-14 z-10 bg-gray-500 ">
        <div className="m-auto text-white">
          <IconComponent Icon={MenuIcon} width={10} onClick={() => navToggle(z => !z)}/>
        </div>
      </header>
    </>
  );
}

export default Header
