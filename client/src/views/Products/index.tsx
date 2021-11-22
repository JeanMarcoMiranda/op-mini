import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { renderActiveChip, renderIconActions, toHoverStyle } from '../../components/utils';

interface IModalUInfo {
  name?: string,
  date?: string,
  description?: string,
}

const tableFieldData = [
  { text: 'Codigo de Barras', width: 2, name: 'barcode' },
  { text: 'Nombre', width: 2, name: 'name' },
  { text: 'Categoria', width: 1, name: 'category' },
  { text: 'Empresa', width: 1, name: 'company' },
  { text: 'Stock', width: 1, name: 'stock' },
  { text: 'Precio Compra', width: 1, name: 'pricebuy' },
  { text: 'Precio Venta', width: 1, name: 'pricesell' },
  { text: 'Unidad Medida', width: 1, name: 'mesureUnit' },
  { text: 'Estado', width: 1, name: 'active' },
  { text: 'Acciones', width: 2, name: 'actions' },
];

const tableNotification = [
  { text: 'Nombre'},
  { text: 'Actualizado el'},
];

const iconValue = {
  isActive: true,
  Icon: SearchIcon,
};

const ProductsView: React.FC = () => {
  const dispatch = useDispatch()
  const [ productData, setProductData ] = useState<IProduct[]>([]);
  const [ tableData, setTableData ] = useState<IProductTableData[]>([]);
  const { setValue, control } = useForm<TFormValues<ISearch>>({
    defaultValues: { values: { search: '' } },
  });
  const [searchVal, setSearchVal] = useState('');
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const url: RequestInfo = 'http://localhost:8000/products';

  useEffect(() => {
    if (searchVal.length > 2) {
      getSearchProduct(searchVal);
    } else {
      getProductData();
    }
    // eslint-disable-next-line
  }, [searchVal]);

  useEffect(() => {
    if (productData.length === 0) return;

    const prepareTableData = () => {
      let { name: role } = userData.role
      let showActions = {
        edit: false,
        delete: false
      }
      if (role === "Administrador") {
        showActions = {
          edit: true,
          delete: true
        }
      } else if (role === "Almacenero") {
        showActions = {
          edit: true,
          delete: false
        }
      }

      let newTableData: IProductTableData[] = productData.map(
        ({
          _id,
          barcode,
          name,
          category,
          stock,
          pricebuy,
          pricesell,
          mesureUnit = '',
          date,
          description,
          active,
          company = '',
        }: IProduct) => {
          const newData: IProductTableData = {
            _id,
            barcode,
            name,
            category: category.name,
            stock,
            pricebuy,
            pricesell,
            mesureUnit: mesureUnit,
            active: renderActiveChip(active),
            actions: renderIconActions(_id, 'product', showAlert, showActions),
            company,
          };
          return newData;
        },
      );
      setTableData(newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [productData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('values', {
      search: event.target.value,
    });
    setSearchVal(event.target.value);
  };

  const getDataNotification = async (id: string) => {
    const urlReq: RequestInfo = url + `/${id}`;
    const res = await fetch(urlReq);
    const {
      name,
      date,
      description,
    }: IModalUInfo = await res.json();
    const newDate = date?.replace('GMT-0500 (hora estándar de Perú)', '')
    const data = {name,newDate};
    dispatch(setNotificationData({
      isOpen: true,
      setisOpen: (prev => !prev),
      title: 'Notificacion del producto',
      theadData: tableNotification,
      tbodyData: data,
      titleContent: 'Descripcion',
      contentText: description
    }))
 };

  const getSearchProduct = async (search: string) => {
    const urlSearch: RequestInfo = `http://localhost:8000/products/search/${search}`;
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
      setProductData(data);
    } else {
      console.log('Error: Unknow error || Server error');
    }
  };

  const getProductData = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, requestInit);
    const data = await res.json();
    setProductData(data);
  };

  const deleteProduct = async (idProduct: string) => {
    const urlDelete: RequestInfo = url + '/' + idProduct;
    const requestInit: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlDelete, requestInit);
    const data = await res.json();
    console.log('Product Deleted', data);
    getProductData();
    dispatch(setModalData({setisOpen: (prev => !prev)}))
    showAlert('toast')
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
        onClickTYB: () => deleteProduct(id!)
      }))
    }
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-lg bg-white mb-0 px-6 py-3">
              <div className="flex items-center justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">
                  Productos
                </h6>
                { userData.role.name === "Administrador" &&
                  <Link to={`/product/form`}>
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
                        placeholder="Buscar producto..."
                        icon={iconValue}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <Table theadData={tableFieldData} tbodyData={tableData} pagination={{enabled: true, fieldsPerPage: 5}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsView;
