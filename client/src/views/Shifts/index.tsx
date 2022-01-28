import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import {
  TableComponent as Table,
  LoadingPageComponent as Load,
} from '../../components/common';
import { formatDateHours, renderIconActions } from '../../components/utils';
import { setModalData, setToastData } from '../../store/action/actions';

const tableFieldData = [
  { text: 'Usuario', width: 2, name: 'user' },
  { text: 'Hora Inicio', width: 2, name: 'start'},
  { text: 'Hora Fin', width: 2, name: 'end'},
  { text: 'Inicia Caja', width: 1, name: 'startAmount'},
  { text: 'Finaliza Caja', width: 1, name: 'endAmount'},
  { text: 'Monto Esperado', width: 1, name: 'expectedAmount'},
  { text: 'Acciones', width: 2, name: 'actions' },
];

const ShiftView: React.FC = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [shiftsData, setShiftsData] = useState<IShift[]>([]);
  const [ tableData, setTableData ] = useState<IShiftTableData[]>([]);
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const url: RequestInfo = "http://localhost:8000/shifts"

  useEffect(() => {
    getShiftData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (shiftsData.length === 0) return;

    const prepareTableData = () => {
      let { name: role } = userData.role
      let showActions = {
        edit: false,
        delete: false,
        more: false,
      }
      if (role === "Administrador") {
        showActions = {
          edit: true,
          delete: true,
          more: false,
        }
      }
      if (role === "Empleado") {
        showActions = {
          edit: false,
          delete: false,
          more: false,
        }
      }

      let newTableData: IShiftTableData[] = shiftsData.slice(0).reverse().map(
        ({
          _id,
          user,
          start,
          end,
          orders,
          sales,
          startAmount,
          endAmount,
          expectedAmount,
          status,
        }: IShift) => {
          let newData: IShiftTableData = {
            _id,
            user: user.name,
            start: formatDateHours(new Date(start)),
            end: end ? formatDateHours(new Date(end)) : 'No se ha finalizado el turno',
            startAmount,
            endAmount,
            expectedAmount,
            actions: renderIconActions(_id, 'shift', showAlert , showActions)
          };
          return newData;
        },
      );
      setTableData(newTableData);
      //console.log('data', newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [shiftsData]);

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
    setShow(true)
  };

  const deleteShift = async (id: string) => {
    const urlDelete: RequestInfo = url + `/${id}`;
    const requestInit: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlDelete, requestInit)
    const data = await res.json()
    if (res.ok) {
      console.log('Shift deleted', data)
      getShiftData();
      dispatch(setModalData({setisOpen: (prev => !prev)}))
      showAlert('toast')
    }else{
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const showAlert = (type: string, id?: string) => {
    if (type === 'toast') {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El turno ha sido eliminado con exito.',
        color: 'success',
        delay: 5
      }))
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
        onClickTYB: () => deleteShift(id!)
      }))
    }
  }

  return show ? (
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
  ) : <Load/>
}

export default ShiftView
