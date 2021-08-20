import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { RootState } from '../../store/store';
import { ButtonComponent as Button } from '../../components/common';
import { toHoverStyle } from '../../components/utils';

const initialValues: IFormOrder = {
  createdby: '',
  createdate: '',
  receivedby: '',
  receptiondate: '',
  estimatedamount: '',
  finalamount: '',
  type: 'Local',
  supplier: '',
  products: [],
  status: 'Pendiente',
}

const OrderForm: React.FC = () => {

  const { id } = useParams<IParamTypes>();
  const { userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const [orderData, setOrderData] = useState<IFormOrder>(initialValues)

  useEffect(() => {
    setOrderData({...orderData, supplier: id})
  }, [])

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Pedidos</h6>
                <Link to="/order">
                  <Button
                    label="Regresar"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                  />
                </Link>
              </div>
            </div>

            <div className="flex-auto">
              <div className="col-span-2 py-3 px-6">
                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Seleccionar Productos
                </h6>

                <div className="my-3">
                  <Button
                    label={ id ? 'Actualizar Proveedor' : 'Crear Proveedor' }
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                    submit
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderForm
