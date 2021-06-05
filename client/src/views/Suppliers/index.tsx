import React, { useEffect, useState } from 'react';
import {
  AnnotationIcon,
  PencilAltIcon,
  ArchiveIcon,
} from '@heroicons/react/outline';
import {
  ChipComponent,
  IconComponent,
  TableComponent,
} from '../../components/common';

import { Link } from 'react-router-dom'

interface ISupplier {
  _id: string;
  name: string;
  phone: number;
  email: string;
  doctype: string;
  docnum: number;
  address: string;
  active: boolean;
}

interface ISupplierDataTable {
  _id: string;
  name: string;
  phone: number;
  email: string;
  address: string;
  active: JSX.Element;
  actions: JSX.Element;
}

const tableFieldData = [
  { text: 'Nombre', width: 2, name: 'name' },
  { text: 'Telefono', width: 2, name: 'phone' },
  { text: 'Correo', width: 1, name: 'email' },
  { text: 'Direccion', width: 1, name: 'address' },
  { text: 'Estado', width: 1, name: 'active' },
  { text: 'Acciones', width: 2, name: 'actions' },
];

const ProductsPage = () => {
  const [tableData, setTableData] = useState<ISupplier[]>([]);
  const [tableBodyData, setTableBodyData] = useState<ISupplierDataTable[]>([]);

  const url = 'http://localhost:5000/suppliers';

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjp7Il9pZCI6IjYwYTMzZTZkZTNhN2Q1MjQwYzE1YzY2MCIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZGVzY3JpcHRpb24iOiJSb2wgZGUgYWRtaW5pc3RyYWRvciIsImlzQWN0aXZlIjp0cnVlLCJfX3YiOjB9LCJpYXQiOjE2MjIzMjc5MjAsImV4cCI6MTYyMzE5MTkyMH0.wHhPnnFLgajxmIDZ5_0x3HXB-IK9i12RcQw2ux8ADgg',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setTableData(data));
  }, []);

  useEffect(() => {
    if (tableData === []) return;

    const prepareTableData = () => {
      let newTableData: ISupplierDataTable[] = tableData.map(
        ({
          _id,
          name,
          phone,
          email,
          doctype,
          docnum,
          address,
          active,
        }: ISupplier) => {
          let newData: ISupplierDataTable = {
            _id,
            name,
            phone,
            email,
            address,
            active: (
              <ChipComponent
                label={active ? 'Activo' : 'Inactivo'}
                bgColor="purple"
                txtColor="purple"
              />
            ),
            actions: (
              <div className="flex item-center justify-center">
                <IconComponent
                  width={5}
                  color="purple"
                  Icon={AnnotationIcon}
                  hover
                />
                <Link to={`/supplier/form/${_id}`}>
                <IconComponent
                  width={5}
                  color="purple"
                  Icon={PencilAltIcon}
                  hover
                />
                </Link>
                <IconComponent
                  width={5}
                  color="purple"
                  Icon={ArchiveIcon}
                  hover
                />
              </div>
            ),
          };
          return newData;
        },
      );

      setTableBodyData(newTableData);
    };

    prepareTableData();
  }, [tableData]);

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 px-4 py-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-xl font-bold">Productos</h6>
                <button
                  className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none"
                  type="button"
                >
                  Nuevo Proveedor
                </button>
              </div>
            </div>
            <TableComponent
              theadData={tableFieldData}
              tbodyData={tableBodyData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
