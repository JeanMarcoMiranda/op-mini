import React, { Dispatch, SetStateAction } from 'react';
//Dispatch<SetStateAction<string>>
interface InputSimpleProps {
  type: string;
  name: string;
  label?: string;
  value?: string | number;
  onChange: Dispatch<SetStateAction<any>>;
}

const InputComponent: React.FC<InputSimpleProps> = ({
  type,
  name,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="relative w-full mb-3">
      {label ? (
        <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
          {label}
        </label>
      ) : (
        false
      )}
      <input
        type={type}
        name={name}
        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white text-sm shadow focus:outline-none focus:ring w-full"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
