import React, { MouseEventHandler, ComponentProps } from 'react';

interface IconComponentProps {
  Icon: (props: ComponentProps<'svg'>) => JSX.Element;
  width: number;
  hover?: boolean;
  color?: string;
  margin?: string;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const IconComponent: React.FC<IconComponentProps> = ({
  Icon,
  width,
  hover = false,
  color = 'black',
  margin = 'mx-1',
  onClick,
}) => {
  return (
    <div
      className={`
        w-${width}
        ${margin}
        ${
          hover
            ? `transform hover:text-${color}-500 hover:scale-110`
            : `text-${color}-500`
        }
      `}
    >
      <Icon onClick={onClick}/>
    </div>
  );
};

export default IconComponent;
