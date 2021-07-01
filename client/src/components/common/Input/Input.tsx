import React, { ChangeEventHandler, ComponentProps } from 'react';
import IconComponent from '../Icon';

interface InputComponentProps {
  type: string;
  label: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  focus?: boolean;
  icon?: {
    isActive: boolean;
    Icon: (props: ComponentProps<'svg'>) => JSX.Element;
  }
}

const InputComponent: React.FC<InputComponentProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  focus = false,
  icon,
}) => {
  return (
    <div className={`relative w-full ${icon?.isActive ? "flex items-center" : "mb-3"}`}>
      {label && (
        <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
          {label}
        </label>
      )}
      {icon && (
        <div className="mx-3">
          <IconComponent
            width={5}
            color="blue"
            Icon={icon.Icon}
            hover
          />
        </div>
      )
      }
      <input
        type={type}
        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white text-sm shadow focus:outline-none focus:ring w-full"
        placeholder={label ? label : placeholder}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          focus && e.target.select()
        }}
      />
    </div>
  );
};

export default InputComponent
