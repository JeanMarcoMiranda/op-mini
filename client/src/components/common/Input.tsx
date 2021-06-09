import React, { ChangeEventHandler, RefCallback } from 'react';
import { UseFormRegister, UseFormProps } from 'react-hook-form';

//Dispatch<SetStateAction<string>>
interface InputComponentProps {
  type: string
  label: string;
  name?: string
  value?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>,
}

const InputComponent = ({
  type,
  label,
  value,
  onChange,
}: InputComponentProps) => {

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
        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white text-sm shadow focus:outline-none focus:ring w-full"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputComponent;
