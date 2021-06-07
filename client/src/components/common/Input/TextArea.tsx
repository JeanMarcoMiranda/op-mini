import React, { ChangeEventHandler, FocusEventHandler } from 'react'

interface TextInputProps {
  label?: string,
  name: string,
  onBlur?: FocusEventHandler<HTMLTextAreaElement>,
  onChange: ChangeEventHandler<HTMLTextAreaElement>,
  rows?: number,
  value: string | number | readonly string[],
  focus?: boolean
}

const TextAreaComponent: React.FC<TextInputProps> = ({
  label,
  name,
  onBlur,
  onChange,
  rows = 4,
  value,
  focus = false,
}) => {
  return (
    <div className="relative w-full mb-3">
      { label && (
        <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
          {label}
        </label>
      )}
      <textarea
        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white text-sm shadow focus:outline-none focus:ring w-full"
        rows={rows}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={label}
        value={value}
        onFocus={(e) => {
          focus && e.target.select()
        }}
      />
    </div>
  )
}

export default TextAreaComponent
