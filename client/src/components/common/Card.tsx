import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { toHoverStyle } from '../utils';
import ButtonComponent from './Button';

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
    <div
      className={`w-full h-full ${bgCardColor ? bgCardColor : 'bg-transparent'
        } shadow-md  rounded-3xl p-4`}
    >
      <div className="flex-none lg:flex">
        <div className="h-full w-full lg:h-48 lg:w-48 lg:mb-0 mb-3">
          <img
            src={img}
            alt="Just a flower"
            className="h-full w-full object-scale-down lg:object-cover lg:h-48 rounded-2xl"
          />
        </div>
        <div className="flex-auto m-auto justify-evenly py-2">
          <div className="flex flex-wrap ">
            <div
              className={`w-full flex-none text-xs text-${textTitleColor} font-medium`}
            >
              {title}
            </div>
            <h2
              className={`flex-auto text-lg text-${textLabelColor} font-medium`}
            >
              {label}
            </h2>
          </div>
          <p className="mt-3"></p>
          <div className="flex p-4 pb-2 border-t border-gray-200 "></div>
          <div className="text-center flex-auto justify-between">
            <Link to={link}>
              <ButtonComponent
                label={button.label}
                bgColor={button.bgColor}
                textColor={button.textColor}
                onHoverStyles={toHoverStyle(
                  `${button.onHoverStyles}`
                )}
              />

            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
