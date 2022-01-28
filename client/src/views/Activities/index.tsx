import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import {
  TableComponent as Table,
  ChipComponent as Chip,
  InputComponent as Input,
} from '../../components/common';
import { RootState } from '../../store/store';
import { formatDate } from '../../components/utils';

import {
  ChevronDownIcon,
  SearchIcon,
} from '@heroicons/react/outline';

const iconValue = {
  isActive: true,
  Icon: SearchIcon,
};

const tableFieldData = [
  { text: 'Creado por', width: 2, name: 'createdby' },
  { text: 'Fecha', width: 1, name: 'date' },
  { text: 'Monto Actividad', width: 1, name: 'actamount' },
  { text: 'Monto Caja', width:1, name: 'curramount' },
  { text: 'Actividad', width: 1, name: 'name' },
  { text: 'Estado', width: 1, name: 'status' },
];

const ActivityView = () => {

  const [ saleData, setSaleData ] = useState<IActivity[]>([]);
  const [ tableData, setTableData ] = useState<IActivityTableData[]>([]);
  const [ searchValue, setSearchValue] = useState<string>('')
  const [filterActivity, setFilterActivity] = useState('All')
  const { access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const url: RequestInfo = 'http://localhost:8000/activities';

  useEffect(() => {
    if (searchValue.length > 2) {
      getSearchActivity(searchValue);
    } else {
      getActivitiesData();
    }
    // eslint-disable-next-line
  }, [searchValue])

  // useEffect(() => {
  //   getActivitiesData();
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    orderByActivity(filterActivity)
    // eslint-disable-next-line
  }, [filterActivity])

  useEffect(() => {
    if (saleData.length === 0) return;

    const prepareTableData = () => {

      let newTableData: IActivityTableData[] = saleData.map(
        ({
          _id,
          createdby,
          date,
          actamount,
          curramount,
          name,
          activityid,
          status,
        }: IActivity) => {
          let newData: IActivityTableData = {
            _id,
            createdby: createdby.name,
            date: formatDate(new Date(date)),
            actamount,
            curramount,
            name: renderChip(name),
            status: renderChip(status),
            //actions: renderIconActions(_id, 'sale', showAlert, showActions)
          };
          return newData;
        },
      );
      setTableData(newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [saleData]);

  const getSearchActivity = async (search: string) => {
    const urlSearch: RequestInfo = `http://localhost:8000/activities/search/${search}`;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlSearch, requestInit);
    const data = await res.json();
    if (res.ok) {
      data.reverse()
      setSaleData(data);
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const getActivitiesData = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, requestInit);
    const data = await res.json();
    if (res.ok) {
      data.reverse()
      setSaleData(data);
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const getActData = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, requestInit);
    const data = await res.json();
    if (res.ok) {
      data.reverse()
      return data;
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const getSearchAct = async (search: string) => {
    const urlSearch: RequestInfo = `http://localhost:8000/activities/search/${search}`;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlSearch, requestInit);
    const data = await res.json();
    if (res.ok) {
      data.reverse()
      return data
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const renderChip = (status: string) => {
    let bg = 'white'
    switch (status) {
      case 'Anulado':
        bg = 'red'
        break;
      case 'Completado':
        bg = 'green'
        break;
      case 'Actualizado':
        bg = 'blue'
        break;
      case 'Orden':
        bg = 'blue'
        break;
      case 'Retiro':
        bg = 'red'
        break;
      case 'Ingreso':
        bg = 'yellow'
        break;
      default:
        bg = 'green'
        break;
    }
    return (
      <Chip
        label={status}
        bgColor={bg}
        txtColor="white"
      />
    )
  }

  const handleChangeSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const orderByActivity = async (filterActivity: string) => {
    if (filterActivity === 'All') {
      getActivitiesData()
    } else if (filterActivity === 'Venta') {
      let b
      if (searchValue.length > 2) {
        b = await getSearchAct(searchValue);
      } else {
        b = await getActData();
      }
      let a = []
      for (let i = 0; i < b.length; i++) {
        if (b[i].name === 'Venta') {
          a.push(b[i])
        }
      }
      if(a.length === 0) {
        setTableData([])
      }
      setSaleData(a)
    } else if (filterActivity === 'Pedido') {
      let b
      if (searchValue.length > 2) {
        b = await getSearchAct(searchValue);
      } else {
        b = await getActData();
      }
      let a = []
      for (let i = 0; i < b.length; i++) {
        if (b[i].name === 'Orden') {
          a.push(b[i])
        }
      }
      if(a.length === 0) {
        setTableData([])
      }
      setSaleData(a)
    } else if (filterActivity === 'Retiro') {
      let b
      if (searchValue.length > 2) {
        b = await getSearchAct(searchValue);
      } else {
        b = await getActData();
      }
      let a = []
      for (let i = 0; i < b.length; i++) {
        if (b[i].name === 'Retiro') {
          a.push(b[i])
        }
      }
      if(a.length === 0) {
        setTableData([])
      }
      setSaleData(a)
    } else if (filterActivity === 'Ingreso') {
      let b
      if (searchValue.length > 2) {
        b = await getSearchAct(searchValue);
      } else {
        b = await getActData();
      }
      let a = []
      for (let i = 0; i < b.length; i++) {
        if (b[i].name === 'Ingreso') {
          a.push(b[i])
        }
      }
      if(a.length === 0) {
        setTableData([])
      }
      setSaleData(a)
    }
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-lg bg-white mb-0 px-6 py-6">
              <div className="flex items-center justify-between mx-6">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">
                  Movimientos de Caja
                </h6>
              </div>

              <div className="box mx-6 mt-6 mb-3 flex">
                <div className="box-wrapper flex-1">
                  <div className=" bg-white rounded flex items-center w-full shadow-sm border border-gray-200">
                    <Input
                      type="search"
                      label=""
                      name={'busqueda'}
                      value={searchValue}
                      onChange={handleChangeSV}
                      placeholder="Buscar por usuario..."
                      icon={iconValue}
                    />
                  </div>
                </div>
                <div className="flex-1 relative">
                  <select
                    value={filterActivity}
                    onChange={(e) => setFilterActivity(e.target.value)}
                    className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="All">Todos</option>
                    <option value="Venta" >Ventas</option>
                    <option value="Pedido">Pedidos</option>
                    <option value="Retiro">Retiros</option>
                    <option value="Ingreso">Ingresos</option>
                  </select>
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDownIcon className="fill-current h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <Table theadData={tableFieldData} tbodyData={tableData} pagination={{enabled : true, fieldsPerPage: 10}}/>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityView
