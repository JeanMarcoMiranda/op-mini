import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import {
  CardOrderComponent as Card,
  ButtonComponent as Button,
  LoadingPageComponent as Load,
  LoadingSectionComponent as LoadSection,
  DatePickerComponent as DatePicker,
} from '../../components/common';
import { toHoverStyle } from '../../components/utils';
import { formatDate, filterDuplicate } from '../../components/utils';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';

interface Product {
  note: string;
  product: {
    name: string;
    _id: string;
  };
  quantity: string;
}

interface IOrder {
  createdby: {
    name: string;
    _id: string;
  };
  createdate: string;
  receivedby: {
    name: string;
    _id: string;
  };
  receptiondate: string;
  estimatedamount: string;
  finalamount: string;
  type: string;
  supplier: {
    company: string;
    name: string;
    _id?: string;
  };
  products: Product[];
  status: string;
}

const OrderView: React.FC = () => {
  const [show, setShow] = useState(false)
  const [showBlock, setShowBlock] = useState(false)
  const [orderData, setOrderData] = useState<IOrder[]>([]);
  const [option, setOption] = useState<any[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

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
    //console.log(orderData.length);
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
      const createDate = formatDate(new Date(order.createdate));
      let receptionDate: string;
      let receivedBy: {name: string, _id: string};
      let finalaMount: string;
      if(order.status === "Pendiente"){
        receptionDate = formatDate(new Date(order.receptiondate))
        receivedBy = {name: "Pendiente", _id: ""};
        finalaMount= "---";
      }else{
        receptionDate = formatDate(new Date(order.receptiondate));
        receivedBy = order.receivedby;
        finalaMount= order.finalamount;
      }
      //console.log(order.createdate)
      const newObject: IOrder = {
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

  const filterOrderDataStatus = async (e: any) => {
    setShowBlock(true)
    const data: IOrder[] = await getOrder();
    let value = e.target.value;
    if (value !== "Todo") {
      const newOrderData: IOrder[] = [];
      const newFound = data.find(element => element.status === value)
      await data.map(async (order) => {
        if (order.status === newFound?.status) {
          const createDate = formatDate(new Date(order.createdate));
          const receptionDate = formatDate(new Date(order.receptiondate));
          const newObject: IOrder = {
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

  const filterOrderDataMaxItems = async (e?: any) => {
    setShowBlock(true)
    if (e) {
      const data: IOrder[] = await getOrder();
      let value = e.target.value;
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
    const newFound = data.find(element => element.supplier.name.includes(value))
    await data.map(async (order) => {
      if (order.supplier.name === newFound?.supplier.name) {
        const createDate = formatDate(new Date(order.createdate));
        const receptionDate = formatDate(new Date(order.receptiondate));
        const newObject: IOrder = {
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
    //console.log(startDate, endDate)
    //console.log(new Date(startDate))

    //setShowBlock(true)
    const data: IOrder[] = await getOrder();
    const newOrderData: IOrder[] = [];
    console.log("data:", data)
    //const newFound = data.find(item => { console.log(new Date(item.createdate))})  new Date(item.createdate)
    const newFound = data.filter((item: any) => {
       //console.log(new Date(item.createdate).getTime())
       console.log("Created new Date: ", new Date(item.createdate))
       console.log("Created Original: ", item.createdate)
       //console.log(startDate.getTime())
       //console.log(endDate.getTime())

       let orderNew = new Date(item.createdate).getTime() >= startDate.getTime() && new Date(item.createdate).getTime() <= endDate.getTime()
       //console.log(orderNew);
      })
    //console.log(newFound)
    /*await data.map(async (order) => {
      if (order.supplier.name === newFound?.supplier.name) {
        const createDate = formatDate(new Date(order.createdate));
        const receptionDate = formatDate(new Date(order.receptiondate));
        const newObject: IOrder = {
          createdby: order.createdby,
          createdate: createDate,
          receivedby: order.receivedby,
          receptiondate: receptionDate,
          estimatedamount: order.estimatedamount,
          finalamount: order.finalamount,
          type: order.type,
          supplier: order.supplier,
          products: order.products,
          status: order.status
        }
        newOrderData.push(newObject)
      }
    })
    setOrderData(newOrderData)
    setShowBlock(false)*/
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
                    orderData.map((order, index) => (
                      <Card
                        key={index}
                        createdBy={order.createdby.name}
                        company={order.supplier.company}
                        supplier={order.supplier.name}
                        createdDate={order.createdate}
                        status={order.status}
                        receivedBy={order.receivedby.name}
                        receptionDate={order.receptiondate}
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
