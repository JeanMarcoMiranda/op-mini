import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  AnnotationIcon,
  PencilAltIcon,
  ArchiveIcon,
} from '@heroicons/react/outline';
import {
  AlertBlockComponent as Alert,
  ButtonComponent as Button,
  ChipComponent as Chip,
  IconComponent as Icon,
  TableComponent as Table,
  LoadingPageComponent as Load,
} from '../../components/common';
import { RootState } from '../../store/store';

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
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [userData, setUserData] = useState<IUser[]>([]);
  const [tableData, setTableData] = useState<IUserTableData[]>([]);
  const { access_token } = useSelector<RootState, RootState['user']>(
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
    // eslint-disable-next-line
  }, [userData]);

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
    setShowModal(false);
  };

  const dispalyModal = (param: string) =>{
    setShowModal(prev => !prev)
    setModalInfo(param)
  }

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
        onClick={() => dispalyModal(idUser)}
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
        <Alert
          isOpen={showModal}
          setisOpen={setShowModal}
          title={"¿Desea eliminar el elemento?"}
          contentText={"El elemento seleccionado sera eliminado de la base de datos"}
          cancelButton={true}
          typeButton={"Si, Eliminalo"}
          colorTYB={"danger"}
          onClickTB={()=>deleteUser(modalInfo)}
        />
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
