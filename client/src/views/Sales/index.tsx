import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { setModalData, setNotificationData, setToastData } from '../../store/action/actions';

import {
  TableComponent as Table,
  ButtonComponent as Button,
} from '../../components/common';
import { RootState } from '../../store/store';
import { formatDate, renderActiveChip, renderIconActions, toHoverStyle } from '../../components/utils';


const tableFieldData = [
  { text: 'Creado por', width: 2, name: 'createdby' },
  { text: 'Cliente', width: 1, name: 'client' },
  { text: 'Fecha', width: 1, name: 'date' },
  { text: 'Efectivo', width: 1, name: 'cash' },
  { text: 'Cambio', width: 1, name: 'change' },
  { text: 'Metodo de pago', width:2, name: 'methodpay' },
  { text: 'Boleta', width: 1, name: 'voucher' },
  { text: 'Estado', width: 1, name: 'status' },
  { text: 'Acciones', width: 2, name: 'actions' },
];


const SaleView: React.FC = () => {
  //const dispatch = useDispatch()
  const [ saleData, setSaleData ] = useState<ISale[]>([]);
  const [ tableData, setTableData ] = useState<ISaleTableData[]>([]);
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const url: RequestInfo = 'http://localhost:8000/sales';

  useEffect(() => {
    const getSaletData = async () => {
      const requestInit: RequestInit = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      const res = await fetch(url, requestInit);
      const data = await res.json();
      setSaleData(data);
    }; 

    getSaletData();
    // eslint-disable-next-line
  }, []);



  useEffect(() => {
    if (saleData.length === 0) return;

    const prepareTableData = () => {

      let newTableData: ISaleTableData[] = saleData.map(
        ({
          _id,
          createdby,
          client,
          date,
          cash,
          subtotal,
          change,
          methodpay,
          voucher,
          status,
        }: ISale) => {
          let newData: ISaleTableData = {
            _id,
            createdby: createdby.name,
            client,
            date: formatDate(new Date(date)),
            cash,
            change,
            methodpay,
            voucher,
            status,
          };
          return newData;
        },
      );
      //console.log(newTableData)
      setTableData(newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [saleData]);

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-lg bg-white mb-0 px-6 py-6">
              <div className="flex items-center justify-between mx-6">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">
                  Ventas
                </h6>
                <Link to={`/sale/form`}>
                  <Button
                    label="Agregar"
                    textColor="white"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                  />
                </Link>
              </div>

              <div className="mb-3">
                <Table theadData={tableFieldData} tbodyData={tableData} pagination={{enabled : true, fieldsPerPage: 5}}/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SaleView
