import React, { useEffect, useState } from 'react';
import {
  CardComponent as Card,
  CardOrderComponent as CardOrder,
  LoadingPageComponent as Loading,
  ButtonComponent as Button,
  InputComponent as Input,
} from '../../components/common';
import { navRoutes } from '../../routes';
import { useDateTime } from '../../components/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setModalData, setToastData } from '../../store/action/actions';
import { formatDate, roundDecimals, toHoverStyle } from '../../components/utils';

const buttonProps: ButtonProps = {
  label: 'Vistar',
  bgColor: 'bg-gray-900 ml-3 mt-3',
  onHoverStyles: 'bg-gray-800',
  textColor: 'white',
};

interface Product {
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
  ndocument: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const [date, setDate] = useState<IDate>();
  const [value, setValue] = useState('');
  const [city, setCity] = useState<IWeatherValues>();
  const { userData, access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const { shiftData } = useSelector<RootState, RootState['shift']>(
    (state) => state.shift,
  );
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${city?.weather[0]["icon"]}.svg`;
  const timeValue = useDateTime()
  const [orderTodayData, setOrderTodayData] = useState<IOrder[]>([])
  const [show, setShow] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState<number>(0)
  const [cashRegister, setCashRegister] = useState('0')

  useEffect(() => {
    setDate(timeValue)
  }, [timeValue]);

  useEffect(() => {
    const getWeather = async () => {
      const urlApi: RequestInfo = `https://api.openweathermap.org/data/2.5/weather?q=Arequipa&appid=e96d7162c54ff8ce2b51c0767e86ffa1&units=metric`;
      const res = await fetch(urlApi);
      const data = await res.json();
      if (res.ok) {
        setCity(data);
      } else {
        console.log('Error: City not found || Server error');
      }
      return data;
    };
    getWeather();
    getOrder();
    setCashState()
    //eslint-disable-next-line
  }, []);

  const setCashState = async () => {
    let cash = await getCash()
    setCashRegister(cash.cash)
  }

  const getOrder = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const urlOrder: RequestInfo = 'http://localhost:8000/orders';

    const res = await fetch(urlOrder, requestInit);
    const data: IOrder[] = await res.json();
    const newOrderData: IOrder[] = []
    const today: string = formatDate(new Date())

    await data.map(async (order) => {
      let rd = formatDate(new Date(order.receptiondate))
      if (today === rd && order.status !== 'Cancelado') {
        newOrderData.push(order)
      }
    })
    setOrderTodayData([...newOrderData])
    setShow(true)
  };

  const completeOrder = (index: number) => {
    if (shiftData?.inShift) {

      setOrderModalOpen(index)
      console.log(index)

      dispatch(setModalData({
        isOpen: true,
        setisOpen: (prev => !prev),
        title: `Completar el pedido de ${orderTodayData[index].supplier.company}`,
        inpComplete: true,
        cancelButton: true,
        typeButton: 'Completar Pedido',
        colorTYB: 'success',
        numOrdCompl: index,
        onClickOrdCompl: onClickOrdCompl
      }))
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Necesitas iniciar un turno primero`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const approveOrder = async (index: number) => {
    if (shiftData?.inShift) {
      const url: RequestInfo = 'http://localhost:8000/orders' + `/${orderTodayData[index]._id}`;
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
      console.log(requestInit)
      const res = await fetch(url, requestInit);
      if (res.ok) {
        dispatch(setToastData({
          isOpen: true,
          setisOpen: (prev => !prev),
          contentText: 'El pedido se ha aprobado con exito.',
          color: 'success',
          delay: 5
        }))
        getOrder();
      } else {
        dispatch(setToastData({
          isOpen: true,
          setisOpen: (prev => !prev),
          contentText: `Method Approved, Error${res.status} : ${res.statusText}`,
          color: 'warning',
          delay: 5
        }))
      }
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Necesitas iniciar un turno primero`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const onClickOrdCompl = async (Doc: string, FinAmount: string, tDoc: string, index: number) => {
    if (shiftData?.inShift) {
      const url: RequestInfo = 'http://localhost:8000/orders' + `/${orderTodayData[index]._id}`;
      console.log(orderModalOpen);
      const requestInit: RequestInit = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createdby: orderTodayData[index].createdby._id,
          supplier: orderTodayData[index].supplier._id,
          finalamount: FinAmount,
          ndocument: Doc,
          tdocument: tDoc,
          receivedby: userData._id,
          status: 'Completado',
        }),
      }
      console.log(requestInit)
      const res = await fetch(url, requestInit);
      if (res.ok) {
        await orderTodayData[index].products.map(product => {
          updateProductQuantity(product)
        })
        dispatch(setToastData({
          isOpen: true,
          setisOpen: (prev => !prev),
          contentText: 'El pedido se ha completado con exito.',
          color: 'success',
          delay: 5
        }))
        getOrder()
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
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Necesitas iniciar un turno primero`,
        color: 'warning',
        delay: 5
      }))
    }
    dispatch(setModalData({ setisOpen: (prev => !prev) }))
  }

  const updateProductQuantity = async (product: Product) => {
    const quantityProd = await getQProd(product.product._id)

    const urlPro: RequestInfo = 'http://localhost:8000/products'
    const url: RequestInfo = urlPro + `/${product.product._id}`;
    console.log((Number(product.quantity) + Number(quantityProd)))
    const requestInit: RequestInit = {
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
    const res = await fetch(url, requestInit);
    if (res.ok) {
      console.log('Quantity Product Home')
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
    //return data.stock
  }

  const getCash = async () => {
    const urlPro: RequestInfo = 'http://localhost:8000/cash'
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlPro, requestInit);
    const data = await res.json();
    return data[0]
  }

  const setCash = async (putCash: number, id: string) => {
    const urlPro: RequestInfo = `http://localhost:8000/cash/${id}`
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cash: putCash + '',
      })
    };
    const res = await fetch(urlPro, requestInit);
    if (res.ok) {
      setCashState()
      console.log('Cash updated')
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Hubo un error al actualizar la caja`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const retreatCash = async (inputCash: string) => {
    const cash = await getCash()
    let cashfinal = Number(cash.cash) - Number(inputCash)
    if (cashfinal >= 0) {
      setCash(roundDecimals(cashfinal), cash._id)
      setValue('')
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `El monto sobrepasa la cantidad en la caja`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const refillCash = async (inputCash: string) => {
    const cash = await getCash()
    let cashfinal = Number(cash.cash) + Number(inputCash)
    setCash(roundDecimals(cashfinal), cash._id)
    setValue('')
  }

  return show ? (
    <div className="grid my-8 py-6 px-6 mx-8 rounded-3xl bg-white">
      <div className="col-span-12 ">
        <div className="flex items-center h-10 intro-y mb-3">
          <h2 className="text-2xl font-semibold tracking-wide">Dashboard</h2>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 flex items-center justify-between w-full">
          <div className="flex justify-center items-center lg:mr-4 p-4 col-span-2 rounded-3xl bg-gradient-to-r from-red-500 to-yellow-400 h-full">
            <div className="container text-white px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
              <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                <p className="uppercase tracking-loose w-full">
                  En que vamos a trabajar hoy?
                </p>
                <h1 className="my-4 text-4xl font-bold leading-tight w-full">
                  Bienvenido {userData.name}!
                </h1>
                <p className="leading-normal text-1xl mb-8 w-full">
                  La inspiración existe, pero te encontrará trabajando.
                </p>
                <p className="leading-normal text-2xl mb-8 w-full">
                  {date?.hour} : {date?.minutes} : {date?.seconds}{' '}
                  {new Date().getHours() < 12 ? 'A.M.' : 'P.M.'}
                </p>
              </div>
              <div className="w-full md:w-3/5 text-center">
                <img
                  className="w-full z-50"
                  src="https://s3.idle-empire.com/public/shop/rewards/main/ripple.png"
                  alt="Buenas"
                />
              </div>
            </div>
          </div>

          <div className="block lg:ml-4 mt-4 p-2 justify-center items-center bg-gradient-to-r from-white to-gray-200 shadow-md rounded-3xl h-full">
            <div className="text-center flex-auto justify-between items-center">
              <div className="flex items-center justify-center">
                <div className="flex flex-col p-2 w-full max-w-xs">
                  <div className="font-bold text-xl">{city?.name}</div>
                  <div className="text-sm text-gray-500">
                    {date?.day} {date?.date} {date?.month} {date?.year}
                  </div>
                  <div className="mt-2 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <img
                      src={icon}
                      alt="Just a flower"
                      className="h-24 w-24 object-scale-down lg:object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center mt-2">
                    <div className="font-medium text-4xl">
                      {city?.main.temp}°C
                    </div>
                    <div className="flex flex-col items-center ml-2">
                      <div>{city?.weather[0].main}</div>
                      <div className="mt-1">
                        <span className="text-sm">
                          <i className="far fa-long-arrow-up"></i>
                        </span>
                        <span className="text-sm font-light text-gray-500">
                          {city?.main.temp_max}°C
                        </span>
                      </div>
                      <div>
                        <span className="text-sm">
                          <i className="far fa-long-arrow-down"></i>
                        </span>
                        <span className="text-sm font-light text-gray-500">
                          {city?.main.temp_min}°C
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-2">
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Viento</div>
                      <div className="text-sm text-gray-500">
                        {city?.wind.speed} k/h
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Humedad</div>
                      <div className="text-sm text-gray-500">
                        {city?.main.humidity}%
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Visibilidad</div>
                      <div className="text-sm text-gray-500">
                        {city?.visibility} km
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col rounded p-2 items-center mt-10"
            >
              <h2 className=" font-bold pb-2">Dinero en Caja: {`S/${cashRegister}`}</h2>

              <div className="flex flex-wrap w-full pr-auto pl-auto">
                <Input
                  type="text"
                  label=""
                  name="caja"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Dinero"
                />
              </div>
              <div className="flex justify-between ">
                <div className="px-2 py-1 mr-2">
                  <Button
                    label="Ingresar"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                    onClick={() => refillCash(value)}
                  />
                </div>
                <div className="px-2 py-1 mr-2">
                  <Button
                    label="Retirar"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                    onClick={() => retreatCash(value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-6 mt-6">
          {navRoutes.map(({ label, path }, index) => (
            <Card
              key={index}
              img="https://marketplace.canva.com/EAEK5jeIncM/1/0/1600w/canva-rosa%2C-azul-y-verde-ciberpunk-tendencia-moderna-fondo-para-zoom-bb3t9Mk6Ti8.jpg"
              title="Dashboard"
              label={label}
              bgCardColor="bg-white"
              textTitleColor="blue-700"
              link={path}
              button={buttonProps}
            />
          ))}
        </div>
        {(orderTodayData.length !== 0) && (<>
          <div className="flex items-center h-10 intro-y my-3">
            <h2 className="text-2xl font-semibold tracking-wide">Pedidos para Hoy</h2>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6 mb-6">
            {
              orderTodayData.map((order, index) => (
                <CardOrder
                  key={index}
                  company={order.supplier.company}
                  supplier={order.supplier.name}
                  status={order.status}
                  estimatedAmount={order.estimatedamount}
                  products={order.products}
                  menuComplete={(order.status === "Aprobado") ? (e) => completeOrder(index) : undefined}
                  menuApprove={(userData.role.name === "Administrador" && order.status === "Pendiente") ? (e) => approveOrder(index) : undefined}
                />
              ))
            }
          </div></>
        )}
      </div>
    </div>
  ) : (<Loading />);
};

export default Home;
