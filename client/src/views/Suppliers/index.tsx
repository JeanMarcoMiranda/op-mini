import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setModalData, setNotificationData, setToastData } from '../../store/action/actions';
import {
  SearchIcon,
} from '@heroicons/react/outline';
import {
  ButtonComponent as Button,
  TableComponent as Table,
  InputComponent as Input,
} from '../../components/common';
import { RootState } from '../../store/store';
import { configUrl, renderActiveChip, renderIconActions, toHoverStyle } from '../../components/utils';

interface IModalUInfo {
  name?: string,
  doctype?: string,
  docnum?: number,
}

const tableFieldData = [
  { text: 'Nombre', width: 2, name: 'name' },
  { text: 'Telefono', width: 1, name: 'phone' },
  { text: 'Empresa', width: 2, name: 'company' },
  { text: 'Dia de Visita', width: 1, name: 'visitday' },
  { text: 'Estado', width: 1, name: 'active' },
  { text: 'Acciones', width: 2, name: 'actions' },
];

const tableNotification = [
  { text: 'Nombre'},
  { text: 'Tipo de documento'},
  { text: 'Numero de documento'},
];

const iconValue = {
  isActive: true,
  Icon: SearchIcon,
};


const SupplierView: React.FC = () => {
  const dispatch = useDispatch()
  const [supplierData, setSupplierData] = useState<ISupplier[]>([]);
  const [tableData, setTableData] = useState<ISupplierTableData[]>([]);
  const [searchVal, setSearchVal] = useState('');
  const { setValue, control } = useForm<TFormValues<ISearch>>({
    defaultValues: { values: { search: '' } },
  });
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const url = `${configUrl}/suppliers`;

  useEffect(() => {
    getSupplierData()
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (searchVal.length > 2) {
      getSearchSupplier(searchVal);
    } else {
      getSupplierData();
    }
    // eslint-disable-next-line
  }, [searchVal]);

  useEffect(() => {
    if (supplierData === []) return;

    const prepareTableData = () => {
      let { name: role } = userData.role
      let showActions = {
        edit: false,
        delete: false,
        order: false,
      }
      if (role === "Administrador") {
        showActions = {
          edit: true,
          delete: true,
          order: true,
        }
      }
      if (role === "Empleado") {
        showActions = {
          edit: false,
          delete: false,
          order: true,
        }
      }

      let newTableData: ISupplierTableData[] = supplierData.map(
        ({ _id, name, phone, company, doctype, docnum, visitday, active }: ISupplier) => {
        let showActionAux = {...showActions}
        if (!active) {
          showActionAux.order = false
        }
        let newData: ISupplierTableData = {
          _id,
          name,
          phone,
          company,
          visitday,
          active: renderActiveChip(active),
          actions: renderIconActions(_id, 'supplier', showAlert, showActionAux),
        };
        return newData;
        });
      setTableData(newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [supplierData]);

  const getDataNotification = async (id: string) => {
    const urlReq: RequestInfo = url + `/${id}`;
    const res = await fetch(urlReq);
    const {
      name,
      doctype,
      docnum,
    }: IModalUInfo = await res.json();
    const data = {name,doctype,docnum};
    dispatch(setNotificationData({
      isOpen: true,
      setisOpen: (prev => !prev),
      title: 'Notificacion del proveedor',
      theadData: tableNotification,
      tbodyData: data
    }))
  };

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
    console.log(data)
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
    getSupplierData();
    dispatch(setModalData({setisOpen: (prev => !prev)}))
    showAlert('toast')
  }

  const showAlert = (type: string, id?: string) => {
    if (type === 'toast') {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El proveedor ha sido eliminado con exito.',
        color: 'success',
        delay: 5
      }))
    }
    else if (type === 'notifi') {
      getDataNotification(id!)
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
        onClickTYB: () => deleteSupplier(id!)
      }))
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('values', {
      search: event.target.value,
    });
    setSearchVal(event.target.value);
  };

  const getSearchSupplier = async (search: string) => {
    const urlSearch: RequestInfo = `${configUrl}/suppliers/search/${search}`;
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
      setSupplierData(data);
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-lg bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
              <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Proveedores</h6>
              { userData.role.name === "Administrador" &&
                <Link to={`/supplier/form`}>
                  <Button
                    label="Agregar"
                    textColor="white"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                  />
                </Link>
              }
              </div>
            </div>

            <div className="box mx-6 mt-6 mb-3">
              <div className="box-wrapper">
                <div className=" bg-white rounded flex items-center w-full shadow-sm border border-gray-200">
                  <Controller
                    control={control}
                    name="values.search"
                    render={({ field: { value, name } }) => (
                      <Input
                        type="search"
                        label=""
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder="Buscar proveedor por empresa..."
                        icon={iconValue}
                      />
                    )}
                  />
                </div>
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
