import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MenuIcon } from '@heroicons/react/solid';
import { Link, useHistory } from 'react-router-dom';
import { setModalData, setNotificationData, setToastData } from '../../store/action/actions';

import {
  ButtonComponent as Button,
  IconComponent,
  MenuComponent
} from '../common';
import { formatDateHours, toHoverStyle } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';

interface HeaderProps {
  navToggle: Dispatch<SetStateAction<boolean>>;
}

interface IShif {
  _id: string; //nulo
  user: IUserSale; //no nulo
  start: string; //nulo
  end: string;//nulo
  orders: ISale[];//nulo
  sales: IOrder[];//nulo
  startAmount: string;//nulo
  endAmount: string;//nulo
  status: string;//no nulo
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

const Header: React.FC<HeaderProps> = ({
  navToggle,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [inShift, setInShift] = useState(false)
  const [shifts, setShifts] = useState<IShif[]>([])
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const urlShift: RequestInfo = 'http://localhost:8000/shifts';
  const urlOrder: RequestInfo = 'http://localhost:8000/orders';

  useEffect(() => {
    //console.log(inShift);
    getCheckLastShift();
    getOrder();
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
    console.log(dataOrderDesc)
    //console.log(dataOrderDesc[0])
    if (dataOrderDesc[0]) {
      if (dataOrderDesc[0].end === '') {
        setInShift(true)
      } else {
        setInShift(false)
      }
    } else {
      setInShift(false)
    }
    setShifts(data)
  };

  const changeCheckShift = async () => {
    console.log('Turnos', shifts);
    //const shiftsOrderDesc = shifts.reverse();
    //console.log('Turnos priemro', shiftsOrderDesc[0]);
    /*if(shiftsOrderDesc[0]){
      if (shifts[0].end === '') {
        //finalizar ultimo turno activo
        console.log('Actualizar turno');
        console.log('Turnos normal', shifts[0]);
        console.log('Turnos reverse', shiftsOrderDesc[0]);
      } else {
        //empezar nuevo turno si se finalizó el ultimo turno
        console.log('Nuevo turno 2');
      }
    } else {
      console.log('Nuevo turno 1');
    }*/
    if (shifts[0]) {
      if (shifts[0].end === '') {
        //finalizar ultimo turno activo
        updateShift(shifts[0]._id)
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
        start: formatDateHours(dateNow),
        end: '',
        orders: [],
        sales: [],
        startAmount: '0',
        endAmount: '0',
        status: inShift.toString(),
      }),
    }
    const res = await fetch(urlShift, requestInit);
    console.log('Info creada: ', res);
    if (res.ok) {
      //console.log('Shift Created', res)
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El turno se ha iniciado con exito.',
        color: 'success',
        delay: 5
      }))
    } else {
      //console.log('Error: Unknow error || Server error');
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const updateShift = async (id: string) => {
    //console.log("Turno inShift: ",inShift);
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
        //start: formatDateHours(dateNow),
        end: formatDateHours(dateNow),
        orders: [],
        sales: [],
        startAmount: '0',
        endAmount: '0',
        status: inShift.toString(),
      }),
    }
    const res = await fetch(urlUpdate, requestInit);
    console.log('Info actualizada: ', res);
    if (res.ok) {
      //console.log('Product Created', dataRes)
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El turno ha terminado con exito.',
        color: 'success',
        delay: 5
      }))
    } else {
      //console.log('Error: Unknow error || Server error');
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const getOrder = async() => {
    console.log('Order Get');
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlOrder, requestInit);
    //const data: IOrder[] = await res.json();
    const data: IOrderShift[] = await res.json();
    console.log('Get Order data: ',data)
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
