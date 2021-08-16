import React from 'react';
import { useDispatch } from 'react-redux';
import { setModalData } from '../../../store/actions';

interface CardOrderProps {
  createdBy: string;
  supplier: string;
  products?: any[];
  createdDate: Date | string;
  status: string;
  receivedBy?: string;
  receptionDate?: Date | string;
  estimatedAmount?: number;
  finalAmount?: number;
  type: string;
}

const CardOrderComponent: React.FC<CardOrderProps> = ({
  createdBy,
  supplier,
  products,
  createdDate,
  status,
  receivedBy,
  receptionDate,
  estimatedAmount,
  finalAmount,
  type,
}) => {
  const dispatch = useDispatch()

  const showAlert = () => {
    console.log("buenas")
    dispatch(setModalData({
      isOpen: true,
      setisOpen: (prev => !prev),
      title: 'Lista de Productos',
      contentText: 'Este pedido no tiene productos',
      defaultButton: "Cerrar",
      onClickDB: () => dispatch(setModalData({setisOpen:(prev => !prev)}))
    }))
  }

  return (
    <div className="text-center flex justify-between">
      <div className="bg-white max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg ">
        <div className="h-12 bg-red-500 flex items-center justify-between">
          <p className="ml-5 text-white text-lg">{supplier}</p>
          <p className="mr-5 text-white font-thin text-lg">{status}</p>
        </div>

        <table className="text-left w-full border-collapse">
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Creado por</p></td>
              <td className="py-2 px-6 border-b border-grey-light">
                <p className="text-justify text-sm mr-5 ml-5">{createdBy}</p>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Fecha de recepción</p></td>
              <td className="py-2 px-6 border-b border-grey-light">
                <p className="text-justify text-sm mr-5 ml-5">{receptionDate}</p>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Recibido por</p></td>
              <td className="py-2 px-6 border-b border-grey-light">
                <p className="text-justify text-sm mr-5 ml-5">{receivedBy}</p>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Monto estimado</p></td>
              <td className="py-2 px-6 border-b border-grey-light">
                <p className="text-justify text-sm mr-5 ml-5">S/. {estimatedAmount}</p>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Monto final</p></td>
              <td className="py-2 px-6 border-b border-grey-light">
                <p className="text-justify text-sm mr-5 ml-5">S/. {finalAmount}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <button className='relative bg-blue-500 text-white p-2 m-4 rounded text-base font-bold overflow-visible' onClick={() => showAlert()}>
          Lista Productos
        </button>
        <div className="flex justify-between px-5 mb-2 text-sm text-gray-600">
          <p>Tipo de Pedido: {type}</p>
          <p>Creado el: {createdDate}</p>
        </div>
      </div>
    </div>
  )
}
export default CardOrderComponent;
//      <div className="bg-white max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
