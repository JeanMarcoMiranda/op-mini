import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  CardOrderComponent as Card,
  ButtonComponent as Button,
  InputComponent as Input,
  LoadingPageComponent as Load,
  LoadingSectionComponent as LoadSection,
  ChipComponent as Chip,
  TableComponent as Table,
} from '../../components/common';
import { RootState } from '../../store/store';
import { filterDuplicate, formatDate, formatDateHours, renderIconActions, toHoverStyle } from '../../components/utils';
import { setToastData } from '../../store/action/actions';

const initialValues: IShift = {
  _id: '',
  user: {
    _id: '',
    name: '',
  },
  start: '',
  end: '',
  orders: [],
  sales: [],
  startAmount: '',
  endAmount: '',
  expectedAmount: '',
  status: '',
}

const tableFieldDataOrders = [
  { text: 'Creado por', width: 2, name: 'createdby' },
  { text: 'Fecha de creacion', width: 2, name: 'createdate' },
  { text: 'Recibido por', width: 1, name: 'receivedby' },
  { text: 'Fecha de recepcion', width: 2, name: 'receptiondate' },
  { text: 'Monto Final', width: 1, name: 'finalamount' },
  { text: 'Proveedor', width: 1, name: 'supplier' },
  { text: 'Estado', width: 2, name: 'status' },
];

const tableFieldDataSales = [
  { text: 'Creado por', width: 2, name: 'createdby' },
  { text: 'Cliente', width: 1, name: 'client' },
  { text: 'Fecha', width: 1, name: 'date' },
  { text: 'Efectivo', width: 1, name: 'cash' },
  { text: 'Cambio', width: 1, name: 'change' },
  { text: 'Metodo de pago', width: 2, name: 'methodpay' },
  { text: 'Boleta', width: 1, name: 'voucher' },
  { text: 'Estado', width: 1, name: 'status' },
  { text: 'Acciones', width: 2, name: 'actions' },
];

const urlShift: RequestInfo = "http://localhost:8000/shifts";
const urlSale: RequestInfo = 'http://localhost:8000/sales';
const urlOrder: RequestInfo = 'http://localhost:8000/orders';

interface IProductOrder {
  note: string;
  product: {
    name: string;
    _id: string;
  };
  quantity: string;
  price: string;
}

const ShiftForm: React.FC = () => {

  const history = useHistory()

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [saleData, setSaleData] = useState<ISale[]>([]);
  const [orderData, setOrderData] = useState<IOrder[]>([]);
  const [tableDataOrder, setTableDataOrder] = useState<IOrderTableData[]>([]);
  const [tableDataSale, setTableDataSale] = useState<ISaleTableData[]>([]);
  const [dataShift, setDataShift] = useState<IShiftSaleTable>(initialValues);
  const { id } = useParams<IParamTypes>();
  const { access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  useEffect(() => {
    if (id) {
      getShift(id);
      getSale();
      getOrder();
      setShow(true)
      console.log('Buenas');
    } else {
      console.log('Solo es para ver')
    }
  }, [])

  useEffect(() => {
    if (saleData.length === 0) return;

    const prepareTableData = () => {
      let showActions = {
        edit: true,
        more: false,
      }

      const saleNewData = saleData.filter((sale) => dataShift.sales.includes(sale._id))

      let newTableData: ISaleTableData[] = saleNewData.map(
        ({
          _id,
          createdby,
          client,
          date,
          cash,
          subtotal,
          change,
          methodpay,
          voucher,
          status,
        }: ISale) => {
          let newData: ISaleTableData = {
            _id,
            createdby: createdby.name,
            client,
            date: formatDate(new Date(date)),
            cash: 'S/ ' + cash,
            change: 'S/ ' + change,
            subtotal: 'S/ ' + subtotal,
            methodpay,
            voucher,
            status,
            actions: renderIconActions(_id, 'sale', showAlert, showActions)
          };
          return newData;
        },
      );
      setTableDataSale(newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [saleData]);

  useEffect(() => {
    if (orderData.length === 0) return;

    const prepareTableData = () => {

      const orderNewData = orderData.filter((order) => dataShift.orders.includes(order._id))
      console.log(orderNewData);

      let newTableData: IOrderTableData[] = orderNewData.map(
        ({
          _id,
          createdby,
          createdate,
          receivedby,
          receptiondate,
          estimatedamount,
          finalamount,
          type,
          supplier,
          products,
          status,
        }: IOrder) => {
          let newData: IOrderTableData = {
            _id,
            createdby: createdby.name,
            createdate: formatDate(new Date(createdate)),
            receivedby: receivedby.name,
            receptiondate: formatDate(new Date(receptiondate)),
            finalamount:  ' S/'+finalamount,
            supplier: supplier.name,
            status,
          };
          return newData;
        },
      );
      setTableDataOrder(newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [orderData]);

  const getShift = async (id: string) => {
    const urlReq: RequestInfo = urlShift + `/${id}`;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlReq, requestInit);
    const data = await res.json();
    console.log("shift:", data);
    if (res.ok) {
      setDataShift({
        ...data,
        start: formatDateHours(new Date(data.start)),
        end: data.end ? formatDateHours(new Date(data.end)) : 'No se ha finalizado el turno',
      })
    } else {
      console.log('mal')
    }
  }

  const getSale = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlSale, requestInit);
    const data = await res.json();
    setSaleData(data);
  }

  const getOrder = async () => {

    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlOrder, requestInit);
    const data = await res.json();
    setOrderData(data);
  }

  const renderChip = (value: string) => {
    const isActive = value === "true" ? true : false;
    const data = dataShift
    if (data.endAmount === data.expectedAmount ) {
      return (
        <Chip
          label={isActive ? 'El turno no presenta problemas' : 'El turno no ha finalizado'}
          bgColor={isActive ? 'green' : 'red'}
          txtColor="white"
        />
      )
    } else {
      return (
        <Chip
          label={'El Monto no coincide'}
          bgColor={'yellow'}
          txtColor="white"
        />
      )
    }
  }

  const showAlert = (type: string) => {
    if (type === 'toast') {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El producto ha sido eliminado con exito.',
        color: 'success',
        delay: 5
      }))
    }
  }

  return show ? (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Turno</h6>

                  <Button
                    label="Regresar"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                    onClick={() => history.goBack()}
                  />
              </div>
            </div>
            <div className="flex-auto">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion del turno
                </h6>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative text-left w-full mb-3">
                    <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">Estado </label>{renderChip(dataShift?.status)}
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <Input
                        type="text"
                        label="Usuario"
                        name="user"
                        value={dataShift?.user.name}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <Input
                        type="text"
                        label="Monto Esperado"
                        name="expectedAmount"
                        value={dataShift?.expectedAmount}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <Input
                        type="text"
                        label="Hora de inicio"
                        name="start"
                        value={dataShift?.start}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <Input
                        type="text"
                        label="Hora de salida"
                        name="end"
                        value={dataShift?.end}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <Input
                        type="text"
                        label="Caja inicio"
                        name="startAmount"
                        value={dataShift?.startAmount}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <Input
                        type="text"
                        label="Caja fin"
                        name="endAmount"
                        value={dataShift?.endAmount}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-3 border-b-1 border-gray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Pedidos del turno
                </h6>
                <div className="mb-3">
                  {
                    tableDataOrder.length !== 0 ?
                      <Table theadData={tableFieldDataOrders} tbodyData={tableDataOrder} pagination={{ enabled: true, fieldsPerPage: 5 }} />
                      :
                      <label className="block text-center	uppercase text-gray-600 text-xs font-bold mb-2">
                        No se han realizado pedidos en este turno
                      </label>
                  }
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Ventas del turno
                </h6>
                <div className="mb-3">
                  {
                    tableDataSale.length !== 0 ?
                      <Table theadData={tableFieldDataSales} tbodyData={tableDataSale} pagination={{ enabled: true, fieldsPerPage: 5 }} />
                      :
                      <label className="block text-center	uppercase text-gray-600 text-xs font-bold mb-2">
                        No se han realizado ventas en este turno
                      </label>
                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <Load />
}

export default ShiftForm
