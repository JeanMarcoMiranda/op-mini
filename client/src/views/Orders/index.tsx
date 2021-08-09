import React from 'react';

const OrderView: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full lg:w-10/12 mx-auto my-8">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
          <div className="rounded-lg bg-white mb-0 px-6 py-3">
            <div className="text-center flex justify-between">
              <div className="bg-white max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
                <div className="h-12 bg-red-500 flex items-center justify-between">
                  <p className="ml-5 text-white text-lg">Supplier</p>
                  <p className="mr-5 text-white font-thin text-lg">Status Cancelado</p>
                </div>

                <table className="text-left w-full border-collapse">
                  <tbody>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Creado por</p></td>
                      <td className="py-2 px-6 border-b border-grey-light">
                        <p className="text-justify text-sm mr-5 ml-5">user01</p>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Fecha de recepción</p></td>
                      <td className="py-2 px-6 border-b border-grey-light">
                        <p className="text-justify text-sm mr-5 ml-5">04/08/2021</p>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Recibido por</p></td>
                      <td className="py-2 px-6 border-b border-grey-light">
                        <p className="text-justify text-sm mr-5 ml-5">user02</p>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Monto estimado</p></td>
                      <td className="py-2 px-6 border-b border-grey-light">
                        <p className="text-justify text-sm mr-5 ml-5">S/. XX</p>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-6 border-b border-grey-light"><p className="text-justify text-sm mr-5 ml-5">Monto final</p></td>
                      <td className="py-2 px-6 border-b border-grey-light">
                        <p className="text-justify text-sm mr-5 ml-5">S/. XX</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="m-4 text-center text-base mr-5 ml-5">Lista Productos</p>
                <div className="flex justify-between px-5 mb-2 text-sm text-gray-600">
                  <p>Tipo de Pedido</p>
                  <p>Creado el 03/08/2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderView;
