import React from 'react';
import { useDispatch } from 'react-redux';
import { setModalData } from '../../../store/action/actions';

const ModalComponent: React.FC<IModalProps> = ({
  isOpen,
  title,
  img,
  contentText,
  contentObj,
  cancelButton,
  defaultButton,
  colorDB,
  onClickDB,
  typeButton,
  colorTYB,
  onClickTYB
}) => {
  const dispatch = useDispatch()

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'success':
        return 'bg-green-400 text-white';
      case 'danger':
        return 'bg-red-600 text-white';
      case 'warning':
        return 'bg-yellow-400 text-white';
      case 'info':
        return 'bg-blue-400 text-white';
    }
  }
  console.log(contentObj)
  return (
    <>
      <div className={`fixed flex flex-col top-14 left-0 w-full h-full duration-500 border-none z-10 transform
     ${isOpen
          ? "translate-x-0 ease-out transition-medium"
          : "-translate-x-full ease-in transition-medium"
        }
    `}>
        <div className="w-full h-full fixed block top-0 left-0 bg-transparent">
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 mx-auto block relative" style={{ top: "25%" }}>
            <div className="flex flex-col min-h-full">
              <div className="px-6 py-4 border-b">
                <div className="text-xl text-center">{title}</div>
              </div>
              {img ?
                <div className="pt-6 flex justify-center">
                  <img src={img} alt='some img' className="w-1/5" />
                </div> : <></>}

              {
                contentText ?
                  <div className={`${img ? "pt-0" : ""} px-6 py-10 flex-grow`}>
                    <p className="text-gray-700 text-base">{contentText}</p>
                  </div>
                  :
                  <div className={`${img ? "pt-0" : ""} px-6 py-10 flex-grow`}>
                    {contentObj?.map((content, index) => {
                      return <p key={index} className="text-gray-700 text-base">{`${content?.product} cant: ${content?.quantity}`}</p>
                    })}
                  </div>
              }

              <div className="px-5 py-3 border-t bg-gray-100 flex justify-end">
                {cancelButton ?
                  <button className="bg-gray-300 text-gray-600 font-medium text-sm py-1 px-5 rounded mr-3"
                    onClick={() => dispatch(setModalData({ setisOpen: (prev => !prev) }))}>
                    Cancelar
                  </button> : <></>}
                {defaultButton ?
                  <button className={`${colorDB ? colorDB : "bg-gray-300 text-gray-600"} font-medium text-sm py-1 px-5 rounded mr-3`}
                    onClick={onClickDB}>
                    {defaultButton}
                  </button> : <></>}
                {typeButton ?
                  <button className={`${colorTYB ? renderSwitch(colorTYB) : "bg-gray-300 text-gray-600"} font-medium text-sm py-1 px-5 rounded`}
                    onClick={onClickTYB}>
                    {typeButton}
                  </button> : <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalComponent;
