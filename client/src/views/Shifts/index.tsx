import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import {
  TableComponent as Table,
  ButtonComponent as Button,
} from '../../components/common';
import { formatDate } from '../../components/utils';

const tableFieldData = [
  { text: 'Usuario', width: 2, name: 'user' },
  { text: 'Hora Inicio', width: 1, name: 'start'},
  { text: 'Hora Fin', width: 1, name: 'end'},
  { text: 'Monto Inicial', width: 1, name: 'startAmount'},
  { text: 'Monto Final', width: 1, name: 'endAmount'},
  { text: 'Estado', width: 1, name: 'status'}
];

const ShiftView: React.FC = () => {
  const [shiftsData, setShiftsData] = useState<IShif[]>([]);
  const [ tableData, setTableData ] = useState<IShiftTableData[]>([]);
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const url: RequestInfo = "http://localhost:8000/shifts"

  useEffect(() => {
    const getShiftData = async () => {
      const requestInit: RequestInit = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(url, requestInit)
      const data = await res.json()
      //const dataOrderDesc = data.reverse()
      setShiftsData(data)
    };

    getShiftData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (shiftsData.length === 0) return;

    const prepareTableData = () => {
      let showActions = {
        edit: true,
        more: false,
      }

      let newTableData: IShiftTableData[] = shiftsData.map(
        ({
          _id,
          user,
          start,
          end,
          orders,
          sales,
          startAmount,
          endAmount,
          status,
        }: IShif) => {
          let newData: IShiftTableData = {
            _id,
            user,
            start: formatDate(new Date(start)),
            end: formatDate(new Date(end)),
            startAmount,
            endAmount,
            status,
            //actions: renderIconActions(_id, 'sale', showAlert, showActions)
          };
          return newData;
        },
      );
      setTableData(newTableData);
      console.log('data', newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [shiftsData]);

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-lg bg-white mb-0 px-6 py-6">
              <div className="flex items-center justify-between mx-6">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">
                  Turnos
                </h6>
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

export default ShiftView
