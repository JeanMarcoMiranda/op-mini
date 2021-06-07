import React, { Fragment, ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { generateString } from '../../utils';

interface InputSelectProps {
  label?: string;
  name: string;
  value: any;
  options: ISelectOption[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  handleChange: Dispatch<SetStateAction<any>>;
  placeholder?: string,
}

const SelectComponent: React.FC<InputSelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  handleChange,
  placeholder = 'Seleccione...',
}) => {
  return (
    <div className="relative mb-3">
      {label && (
        <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
          {label}
        </label>
      )}
      <Listbox value={value} refName={name} onChange={(e) => {
        onChange(e)
        handleChange(e)
      }} key={generateString(5)}>
        <Listbox.Button className="relative w-full border-0 px-3 py-3 text-gray-600 bg-white text-sm text-left shadow focus:outline-none focus:ring">
          <span className="block truncate">
            {value ? value.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
            {options.map((option:ISelectOption, index:number) => (
              <Listbox.Option
                key={index}
                value={option}
                className={({ active }) =>
                  `${active ? 'text-blue-700 bg-blue-100' : 'text-gray-600'}
                  cursor-default select-none relative py-2 pr-4`
                }
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-normal'
                      } block truncate`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? 'text-blue-600' : 'text-blue-600'
                        }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

export default SelectComponent;
