import React, { ChangeEventHandler, LegacyRef} from 'react';
import { Controller, Control, FieldName, useForm } from 'react-hook-form';

//Dispatch<SetStateAction<string>>
interface InputComponentProps {
  type: string;
  label: string;
  name: string;
  value?: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  type,
  label,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="relative w-full mb-3">
      {label && (
        <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
          {label}
        </label>
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

interface IInputProps<T> {
  register?: LegacyRef<HTMLInputElement>;
  name: any;//FieldName<IFormSupplier>;
  control: any;//Control<T>;
}

export const Input = <T extends {}>({
  register,
  name,
  control,
}: IInputProps<T>) => {
  //const { setValue } = useForm();
  //let namecontroller: string = name!;
  //setValue(name, value)
  return (
    <div className="relative w-full mb-3">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <input
            name={name}
            value={value}
            onChange={onChange}
            ref={register}
          />
        )}
      />
    </div>
  );
};
