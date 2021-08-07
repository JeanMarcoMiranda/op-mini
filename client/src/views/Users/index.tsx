import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setModalData, setNotificationData, setToastData } from '../../store/actions';

import {
  ButtonComponent as Button,
  TableComponent as Table,
} from '../../components/common';
import { RootState } from '../../store/store';
import { renderActiveChip, renderIconActions, toHoverStyle } from '../../components/utils';

interface IModalUInfo {
  name?: string,
  documentType?: string,
  documentNumber?: number,
}

const tableFieldData = [
  { text: 'Nombre', width: 2, name: 'name' },
  { text: 'Rol', width: 2, name: 'role' },
  { text: 'Telefono', width: 1, name: 'phone' },
  { text: 'Correo', width: 2, name: 'email' },
  { text: 'Direccion', width: 2, name: 'currentAddress' },
  { text: 'Estado', width: 1, name: 'active' },
  { text: 'Acciones', width: 2, name: 'actions' },
];

const tableNotification = [
  { text: 'Nombre'},
  { text: 'Tipo de documento'},
  { text: 'Numero de documento'},
];

const UserView: React.FC = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState<IUser[]>([]);
  const [tableData, setTableData] = useState<IUserTableData[]>([]);
  const { access_token, userData: userDataT } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const url: RequestInfo = 'http://localhost:8000/users';

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userData.length === 0) return;

    const prepareTableData = () => {
      let { name: role } = userDataT.role
      let showActions = {
        edit: false,
        delete: false
      }
      if (role === "Administrador") {
        showActions = {
          edit: true,
          delete: true
        }
      }
      let newTableData: IUserTableData[] = userData.map(
        ({
          _id,
          name,
          isActive,
          phone,
          email,
          currentAddress,
          role,
        }: IUser) => {
          let newData: IUserTableData = {
            _id,
            name,
            role: role.name,
            phone,
            email,
            currentAddress,
            active: renderActiveChip(isActive),
            actions: renderIconActions(_id, 'user', showAlert, showActions),
          };
          return newData;
        },
      );
      setTableData(newTableData);
    };
    prepareTableData();
    // eslint-disable-next-line
  }, [userData]);

  const getDataNotification = async (id: string) => {
    const urlReq: RequestInfo = url + `/${id}`;
    const res = await fetch(urlReq);
    const {
      name,
      documentType,
      documentNumber,
    }: IModalUInfo = await res.json();
    const data = {name,documentType,documentNumber};
    dispatch(setNotificationData({
      isOpen: true,
      setisOpen: (prev => !prev),
      title: 'Notificacion del usuario',
      theadData: tableNotification,
      tbodyData: data
    }))
 };

  const getUserData = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, requestInit);
    const data = await res.json();
    setUserData(data);
  };

  const deleteUser = async (idUser: string) => {
    const urlDelete: RequestInfo = url + '/' + idUser;
    const requestInit: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlDelete, requestInit);
    const data = await res.json();
    console.log('User Deleted', data);
    getUserData();
    dispatch(setModalData({setisOpen: (prev => !prev)}))
    showAlert('toast')
  };

  const showAlert = (type: string, id?: string) => {
    if (type === 'toast') {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El usuario ha sido eliminado con exito.',
        color: 'success',
        delay: 5
      }))
    }
    else if (type === 'notifi') {
      getDataNotification(id!)
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
        onClickTYB: () => deleteUser(id!)
      }))
    }
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 px-4 py-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-lg bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Usuarios</h6>
                { userDataT.role.name === "Administrador" &&
                <Link to={`/user/form`}>
                  <Button
                    label="Agregar"
                    textColor="white"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                  />
                </Link>
                }
              </div>
            </div>
            <div className="my-3">
              <Table theadData={tableFieldData} tbodyData={tableData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserView;
