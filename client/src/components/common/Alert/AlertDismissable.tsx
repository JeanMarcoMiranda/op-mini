import React, { useEffect } from 'react';

import {
  XIcon,
  CheckIcon,
  ExclamationIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline';
interface IAlertComponentProps {
  isOpen: boolean,
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>
  contentText: string,
  color: string,
  delay: number,
}

const AlertDismissableComponent: React.FC<IAlertComponentProps> = ({
  isOpen,
  setisOpen,
  contentText,
  color,
  delay,
}) => {
  useEffect(() => {
    let timer = setTimeout(() => setisOpen(false), delay * 1000)
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[isOpen]);

  const renderBg = (param: string) => {
    switch (param) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'danger':
        return 'bg-red-600 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'info':
        return 'bg-blue-400 text-white';
    }
  }

  const renderIco = (param: string) => {
    switch (param) {
      case 'success':
        return <CheckIcon/>;
      case 'danger':
        return <ExclamationIcon/>;
      case 'warning':
        return <ExclamationIcon/>;
      case 'info':
        return <ExclamationCircleIcon/>;
    }
  }

  return (
    <>
      <div className={`fixed flex flex-col bottom-0 right-0 w-4/5 md:w-2/5 duration-500 border-none z-10 transform
     ${!isOpen
          ? "translate-x-full ease-out transition-medium"
          : "-translate-x-0 ease-in transition-medium"
        }
    `}>
        <div className="container" id="alertbox">
          <div className={`container ${color ? renderBg(color) : "bg-gray-500 "} flex items-center text-white text-sm font-bold px-3 py-2 relative`} role="alert">
            <div className="fill-current flex items-center w-7 h-auto mr-2">
              {renderIco(color)}
            </div>
            <p>{contentText}</p>

            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setisOpen(prev => !prev)}>
              <div className="fill-current w-5 h-5 mr-2">
                <XIcon/>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlertDismissableComponent;
