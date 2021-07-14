import React from 'react';
import { useDispatch } from 'react-redux';
import { setNotificationData } from '../../../store/actions';

import {
  XIcon,
} from '@heroicons/react/solid';

const NotificationComponent: React.FC<INotificationProps> = ({
  isOpen,
  title,
  theadData,
  tbodyData,
  contentObj,
  contentText,
}) => {
  const dispatch = useDispatch()

  return (
    <div className={`fixed flex bottom-0 right-2 duration-500 z-10 transform
    ${!isOpen
        ? "translate-y-full ease-out transition-medium"
        : "-translate-y-0 ease-in transition-medium"
      }
   `}>
      <div className="shadow-lg rounded-lg bg-white w-80 h-autox mx-auto m-8 p-4">
        <div className="text-sm pb-2">
          {title}
          <span onClick={() => dispatch(setNotificationData({setisOpen: (prev => !prev)}))}>
            <div className="fill-current w-5 h-5 float-right text-gray-600 ">
              <XIcon />
            </div>
          </span>
        </div>
        {(theadData || tbodyData) ?
          <div className={`grid grid-cols-${Object.keys(tbodyData).length} gap-4`}>
            {theadData?.map((field, index) => (
              <div key={index} className="text-sm text-gray-600 font-bold">{field.text}</div>
            ))}
            {Object.keys(tbodyData!).map((item, index) => (
              <div key={index} className="text-sm text-gray-600">{tbodyData[item]}</div>
            ))}
          </div>
          : <></>
        }
        {contentText ?
          <div className="text-sm text-gray-600">{contentText}</div>
          : <></>
        }
        {contentObj ? Object.keys(contentObj!).map((item, index) => (
          <div key={index} className="text-sm text-gray-600">
            {contentObj[item]}
          </div>
        )) : <></>
        }
      </div>
    </div>
  )
}

export default NotificationComponent
