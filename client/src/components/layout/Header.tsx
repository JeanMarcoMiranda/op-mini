import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MenuIcon } from '@heroicons/react/solid';
import { Link, useHistory } from 'react-router-dom';
import { setToastData } from '../../store/action/actions';

import {
  ButtonComponent as Button,
  IconComponent,
  MenuComponent
} from '../common';
import { toHoverStyle } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';

interface HeaderProps {
  navToggle: Dispatch<SetStateAction<boolean>>;
}

interface IOrderShift {
  _id: string;
  createdby: {
    name: string;
    _id: string;
  };
  createdate: string | Date;
  receptiondate: string | Date;
}

interface ISaleShift {
  _id: string;
  createdby: {
    _id: string;
    name: string;
  };
  client: string;
  date: string;
  status: string;
}

const Header: React.FC<HeaderProps> = ({
  navToggle,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [inShift, setInShift] = useState(false)
  const [shifts, setShifts] = useState<IShift[]>([])
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const urlShift: RequestInfo = 'http://localhost:8000/shifts';
  const urlOrder: RequestInfo = 'http://localhost:8000/orders';
  const urlSale: RequestInfo = 'http://localhost:8000/sales';

  useEffect(() => {
    getCheckLastShift();
    // eslint-disable-next-line
  }, [inShift]);

  const getCheckLastShift = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlShift, requestInit);
    const data = await res.json();
    const dataOrderDesc = data.reverse();
    setShifts(dataOrderDesc)
  };

  const changeCheckShift = async () => {
    //console.log('Turnos', shifts);
    if (shifts[0]) {
      if (shifts[0].end === '') {
        //finalizar ultimo turno activo
        prepareUpdateShift()
        setInShift(false)
      } else {
        //empezar nuevo turno si se finalizó el ultimo turno
        createShift()
        setInShift(true)
      }
    } else {
      //Nuevo turno
      createShift()
      setInShift(true)
    }
  }

  const createShift = async () => {
    const dateNow = new Date();
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData._id,
        start: dateNow,
        end: '',
        orders: [],
        sales: [],
        startAmount: '0',
        endAmount: '0',
        expectedAmount: '0',
        status: inShift.toString(),
      }),
    }
    const res = await fetch(urlShift, requestInit);
    console.log('Info creada: ', res);
    if (res.ok) {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El turno se ha iniciado con exito.',
        color: 'success',
        delay: 5
      }))
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const updateShift = async (id: string, dataOrders: string[], dataSales: string[]) => {
    const dateNow = new Date();
    const urlUpdate: RequestInfo = urlShift + `/${id}`;
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userData._id,
        end: dateNow,
        orders: dataOrders,
        sales: dataSales,
        startAmount: '0',
        endAmount: '0',
        expectedAmount: '0',
        status: inShift.toString(),
      }),
    }
    const res = await fetch(urlUpdate, requestInit);
    if (res.ok) {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El turno ha terminado con exito.',
        color: 'success',
        delay: 5
      }))
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const prepareUpdateShift = async() => {
    const orders = await getOrder();
    const sales = await getSales();
    updateShift(shifts[0]._id, orders ,sales)
  }

  const getOrder = async() => {
    console.log('Order Get');
    const dateNow = new Date();
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlOrder, requestInit);
    const data: IOrderShift[] = await res.json();
    const currentUserOrders = data.filter((order) => order.createdby.name == userData.name)
    const currentUserStartDate = shifts[0].start;
    const currentUserEndDate = dateNow;
    const ordersInShift = currentUserOrders.filter( (order) => {
      return new Date(order.createdate).getTime() >= new Date(currentUserStartDate).getTime() && new Date(order.createdate).getTime() <= currentUserEndDate.getTime();
    });
    const ordersInShiftId = ordersInShift.map((order) => order._id)
    return ordersInShiftId
  }

  const getSales = async() => {
    console.log('Sales Get');
    const dateNow = new Date();
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlSale, requestInit);
    const data :ISaleShift[] = await res.json();
    const currentUserSales = data.filter((sale) => sale.createdby.name == userData.name)
    const currentUserStartDate = shifts[0].start;
    const currentUserEndDate = dateNow;
    const salesInShift = currentUserSales.filter( (sale) => {
      return new Date(sale.date).getTime() >= new Date(currentUserStartDate).getTime() && new Date(sale.date).getTime() <= currentUserEndDate.getTime();
    });
    const salesInShiftId = salesInShift.map((sale) => sale._id)
    return salesInShiftId
  }

  return (
    <header className="sticky top-0 flex items-center justify-between py-3 w-full h-14 z-10 bg-gradient-to-l from-green-400 to-green-600">
      <div className="text-white flex items-center ml-6">
        <IconComponent
          Icon={MenuIcon}
          width={10}
          onClick={() => navToggle((z) => !z)}
        />
        <Link to="/">
          <span className="ml-5 font-semibold text-lg tracking-wide">OPERACION M.I.N.I</span>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="mr-8">
          <Button
            label={inShift ? "Terminar Turno" : "Empezar Turno"}
            textColor="white"
            bgColor="bg-gradient-to-r from-blue-500 to-blue-500"
            onHoverStyles={toHoverStyle('bg-gradient-to-r from-blue-500 to-blue-600')}
            onClick={() => changeCheckShift()}
          />
        </div>
        <div className="mr-8">
          <MenuComponent />
        </div>
      </div>
    </header>
  );
};

export default Header;
