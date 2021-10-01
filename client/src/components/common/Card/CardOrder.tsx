import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalData } from '../../../store/action/actions';
import { RootState } from '../../../store/store'

import { MenuComponentOrder as MenuOrder } from '../index';

interface CardOrderProps {
  createdBy?: string;
  company: string;
  supplier?: string;
  products?: any[];
  createdDate?: Date | string;
  status: string;
  receivedBy?: string;
  receptionDate?: Date | string;
  estimatedAmount?: string | number;
  finalAmount?: string | number;
  type?: string;
  menuUpdate?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menuDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menuComplete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menuCancel?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  menuApprove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CardOrderComponent: React.FC<CardOrderProps> = ({
  createdBy,
  supplier,
  company,
  products,
  createdDate,
  status,
  receivedBy,
  receptionDate,
  estimatedAmount,
  finalAmount,
  type,
  menuUpdate,
  menuCancel,
  menuComplete,
  menuDelete,
  menuApprove,
}) => {
  const dispatch = useDispatch()

  const { userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const userRole = userData.role;

  const showAlert = () => {
    dispatch(setModalData({
      isOpen: true,
      setisOpen: (prev => !prev),
      title: 'Lista de Productos',
      contentObj: products,
      defaultButton: "Cerrar",
      onClickDB: () => dispatch(setModalData({ setisOpen: (prev => !prev) }))
    }))
  }

  const renderColorCard = (param: string) => {
    switch (param) {
      case 'Completado':
        return 'bg-green-500';
      case 'Cancelado':
        return 'bg-red-500';
      case 'Pendiente':
        return 'bg-yellow-500';
      case 'Aprobado':
        return 'bg-blue-500';
    }
  }

  const RenderMenu: any = () => {
    switch (userRole.name) {
      case 'Administrador':
        return (
          <MenuOrder
            menuComplete={menuComplete}
            menuUpdate={menuUpdate}
            menuCancel={menuCancel}
            menuApprove={menuApprove}
          />)
      case 'Almacenero':
        return (
          <MenuOrder
            menuComplete={menuComplete}
          />)
      case 'Empleado':
        return (
          <MenuOrder
            menuComplete={menuComplete}
            menuApprove={menuApprove}
          />)
      case 'Comprador':
        return (
          <MenuOrder
            menuComplete={menuComplete}
            menuUpdate={menuUpdate}
          />)
    }
  }

  return (
    <div className="text-center flex justify-between">
      <div className="bg-white max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg ">
        <div className={`h-12 ${status ? renderColorCard(status) : "bg-gray-500"}  flex items-center justify-between content-center`}>
          <p className="ml-6 text-center text-white text-lg">{company}</p>
          <div className="flex mr-4">
            <p className="text-center flex flex-wrap items-center text-white font-thin text-lg">{status} </p>
            { <RenderMenu /> }
          </div>
        </div>

        <table className="text-left w-full border-collapse">
          <tbody>
            {createdBy && (
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-2 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Creado por</p></td>
                <td className="py-2 px-2 border-b border-grey-light">
                  <p className="text-justify text-sm mr-5 ml-5">{createdBy}</p>
                </td>
              </tr>
            )}
            {receptionDate && (
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-2 border-b border-grey-light"><p className="text-left text-sm mr-5 ml-5">Fecha de recepción</p></td>
                <td className="py-2 px-2 border-b border-grey-light">
                  <p className="text-justify text-sm mr-5 ml-5">{receptionDate}</p>
                </td>
              </tr>
            )}
            {receivedBy && (
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-2 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Recibido por</p></td>
                <td className="py-2 px-2 border-b border-grey-light">
                  <p className="text-justify text-sm mr-5 ml-5">{receivedBy}</p>
                </td>
              </tr>
            )}
            {supplier && (
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-2 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Proveedor</p></td>
                <td className="py-2 px-2 border-b border-grey-light">
                  <p className="text-justify text-sm mr-5 ml-5">{supplier}</p>
                </td>
              </tr>
            )}
            {estimatedAmount && (
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-2 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Monto estimado</p></td>
                <td className="py-2 px-2 border-b border-grey-light">
                  <p className="text-justify text-sm mr-5 ml-5">S/. {estimatedAmount}</p>
                </td>
              </tr>
            )}
            {finalAmount && (
              <tr className="hover:bg-gray-100">
                <td className="py-2 px-2 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Monto final</p></td>
                <td className="py-2 px-2 border-b border-grey-light">
                  <p className="text-justify text-sm mr-5 ml-5">S/. {finalAmount}</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button className='relative bg-blue-500 text-white p-2 m-4 rounded text-base font-bold overflow-visible' onClick={() => showAlert()}>
          Ver Productos
        </button>
        {type && createdDate && (
          <div className="flex justify-between px-5 mb-2 text-sm text-gray-600">
            <p>Tipo de Pedido: {type}</p>
            <p>Creado el: {createdDate}</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default CardOrderComponent;
//      <div className="bg-white max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
//<ChevronDownIcon className="fill-current ml-2 h-5 w-5" />
