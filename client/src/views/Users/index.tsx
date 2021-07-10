import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  AnnotationIcon,
  PencilAltIcon,
  ArchiveIcon,
} from '@heroicons/react/outline';
import {
  AlertBlockComponent as AlertBlock,
  AlertDismissableComponent as AlertDism,
  ButtonComponent as Button,
  ChipComponent as Chip,
  IconComponent as Icon,
  TableComponent as Table,
} from '../../components/common';
import { RootState } from '../../store/store';

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

const UserView: React.FC = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [modalInfo, setModalInfo] = useState("");
  const [prepareInfo, setPrepareInfo] = useState("");
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

  useEffect(() => {

  }, [prepareInfo]);

  const getUser = async (id: string) => {
    const urlReq: RequestInfo = url + `/${id}`;
    const res = await fetch(urlReq);
    const {
      name,
      documentType,
      documentNumber,
    }: IModalUInfo = await res.json();
    const data = {name,documentType,documentNumber};
    let newData: string = ""
    for (var [key, value] of Object.entries(data)) {
      newData +=`${key}: ${value} \r\n`
    }
    let datareplace = newData.replace('name','Nombre').replace('documentType', 'Tipo de documento').replace('documentNumber','Numero de documento')
    setPrepareInfo(datareplace)
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
    setShowModal1(false);
    dispalyModal('', 'alert')
  };

  const dispalyModal = (param: string, type?: string) => {
    if (type === 'alert') {
      setShowModal2(prev => !prev)
    }
    else if (type === 'tooltip') {
      setShowModal3(prev => !prev)
      getUser(param)
    }
    else {
      setShowModal1(prev => !prev)
      setModalInfo(param)
    }
  }

  const renderActions = (idUser: string) => (
    <div className="flex item-center justify-center">
      <Icon width={5} color="blue" Icon={AnnotationIcon} hover onClick={() => dispalyModal(idUser, 'tooltip')} />
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
        <AlertBlock
          isOpen={showModal3}
          setisOpen={setShowModal3}
          title={"Informacion adicional"}
          contentText={prepareInfo}
          typeButton={"Cerrar"}
          onClickTYB={() => setShowModal3(false)}
        />
        <AlertBlock
          isOpen={showModal1}
          setisOpen={setShowModal1}
          title={"¿Desea eliminar el elemento?"}
          contentText={"El elemento seleccionado sera eliminado de la base de datos"}
          cancelButton={true}
          typeButton={"Si, Eliminalo"}
          colorTYB={"danger"}
          onClickTYB={() => deleteUser(modalInfo)}
        />
        <AlertDism
          isOpen={showModal2}
          setisOpen={setShowModal2}
          contentText={"El usuario ha sido eliminado con exito."}
          color={"success"}
          delay={5}
        />
        <div className="w-full lg:w-10/12 px-4 py-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Usuarios</h6>
                <Link to={`/user/form`}>
                  <Button
                    label="Agregar"
                    textColor="white"
                    bgColor="bg-gradient-to-r from-blue-400 to-blue-500"
                  />
                </Link>
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
