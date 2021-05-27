import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
//Dispatch<SetStateAction<string>>
interface InputSimpleProps {
  label: string;
  name: string,
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>
}

const InputSimple: React.FC<InputSimpleProps> = ({
  label,
  name,
  value,
  onChange,
}) => {

  return (
    <div className="relative w-full mb-3">
      <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputSimple;
