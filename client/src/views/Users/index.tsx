import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AnnotationIcon,
  PencilAltIcon,
  ArchiveIcon,
} from '@heroicons/react/outline';
import {
  ButtonComponent as Button,
  ChipComponent as Chip,
  IconComponent as Icon,
  TableComponent as Table,
} from '../../components/common';

const tableFieldData = [
  { text: 'Nombre', width: 2, name: 'name' },
  { text: 'Rol', width: 2, name: 'role' },
  { text: 'Telefono', width: 1, name: 'phone' },
  { text: 'Correo', width: 2, name: 'email' },
  { text: 'Direccion', width: 2, name: 'currentAddress' },
  { text: 'Estado', width: 1, name: 'active' },
  { text: 'Acciones', width: 2, name: 'actions' },
];

const UserView: React.FC = () => {
  const [userData, setUserData] = useState<IUser[]>([]);
  const [tableData, setTableData] = useState<IUserTableData[]>([]);

  const url: RequestInfo = 'http://localhost:8000/users';

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData.length === 0) return;

    const prepareTableData = () => {
      let newTableData: IUserTableData[] = userData.map(
        ({
          _id,
          name,
          password,
          isActive,
          documentType,
          documentNumber,
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
            actions: renderActions(_id),
          };
          return newData;
        },
      );
      setTableData(newTableData);
    };
    prepareTableData();
  }, [userData]);

  const getUserData = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjp7Il9pZCI6IjYwYTMzZTZkZTNhN2Q1MjQwYzE1YzY2MCIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZGVzY3JpcHRpb24iOiJSb2wgZGUgYWRtaW5pc3RyYWRvciIsImlzQWN0aXZlIjp0cnVlLCJfX3YiOjB9LCJpYXQiOjE2MjI4MzA3MDAsImV4cCI6MTYyMzY5NDcwMH0.yCww2K-K1TX7P9RvFq96v0y6umyaGge8B0HvsIRA_Ac',
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
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjp7Il9pZCI6IjYwYTMzZTZkZTNhN2Q1MjQwYzE1YzY2MCIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZGVzY3JpcHRpb24iOiJSb2wgZGUgYWRtaW5pc3RyYWRvciIsImlzQWN0aXZlIjp0cnVlLCJfX3YiOjB9LCJpYXQiOjE2MjI4MzA3MDAsImV4cCI6MTYyMzY5NDcwMH0.yCww2K-K1TX7P9RvFq96v0y6umyaGge8B0HvsIRA_Ac',
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlDelete, requestInit);
    const data = await res.json();
    console.log('User Deleted', data);
    getUserData();
  };

  const renderActions = (idUser: string) => (
    <div className="flex item-center justify-center">
      <Icon width={5} color="blue" Icon={AnnotationIcon} hover />
      <Link to={`/user/form/${idUser}`}>
        <Icon width={5} color="blue" Icon={PencilAltIcon} hover />
      </Link>
      <Icon
        width={5}
        color="red"
        Icon={ArchiveIcon}
        hover
        onClick={() => deleteUser(idUser)}
      />
    </div>
  );

  const renderActiveChip = (isActive: boolean) => (
    <Chip
      label={isActive ? 'Activo' : 'Inactivo'}
      bgColor="blue"
      txtColor="blue"
    />
  );

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 px-4 py-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-xl font-bold">Usuarios</h6>
                <Link to={`/user/form`}>
                  <Button
                    label="Agregar"
                    textColor="white"
                    bgColor="bg-gradient-to-r from-blue-400 to-blue-500"
                  />
                </Link>
              </div>
            </div>
            <Table theadData={tableFieldData} tbodyData={tableData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserView;
