import React, { Dispatch, SetStateAction } from "react";
//Dispatch<SetStateAction<string>>
interface InputSimpleProps {
  label: string,
  value?: string,
  onChange: Dispatch<SetStateAction<string>>
}

const InputSimple: React.FC<InputSimpleProps> = ({label, value, onChange}) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
  }

  return (
    <div className="relative w-full mb-3">
      <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default InputSimple;
