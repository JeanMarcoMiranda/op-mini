import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

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
import { RootState } from '../../store/store';

const tableFieldData = [
  { text: 'Nombre', width: 2, name: 'name' },
  { text: 'Telefono', width: 2, name: 'phone' },
  { text: 'Correo', width: 1, name: 'email' },
  { text: 'Direccion', width: 1, name: 'address' },
  { text: 'Estado', width: 1, name: 'active' },
  { text: 'Acciones', width: 2, name: 'actions' },
];

const SupplierView: React.FC = () => {

  const [supplierData, setSupplierData] = useState<ISupplier[]>([]);
  const [tableData, setTableData] = useState<ISupplierTableData[]>([]);
  const { access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const url = 'http://localhost:8000/suppliers';

  useEffect(() => {
    getSupplierData()
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (supplierData === []) return;

    const prepareTableData = () => {
      let newTableData: ISupplierTableData[] = supplierData.map(
        ({ _id, name, phone, email, doctype, docnum, address, active }: ISupplier) => {
        let newData: ISupplierTableData = {
          _id,
          name,
          phone,
          email,
          address,
          active: renderActiveChip(active),
          actions: renderActions(_id),
        };
        return newData;
        });
      setTableData(newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [supplierData]);

  const getSupplierData = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await fetch(url, requestInit)
    const data = await res.json()
    setSupplierData(data)
  }

  const deleteSupplier = async (idSupplier: string) => {
    const urlDelete: RequestInfo = url + '/' + idSupplier
    const requestInit: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlDelete, requestInit)
    const data = await res.json()
    console.log('Supplier deleted', data)
    getSupplierData()
  }

  const renderActions = (idSupplier: string) => (
    <div className="flex item-center justify-center">
      <Icon
        width={5}
        color="blue"
        Icon={AnnotationIcon}
        hover
      />
      <Link to={`/supplier/form/${idSupplier}`}>
        <Icon
          width={5}
          color="blue"
          Icon={PencilAltIcon}
          hover
        />
      </Link>
      <Icon
        width={5}
        color="red"
        Icon={ArchiveIcon}
        hover
        onClick={ () => deleteSupplier(idSupplier) }
      />
    </div>
  )

  const renderActiveChip = (isActive: boolean) => (
    <Chip
      label={isActive ? 'Activo' : 'Inactivo'}
      bgColor="blue"
      txtColor="blue"
    />
  )

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
              <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Proveedores</h6>
                <Link to={`/supplier/form`}>
                  <Button
                    label="Agregar"
                    textColor="white"
                    bgColor="bg-blue-500"
                  />
                </Link>
              </div>
            </div>
            <div className="my-3">
              <Table
                theadData={tableFieldData}
                tbodyData={tableData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierView;
