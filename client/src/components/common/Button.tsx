import React from 'react';
//Dispatch<SetStateAction<string>>
interface ButtonProps {
  label: string;
  bgColor: string;
  bgTransparent: boolean;
  onHoverStyles: string;
  textColor?: string;
  //action?: Dispatch<SetStateAction<string>>;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  bgColor,
  bgTransparent,
  textColor,
  onHoverStyles,
}) => {
  return (
    <button
      className={`
      transition 
      duration-500 
      ${bgTransparent ? 'bg-transparent' : bgColor} 
      ${textColor}
      py-2 px-4 mr-3 mb-3
      focus:outline-none 
      transform
      ${onHoverStyles} 
      rounded-lg`}
      type="submit"
    >
      {label}
    </button>
  );
};

export default ButtonComponent;
