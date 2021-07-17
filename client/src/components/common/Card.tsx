import React from 'react';
import { Link } from 'react-router-dom';
import { toHoverStyle } from '../utils';
import ButtonComponent from './Button';
import { AcademicCapIcon } from '@heroicons/react/outline'

interface CardComponentProps {
  img: string;
  title?: string;
  label: string;
  bgCardColor?: string;
  textTitleColor?: string;
  textLabelColor?: string;
  button: ButtonProps;
  link: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  img,
  title,
  label,
  bgCardColor,
  textTitleColor,
  textLabelColor,
  button,
  link,
}) => {
  return (
    <Link to={link} className={`flex justify-between px-6 py-3 bg-gradient-to-r from-red-500 via-pink-600 to-purple-700 col-span-2 rounded-md hover:shadow-xl transform hover:scale-105 hover: transition ease-out duration-300`}>
      <div className="my-auto">
        <span className="block text-gray-100 text-left text-xs">{title}</span>
        <span className="block text-gray-50 text-left text-xl font-bold">{label}</span>
      </div>
      <div>
        <div className="rounded-full bg-black p-2">
          <AcademicCapIcon className="w-8 text-white"/>
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
