import React from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/outline'

interface CardComponentProps {
  title?: string;
  button: ButtonProps;
  navRoute: RouteSideBar
}

const CardComponent: React.FC<CardComponentProps> = ({
  title,
  button,
  navRoute
}) => {
  return (
    <Link to={navRoute.path} className={`flex justify-between px-6 py-3 bg-gradient-to-r from-red-500 via-pink-600 to-purple-700 col-span-2 rounded-md hover:shadow-xl transform hover:scale-105 hover: transition ease-out duration-300`}>
      <div className="my-auto">
        <span className="block text-gray-100 text-left text-xs">{title}</span>
        <span className="block text-gray-50 text-left text-xl font-bold">{navRoute.label}</span>
      </div>
      <div>
        <div className="rounded-full bg-black py-3 px-2">
          <navRoute.Icon width={22} height={22} className="w-8 text-white"/>
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
