import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputComponent as Input } from '../index';
import { setModalData } from '../../../store/action/actions';

import { truncate } from '../../utils';
import { RadioGroup } from '@headlessui/react';
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
  onClickOrdCompl,
  numOrdCompl,
  shiftComplete,
  onClickShiftCompl,

}) => {
  const dispatch = useDispatch()
  const [ordComplDoc, setOrdComplDoc] = useState<string>('')
  const [ordComplAmo, setOrdComplAmo] = useState<string>('')
  const [shiftCompl, setShiftCompl] = useState<string>('')
  const [ordTDoc, setOrdTDoc] = useState<string>('factura')

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
      <div className={`fixed flex flex-col top-14 left-0 w-full h-full duration-500 border-none z-20 transform
      ${isOpen
          ? "translate-x-0 ease-out transition-medium"
          : "-translate-x-full ease-in transition-medium"
        }
      `}>
        <div className={`w-full h-full fixed block top-0 left-0 bg-transparent`}>
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
                  <div className="mb-3">
                    <RadioGroup value={ordTDoc} onChange={setOrdTDoc} className="flex">
                      <RadioGroup.Option value="factura"
                        className={({ active, checked }) => `
                        ${checked ? 'bg-blue-500 text-white' : 'bg-white'}
                        flex-auto relative rounded-lg shadow-md mx-3 py-1 cursor-pointer`}
                      >
                        {({ checked }) => (
                          <span className="">Factura</span>
                        )}
                      </RadioGroup.Option>
                      <RadioGroup.Option value="boleta"
                        className={({ active, checked }) => `
                        ${checked ? 'bg-blue-500 text-white' : 'bg-white'}
                        flex-auto relative rounded-lg shadow-md mx-3 py-1 cursor-pointer`}
                      >
                        {({ checked }) => (
                          <span className="">Boleta</span>
                        )}
                      </RadioGroup.Option>
                    </RadioGroup>
                  </div>
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
                  <div className={`${img ? "pt-0" : ""} px-6 py-4 flex-grow`}>
                    <p className="text-gray-700 text-base">{contentText}</p>
                  </div>
                  :
                  <div className={`${img ? "pt-0" : ""} px-2 py-2 flex-grow`}>
                    <div className={"inline-block min-w-full shadow rounded-lg overflow-hidden"}>
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className={tableHeadStyle}>Nombre</th>
                            <th className={tableHeadStyle}>Cantidad</th>
                            <th className={tableHeadStyle}>Price</th>
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
                              <td className={tableRowStyle}>S/.{content?.price}</td>
                              <td className={tableRowStyle}>
                                <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-gray-500 -mt-8'>{content?.note}</span>
                                {truncate(content?.note, 5)}</td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
              }

              {
                shiftComplete ?
                  (
                    <div className="px-2 py-2">
                      <Input
                        type="number"
                        label="Monto Esperado"
                        name="expectedAmount"
                        value={shiftCompl}
                        onChange={e => setShiftCompl(e.target.value)}
                      />
                    </div>
                  ) :
                  <></>
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
                    onClick={
                      inpComplete ? () => {
                      onClickOrdCompl(ordComplDoc, ordComplAmo, ordTDoc, numOrdCompl)
                      setOrdComplAmo('')
                      setOrdComplDoc('')
                      }
                      : shiftComplete ?
                      async () => {
                        await onClickShiftCompl(shiftCompl!)
                        setShiftCompl('')
                      }
                      :
                      onClickTYB
                     }>
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
