import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToastData } from '../../../store/action/actions';

import {
  CheckCircleIcon,
  ExclamationIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/solid';

const ToastComponent: React.FC<IToastProps> = ({
  isOpen,
  contentText,
  color,
  delay,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    let timer = setTimeout(() => dispatch(setToastData({setisOpen:(prev => !prev)})), delay! * 1000)
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const renderBg = (param: string) => {
    switch (param) {
      case 'success':
        return 'text-green-500 text-white';
      case 'danger':
        return 'text-red-600 text-white';
      case 'warning':
        return 'text-yellow-500 text-white';
      case 'info':
        return 'text-blue-400 text-white';
    }
  }

  const renderIco = (param: string) => {
    switch (param) {
      case 'success':
        return <CheckCircleIcon />;
      case 'danger':
        return <ExclamationIcon />;
      case 'warning':
        return <ExclamationIcon />;
      case 'info':
        return <ExclamationCircleIcon />;
    }
  }

  return (
    <>
      <div className={`fixed flex bottom-0 right-2 duration-500 z-10 transform
        ${!isOpen
              ? "translate-x-full ease-out transition-medium"
              : "-translate-x-0 ease-in transition-medium"
            }
        `}>
        <div className='animate-bounce flex max-w-xl w-full my-2 bg-white overflow-hidden mx-auto shadow-2xl rounded-lg'>
          <div className='flex items-center px-4 py-4'>
            <div className={`${color ? renderBg(color) : "bg-gray-500 "} fill-current flex items-center w-10 h-auto mr-2`} >
              {renderIco(color!)}
            </div>
            <div className='mx-2'>
              <p className='text-gray-900 font-bold'>{contentText}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToastComponent;
