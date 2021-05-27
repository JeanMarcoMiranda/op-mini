import React from 'react';

interface IconComponentProps {
  Icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  width: number;
  hover?: boolean;
  color?: string;
  margin?: string;
  clickHandler?: React.MouseEventHandler<SVGSVGElement>;
}

const IconComponent: React.FC<IconComponentProps> = ({
  Icon,
  width,
  hover = false,
  color = 'black',
  margin = 'mx-1',
  clickHandler,
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
      <Icon onClick={clickHandler}/>
    </div>
  );
};

export default IconComponent;
