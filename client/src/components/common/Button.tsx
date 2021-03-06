import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  label: string;
  bgColor?: string;
  onHoverStyles?: string;
  textColor: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  submit?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  bgColor,
  textColor,
  onHoverStyles,
  onClick,
  submit = false
}) => {
  return (
    <button
      className={`
        transition
        duration-500
        ${bgColor ? bgColor : 'bg-transparent'}
        text-${textColor}
        py-2 px-4
        focus:outline-none
        ${onHoverStyles && onHoverStyles}
        rounded-lg`
      }
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;
