import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setModalData, setToastData } from '../../store/action/actions';

import {
  CardOrderComponent as Card,
  ButtonComponent as Button,
  LoadingPageComponent as Load,
  LoadingSectionComponent as LoadSection,
  DatePickerComponent as DatePicker,
} from '../../components/common';
import { roundDecimals, toHoverStyle } from '../../components/utils';
import { formatDate, filterDuplicate } from '../../components/utils';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';

interface IProductOrder {
  note: string;
  product: {
    name: string;
    _id: string;
  };
  quantity: string;
  price: string;
}

interface IOrder {
  _id: string;
  createdby: {
    name: string;
    _id: string;
  };
  createdate: string | Date;
  receivedby: {
    name: string;
    _id: string;
  };
  receptiondate: string | Date;
  estimatedamount: string;
  finalamount: string;
  type: string;
  supplier: {
    company: string;
    name: string;
    _id?: string;
  };
  products: IProductOrder[];
  status: string;
}

const OrderView: React.FC = () => {
  const dispatch = useDispatch()
  const dayStart = new Date(); dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(); dayEnd.setHours(23, 59, 59, 999);
  const [show, setShow] = useState(false)
  const [showBlock, setShowBlock] = useState(false)
  const [orderData, setOrderData] = useState<IOrder[]>([]);
  const [option, setOption] = useState<any[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const [startDate, setStartDate] = useState(dayStart)
  const [endDate, setEndDate] = useState(dayEnd)
  //const [orderModalOpen, setOrderModalOpen] = useState<number>(0)

  const { access_token, userData: userDataT } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const url: RequestInfo = 'http://localhost:8000/orders';

  useEffect(() => {
    if (searchVal.length >= 3) {
      getSearchOrder(searchVal);
    } else {
      initialRender();
    }
    //eslint-disable-next-line
  }, [searchVal]);

  useEffect(() => {
    (orderData.length !== 0) && setShow(true) && setShowBlock(false);
  }, [orderData])

  const initialRender = async () => {
    const data = await getOrder();
    setOrderData(data);
    setShowBlock(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  const getOrder = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, requestInit);
    const data: IOrder[] = await res.json();
    const newOrderData: IOrder[] = []
    await data.map(async (order) => {
      const createDate = new Date(order.createdate);
      let receptionDate: string | Date;
      let receivedBy: { name: string, _id: string };
      let finalaMount: string;
      if (order.status === "Pendiente") {
        receptionDate = new Date(order.receptiondate)
        receivedBy = { name: "Pendiente", _id: "" };
        finalaMount = "---";
      } else {
        receptionDate = new Date(order.receptiondate);
        receivedBy = order.receivedby;
        finalaMount = order.finalamount;
      }
      const newObject: IOrder = {
        _id: order._id,
        createdby: order.createdby,
        createdate: createDate,
        receivedby: receivedBy,
        receptiondate: receptionDate,
        estimatedamount: order.estimatedamount,
        finalamount: finalaMount,
        type: order.type,
        supplier: {
          company: order.supplier.company,
          name: order.supplier.name,
        },
        products: order.products,
        status: order.status
      }
      newOrderData.push(newObject)
    })
    const newOption: any[] = [];
    newOption.push({ value: "Todo" })
    await data.map(async (order) => {
      const newObject = {
        value: order.status
      }
      newOption.push(newObject)
    })
    setOption(filterDuplicate(newOption))
    return newOrderData
  };

  const filterOrderDataStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowBlock(true)
    const data: IOrder[] = await getOrder();
    let value = e.target.value;
    if (value !== "Todo") {
      const newOrderData: IOrder[] = [];
      const newFound = data.find(element => element.status === value)
      await data.map(async (order) => {
        if (order.status === newFound?.status) {
          const createDate = new Date(order.createdate);
          const receptionDate = new Date(order.receptiondate);
          const newObject: IOrder = {
            _id: order._id,
            createdby: order.createdby,
            createdate: createDate,
            receivedby: order.receivedby,
            receptiondate: receptionDate,
            estimatedamount: order.estimatedamount,
            finalamount: order.finalamount,
            type: order.type,
            supplier: {
              company: order.supplier.company,
              name: order.supplier.name,
            },
            products: order.products,
            status: order.status
          }
          newOrderData.push(newObject)
        }
      })
      setOrderData(newOrderData)
      setShowBlock(false)
    } else {
      initialRender();
    }
  }

  const filterOrderDataMaxItems = async (e?: React.ChangeEvent<HTMLSelectElement>) => {
    setShowBlock(true)
    if (e) {
      const data: IOrder[] = await getOrder();
      const value = e.target.value as unknown as number;
      if (!isNaN(+value)) {
        data.splice(value)
        setOrderData(data)
        setShowBlock(false)
      } else {
        data.splice(18)
        setOrderData(data)
        setShowBlock(false)
      }
    }
  }

  const getSearchOrder = async (value: string) => {
    setShowBlock(true)
    const data: IOrder[] = await getOrder();
    const newOrderData: IOrder[] = [];

    /*const textLowerCase = (value: string) => {
      return value.toLowerCase()
    }*/
    /*const arrayLowerCase = data.map(value => {
      return textLowerCase(value.supplier.company)
    })*/
    //console.log(arrayLowerCase);
    //console.log(textLowerCase(value));
    //const newFound = arrayLowerCase.find(element => element.includes(textLowerCase(value)))
    const newFound = data.find(element => element.supplier.company.includes(value))
    //console.log(newFound);
    await data.map(async (order) => {
      //console.log(newFound?.supplier.company)
      if (order.supplier.company === newFound?.supplier.company) {
      const createDate = new Date(order.createdate);
      const receptionDate = new Date(order.receptiondate);
      const newObject: IOrder = {
        _id: order._id,
        createdby: order.createdby,
        createdate: createDate,
        receivedby: order.receivedby,
        receptiondate: receptionDate,
        estimatedamount: order.estimatedamount,
        finalamount: order.finalamount,
        type: order.type,
        supplier: {
          company: order.supplier.company,
          name: order.supplier.name,
        },
        products: order.products,
        status: order.status
      }
      newOrderData.push(newObject)
      }
    })
    setOrderData(newOrderData)
    setShowBlock(false)
  }

  const getSearchOrderDate = async () => {
    setShowBlock(true)
    const data: IOrder[] = await getOrder();
    const newOrderData: IOrder[] = [];
    const newFound = data.filter(order => {
      return new Date(order.createdate).getTime() >= startDate.getTime() && new Date(order.createdate).getTime() <= endDate.getTime()
    })
    await newFound.map(async (order) => {
      const createDate = new Date(order.createdate);
      const receptionDate = new Date(order.receptiondate);
      const newObject: IOrder = {
        _id: order._id,
        createdby: order.createdby,
        createdate: createDate,
        receivedby: order.receivedby,
        receptiondate: receptionDate,
        estimatedamount: order.estimatedamount,
        finalamount: order.finalamount,
        type: order.type,
        supplier: {
          company: order.supplier.company,
          name: order.supplier.name,
        },
        products: order.products,
        status: order.status
      }
      newOrderData.push(newObject)
    })
    setOrderData(newOrderData)
    setShowBlock(false)
  }

  const orderComplete = (index: number) => {
    //setOrderModalOpen(index)
    //console.log(index)

    dispatch(setModalData({
      isOpen: true,
      setisOpen: (prev => !prev),
      title: `Completar el pedido de ${orderData[index].supplier.company}`,
      inpComplete: true,
      cancelButton: true,
      typeButton: 'Completar Pedido',
      colorTYB: 'success',
      numOrdCompl: index,
      onClickOrdCompl: onClickOrdCompl
    }))
  }

  const onClickOrdCompl = async (Doc: string, FinAmount: string, tDoc: string, index:number) => {
    const url: RequestInfo = 'http://localhost:8000/orders' + `/${orderData[index]._id}`;
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdby: orderData[index].createdby._id,
        supplier: orderData[index].supplier._id,
        finalamount: FinAmount,
        ndocument: Doc,
        tdocument: tDoc,
        receivedby: userDataT._id,
        status: 'Completado',
      }),
    }
    const res = await fetch(url, requestInit);
    if (res.ok) {
      await orderData[index].products.map(product => {
        updateProductQuantity(product, 'completar')
      })
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El pedido se ha completado con exito.',
        color: 'success',
        delay: 5
      }))
      initialRender()
    } else {
      console.log(res)
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
    dispatch(setModalData({setisOpen: (prev => !prev)}))
  }

  const updateProductQuantity = async (product: IProductOrder, action: string) => {
    const quantityProd = await getQProd(product.product._id)

    const urlPro: RequestInfo = 'http://localhost:8000/products'
    const url: RequestInfo = urlPro + `/${product.product._id}`;
    let requestInit: RequestInit = {}
    if(action === "completar") {
      requestInit = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastpricebuy: quantityProd.pricebuy,
          pricebuy: roundDecimals(Number(product.price) / Number(product.quantity)) + '',
          stock: (Number(product.quantity) + Number(quantityProd.stock)) + '',
        }),
      }
    }else if (action === "cancelar"){
      console.log(quantityProd.lastpricebuy);
      console.log((Number(quantityProd.stock) - Number(product.quantity)) + '');
      requestInit = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pricebuy: quantityProd.lastpricebuy,
          stock: (Number(quantityProd.stock) - Number(product.quantity)) + '',
        }),
      }
    }
    const res = await fetch(url, requestInit);
    if (res.ok) {
      console.log('Quantity Product')
    }else {
      console.log('no se pudo we');
    }
  }

  const getQProd = async (pId: string) => {
    const urlPro: RequestInfo = 'http://localhost:8000/products'
    const urlReq: RequestInfo = urlPro + `/${pId}`;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlReq, requestInit);
    const data = await res.json();
    return data
  }

  const orderUpdate = (index: number) => {
    console.log("Update")
  }

  const orderCancel = (index: number) => {
    dispatch(setModalData({
      isOpen: true,
      setisOpen: (prev => !prev),
      title: '¿Esta seguro que desea cancelar el elemento?',
      contentText: 'El elemento seleccionado sera cancelado',
      cancelButton: true,
      typeButton: 'Si, Cancelalo',
      colorTYB: 'danger',
      onClickTYB: () => cancelOrder(index)
    }))
  }

  const cancelOrder = async (index: number) => {
    const url: RequestInfo = 'http://localhost:8000/orders' + `/${orderData[index]._id}`;
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdby: orderData[index].createdby._id,
        supplier: orderData[index].supplier._id,
        receivedby: orderData[index].receivedby._id,
        status: 'Cancelado',
      }),
    }
    const res = await fetch(url, requestInit);
    if (res.ok) {
      await orderData[index].products.map(product => {
        updateProductQuantity(product,'cancelar')
      })
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El pedido se ha cancelado con exito.',
        color: 'success',
        delay: 5
      }))
      initialRender()
    } else {
      console.log(res)
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
    dispatch(setModalData({setisOpen: (prev => !prev)}))
  }

  const orderDelete = async (id: string) => {
    console.log("Delete")
    const urlDelete: RequestInfo = url + `/${id}`;
    const requestInit: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(urlDelete, requestInit);
    console.log(res)
    initialRender();
    dispatch(setModalData({ setisOpen: (prev => !prev) }))
    showAlert('toast')
  }

  const showAlert = (type: string, id?: string) => {
    if (type === 'toast') {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El pedido ha sido eliminado con exito.',
        color: 'success',
        delay: 5
      }))
    }
    else {
      dispatch(setModalData({
        isOpen: true,
        setisOpen: (prev => !prev),
        title: '¿Esta seguro que desea eliminar el elemento?',
        contentText: 'El elemento seleccionado sera eliminado de la base de datos',
        cancelButton: true,
        typeButton: 'Si, Eliminalo',
        colorTYB: 'danger',
        onClickTYB: () => orderDelete(id!)
      }))
    }
  }

  const approveOrder = async (index: number) => {
    const url: RequestInfo = 'http://localhost:8000/orders' + `/${orderData[index]._id}`;
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: 'Aprobado',
      }),
    }
    const res = await fetch(url, requestInit);
    if (res.ok) {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El pedido se ha aprobado con exito.',
        color: 'success',
        delay: 5
      }))
      initialRender()
    }
  }

  return show ? (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-lg bg-white mb-0 px-6 py-3">

              <div className="my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                  <div className="relative">
                    <select
                      defaultValue={'DEFAULT'}
                      onChange={filterOrderDataMaxItems}
                      className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option value="DEFAULT" disabled>Cant. Pedidos</option>
                      <option value="6" >6</option>
                      <option value="12">12</option>
                      <option value="18">18</option>
                    </select>
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDownIcon className="fill-current h-4 w-4" />
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      onChange={filterOrderDataStatus}
                      className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                      {
                        option.map((item: any, index: number) => (
                          <option key={index} value={item.value}>{item.value}</option>
                        ))
                      }
                    </select>
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDownIcon className="fill-current h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="block relative">
                  <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <SearchIcon className="h-4 w-4 fill-current text-gray-500" />
                  </span>
                  <input
                    type="search"
                    value={searchVal}
                    onChange={handleChange}
                    placeholder="Buscar pedido..."
                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
                <div className="flex flex-row mb-1 sm:mb-0">
                  <div className="relative">
                    <div className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block bg-white border-gray-400 text-gray-700 py-2 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                      <DatePicker
                        text={"Inicio:"}
                        selected={startDate}
                        startDate={startDate}
                        endDate={endDate}
                        handleDateChange={setStartDate} />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-full rounded-r border-t sm:rounded-r-none  border-r border-b block bg-white border-gray-400 text-gray-700 py-2 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                      <DatePicker
                        text={"Fin:"}
                        selected={endDate}
                        startDate={startDate}
                        endDate={endDate}
                        handleDateChange={setEndDate} />
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-full rounded-l block leading-tight px-2">
                      <Button
                        label="Buscar"
                        bgColor="bg-green-400"
                        textColor="white"
                        onHoverStyles={toHoverStyle('bg-green-500')}
                        onClick={getSearchOrderDate}
                      />
                    </div>
                  </div>

                </div>
              </div>
              {showBlock ?
                <div className="flex justify-center items-center">
                  <LoadSection />
                </div>
                :
                <div className="grid grid-cols-3 gap-6 mt-6 mb-6">
                  {
                    orderData.slice(0).reverse().map((order, index) => (
                      <Card
                        key={index}
                        menuComplete={(order.status === "Aprobado") ? (e) => orderComplete(index) : undefined}
                        menuCancel={(order.status === "Completado") ? (e) => orderCancel(index) : undefined}
                        menuApprove={(userDataT.role.name === "Administrador" && order.status === "Pendiente") ? (e) => approveOrder(index) : undefined}
                        menuDelete={(userDataT.role.name === "Administrador") ? () => showAlert('delete',order._id) : undefined}
                        createdBy={order.createdby.name}
                        company={order.supplier.company}
                        supplier={order.supplier.name}
                        createdDate={formatDate(new Date(order.createdate))}
                        status={order.status}
                        receivedBy={order.receivedby.name}
                        receptionDate={formatDate(new Date(order.receptiondate))}
                        estimatedAmount={order.estimatedamount}
                        finalAmount={order.finalamount}
                        type={order.type}
                        products={order.products}
                      />
                    ))
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <Load />
}
export default OrderView;
//
//menuUpdate={(order.status != "Completado" && order.status != "Cancelado" ) ? (e) => orderUpdate(index) : undefined}
