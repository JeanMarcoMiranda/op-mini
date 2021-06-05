import React, { ChangeEventHandler } from 'react'
import { Listbox, Transition } from '@headlessui/react'

interface SelectInputProps {
  label?: string;
  onChange: ChangeEventHandler;
  options: any[];
  value: any;
  name: string;
  placeholder?: string;
}

const SelectInputComponent: React.FC<SelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  name,
  placeholder = 'Seleccione...',
}) => {
  return (
    <div className="relative w-full mb-3">
      { label && (
        <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} refName={name}>
        <Listbox.Button className="relative w-full border-0 px-3 py-3 text-gray-600 bg-white text-sm text-left shadow focus:outline-none focus:ring">
          <span className="block truncate">
            {value ? value.name : placeholder}
          </span>
        </Listbox.Button>

        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        />

        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          { options.map((option, index) => (
            <Listbox.Option
              key={index}
              value={option}
              className={({ active }) =>
                `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
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
                    {option.name}
                  </span>
                  {selected ? (
                    <span
                      className={`${
                        active ? 'text-amber-600' : 'text-amber-600'
                      }
                              absolute inset-y-0 left-0 flex items-center pl-3`}
                    >
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

export default SelectInputComponent
