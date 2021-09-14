import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputComponent as Input } from '../index';
import { setModalData } from '../../../store/action/actions';

import { truncate } from '../../utils';
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
  onClickTYB,
  inpComplete,
  onClickOrdCompl
}) => {
  const dispatch = useDispatch()
  const [ordComplDoc, setOrdComplDoc] = useState<string>('')
  const [ordComplAmo, setOrdComplAmo] = useState<string>('')

  const tableHeadStyle = "px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
  const tableRowStyle = "px-5 py-2 border-b border-gray-200 bg-white text-sm has-tooltip"
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

              {inpComplete ?
                (<div className="px-4 py-6">
                  <Input
                    type="text"
                    label="Nro. Documento"
                    name="ndocument"
                    value={ordComplDoc}
                    onChange={e => setOrdComplDoc(e.target.value)}
                  />
                  <Input
                    type="number"
                    label="Monto Final"
                    name="finalamount"
                    value={ordComplAmo}
                    onChange={e => setOrdComplAmo(e.target.value)}
                  />
                </div>)
                :
                contentText ?
                  <div className={`${img ? "pt-0" : ""} px-6 py-10 flex-grow`}>
                    <p className="text-gray-700 text-base">{contentText}</p>
                  </div>
                  :
                  <div className={`${img ? "pt-0" : ""} px-4 py-6 flex-grow`}>
                    <div className={"inline-block min-w-full shadow rounded-lg overflow-hidden"}>
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className={tableHeadStyle}>Nombre</th>
                            <th className={tableHeadStyle}>Cantidad</th>
                            <th className={tableHeadStyle}>Notas</th>
                          </tr>
                        </thead>
                        {contentObj?.map((content, index) => (
                          <tbody key={index}>
                            <tr>
                              <td className={tableRowStyle}>
                              <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-gray-500 -mt-8'>{content?.product.name}</span>
                                {truncate(content?.product.name)}</td>
                              <td className={tableRowStyle}>{content?.quantity}</td>
                              <td className={tableRowStyle}>{content?.note}</td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
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
                    onClick={inpComplete ? () => {
                      onClickOrdCompl(ordComplDoc,ordComplAmo)
                      setOrdComplAmo('')
                      setOrdComplDoc('')
                      } : onClickTYB}>
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
