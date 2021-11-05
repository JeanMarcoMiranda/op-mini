import React, { MouseEventHandler, ComponentProps } from 'react';

interface PaginationComponentProps {
  totalPages: string[];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalPages,
  onClick,
}) => {
  return (
    <div>
      { totalPages.map(num => (
        <button
          key={num}
          //onClick={() => onClick(num)}
        >{num}</button>
      )) }
    </div>
  );
};

export default PaginationComponent;
