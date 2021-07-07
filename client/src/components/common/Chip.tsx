import React from 'react'

interface ChipComponentProps {
  label: string;
  bgColor: string;
  txtColor: string;
}

const ChipComponent: React.FC<ChipComponentProps> = ({
  label,
  bgColor,
  txtColor,
}) => {
  return (
    <span
      className={`
        bg-${bgColor}-400
        text-${txtColor}
        font-medium
        rounded-full text-xs py-1 px-2
      `}
    >
      {label}
    </span>
  )
}

export default ChipComponent
