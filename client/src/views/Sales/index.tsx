import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setModalData, setNotificationData, setToastData } from '../../store/action/actions';

import {
  TableComponent as Table,
  ButtonComponent as Button,
  ChipComponent as Chip,
  InputComponent as Input,
} from '../../components/common';
import { RootState } from '../../store/store';
import { formatDate, renderActiveChip, renderIconActions, roundDecimals, toHoverStyle } from '../../components/utils';

import {
  SearchIcon,
} from '@heroicons/react/outline';

const tableFieldData = [
  { text: 'Creado por', width: 2, name: 'createdby' },
  { text: 'Cliente', width: 2, name: 'client' },
  { text: 'Fecha', width: 1, name: 'date' },
  { text: 'Total', width: 1, name: 'subtotal' },
  { text: 'Metodo de pago', width:2, name: 'methodpay' },
  { text: 'Boleta', width: 1, name: 'voucher' },
  { text: 'Estado', width: 2, name: 'status' },
  { text: 'Acciones', width: 2, name: 'actions' },
];

const iconValue = {
  isActive: true,
  Icon: SearchIcon,
};

const SaleView: React.FC = () => {
  const dispatch = useDispatch()
  const [ saleData, setSaleData ] = useState<ISale[]>([]);
  const [ tableData, setTableData ] = useState<ISaleTableData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('')
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const url: RequestInfo = 'http://localhost:8000/sales';

  useEffect(() => {
    if (searchValue.length > 2) {
      getSearchSale(searchValue);
    } else {
      getSaletData();
    }
    // eslint-disable-next-line
  }, [searchValue])

  useEffect(() => {
    getSaletData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (saleData.length === 0) return;

    const prepareTableData = () => {
      let showActions: any

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
          if (status === 'Anulado') {
            showActions = {
              edit: true,
              more: false,
            }
          } else {
            showActions = {
              edit: true,
              more: false,
              cancel: {
                show: true,
                action: cancelSale
              }
            }
          }
          let newData: ISaleTableData = {
            _id,
            createdby: createdby.name,
            client,
            date: formatDate(new Date(date)),
            cash: 'S/ ' + cash,
            change: 'S/ ' + change,
            subtotal: 'S/ ' + subtotal,
            methodpay,
            voucher,
            status: renderChip(status),
            actions: renderIconActions(_id, 'sale', showAlert, showActions)
          };
          return newData;
        },
      );
      setTableData(newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [saleData]);

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
    }
    return (
      <Chip
        label={status}
        bgColor={bg}
        txtColor="white"
      />
    )
  }

  const getSearchSale = async (searchVal: string) => {
    const urlSearch: RequestInfo = `http://localhost:8000/sales/search/${searchVal}`;
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
    if (res.ok) {
      data.reverse()
      setSaleData(data);
    } else {
      console.log('Error: Unknow error || Server error');
    }
  };

  const showAlert = (type: string, id?: string) => {
    if (type === 'toast') {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El producto ha sido eliminado con exito.',
        color: 'success',
        delay: 5
      }))
    }
  }

  const cancelSale = async (id: string) => {

    const urlSale: RequestInfo = `http://localhost:8000/sales/${id}`;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlSale, requestInit);
    if (res.ok) {
      const data = await res.json() as ISale;

      let cash = await getCash()
      if (Number(cash.cash) - Number(data.subtotal) < 0) {
        dispatch(setToastData({
          isOpen: true,
          setisOpen: (prev => !prev),
          contentText: `No hay suficiente cantidad en caja, contacte un admin`,
          color: 'warning',
          delay: 5
        }))
        return
      }

      let products = [...data.products]
      for (let i = 0; i < products.length; i++) {
        const prod = products[i];
        await updateProductSale(prod.product._id, prod.quantity)
      }
      const requestInit: RequestInit = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: 'Anulado',
        }),
      }
      const res2 = await fetch(urlSale, requestInit)
      if (res2.ok) {
        let data = await res2.json()
        console.log('res', data)
        addActivity(data)
        dispatch(setToastData({
          isOpen: true,
          setisOpen: (prev => !prev),
          contentText: 'Se ha anulado la venta con exito.',
          color: 'success',
          delay: 5
        }))
        getSaletData()
      } else {
        console.log('Error: Unknow error || Server error UpdateSale');
      }
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const addActivity = async (data: any) => {
    let cash = await getCash()
    let curramount = roundDecimals(Number(cash.cash) - Number(data.subtotal))
    const urlSale = "http://localhost:8000/activities"
    let dateNow: Date = new Date()
    setCash(curramount, cash._id)
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: dateNow,
        actamount: data.subtotal,
        curramount: curramount + '',
        createdby: userData._id,
        name: 'Venta',
        status: 'Anulado',
        activityid: data._id,
      }),
    }
    const res = await fetch(urlSale, requestInit);
    if (res.ok) {
      console.log('Activity created')
    } else {
      console.log('No se pudo we');
    }
  }

  const setCash = async (putCash:number, id: string) => {
    const urlPro: RequestInfo = `http://localhost:8000/cash/${id}`
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cash: putCash + '',
      })
    };
    const res = await fetch(urlPro, requestInit);
    if (res.ok) {
      console.log('Cash updated')
    }else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Hubo un error al actualizar la caja`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const getCash = async () => {
    const urlPro: RequestInfo = 'http://localhost:8000/cash'
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlPro, requestInit);
    const data = await res.json();
    return data[0]
  }

  const updateProductSale = async (id: string, quantity: string) => {
    const oldProduct = await getProduct(id)
    const urlPro: RequestInfo = 'http://localhost:8000/products'
    const url: RequestInfo = urlPro + `/${id}`;
    let requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: (Number(oldProduct.stock) + Number(quantity)) + '',
      }),
    }
    const res = await fetch(url, requestInit);
    if (res.ok) {
      console.log('Quantity Product updated')
    }else {
      console.log('No se pudo we');
    }
  }

  const getProduct = async (pId: string) => {
    const urlPro: RequestInfo = 'http://localhost:8000/products'
    const urlReq: RequestInfo = urlPro + `/${pId}`;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlReq, requestInit);
    const data = await res.json();
    return data
  }

  const handleChangeSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

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

              <div className="box mx-6 mt-6 mb-3">
              <div className="box-wrapper">
                <div className=" bg-white rounded flex items-center w-full shadow-sm border border-gray-200">
                  <Input
                    type="search"
                    label=""
                    name={'busqueda'}
                    value={searchValue}
                    onChange={handleChangeSV}
                    placeholder="Buscar producto..."
                    icon={iconValue}
                  />
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

export default SaleView
