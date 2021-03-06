import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setToastData } from '../../store/action/actions';

import {
  ButtonComponent as Button,
  InputComponent as Input,
  LoadingPageComponent as Load,
  SelectComponent as Select,
} from '../../components/common';
import { configUrl, toHoverStyle } from '../../components/utils';
import { RootState } from '../../store/store';

const activeOptions: ISelectOption[] = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];

const SupplierForm: React.FC = () => {
  const [show, setShow] = useState(false);
  const [selActive, setSelActive] = useState<ISelectOption>(activeOptions[0]);
  const { control, handleSubmit, setValue } = useForm<TFormValues<IFormSupplier>>({
    defaultValues: {
      values: {
        name: '',
        phone: '0',
        company: '',
        doctype: '',
        docnum: '0',
        visitday: '',
        active: activeOptions[0],
      },
    },
  });
  const { id } = useParams<IParamTypes>();
  const { access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    id ? getSupplier() : setShow(true)
    // eslint-disable-next-line
  }, []);

  const getSupplier = async () => {
    const url: RequestInfo = `${configUrl}/suppliers/${id}`;
    const response = await fetch(url);
    const { name, phone, company, doctype, docnum, visitday, active }: ISupplier = await response.json();
    const activeOption = active ? activeOptions[0] : activeOptions[1];
    if (response.ok) {
      setValue('values', {
        name,
        phone,
        company,
        doctype,
        docnum,
        visitday,
        active: activeOption,
      });
      setSelActive(activeOption)
      setShow(true)
    } else {
      //console.log('Error: Unknow error || Server error');
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method: Get, Error${response.status} : ${response.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const onSubmit: SubmitHandler<TFormValues<IFormSupplier>> = ({ values }) => {
    if (id) {
      updateSupplier(values)
    } else {
      createSupplier(values)

    }
    console.log('onsubmit', values);
  }

  const updateSupplier = async (data: IFormSupplier) => {
    const url: RequestInfo = `${configUrl}/suppliers/${id}`;
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers":	"Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
      },
      body: JSON.stringify({
        ...data,
        'active': data.active.value
      }),
    }
    const res = await fetch(url, requestInit);
    //const dataRes = await res.json()
    if (res.ok) {
      //console.log('Supplier Updated', dataRes)
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El proveedor ha sido actualizado con exito.',
        color: 'success',
        delay: 5
      }))
      history.push('/supplier')
    } else {
      //console.log('Error: Unknow error || Server error');
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Update, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const createSupplier = async (data: IFormSupplier) => {
    const url: RequestInfo = `${configUrl}/suppliers`;
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers":	"Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
      },
      body: JSON.stringify({
        ...data,
        'active': data.active.value
      }),
    }
    const res = await fetch(url, requestInit);
    //const dataRes = await res.json()
    if (res.ok) {
      //console.log('Supplier Created', dataRes)
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El proveedor se ha creado con exito.',
        color: 'success',
        delay: 5
      }))
      history.push('/supplier')
    } else {
      //console.log('Error: Unknow error || Server error')
      console.log(res)
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  return show ? (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Proveedores</h6>

                  <Button
                    label="Regresar"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                    onClick={() => history.goBack()}
                  />

              </div>
            </div>
            <div className="flex-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-2 py-3 px-6"
              >
                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion del proveedor
                </h6>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.name"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="text"
                          label="Nombre"
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.doctype"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="text"
                          label="Tipo de documento"
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.docnum"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="number"
                          label="Numero de documento"
                          name={name}
                          value={value}
                          onChange={onChange}
                          focus
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.active"
                      render={({ field: { onChange, name } }) => (
                        <Select
                          label="Estado"
                          name={name}
                          value={selActive}
                          options={activeOptions}
                          onChange={onChange}
                          handleChange={setSelActive}
                        />
                      )}
                    />
                  </div>
                </div>

                <hr className="mt-3 border-b-1 border-gray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de Contacto
                </h6>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.visitday"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="text"
                          label="Dia de Visita"
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className=" px-4">
                    <Controller
                      control={control}
                      name="values.company"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="text"
                          label="Empresa"
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className=" px-4">
                    <Controller
                      control={control}
                      name="values.phone"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="number"
                          label="Telefono"
                          name={name}
                          value={value}
                          onChange={onChange}
                          focus
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <Button
                    label={ id ? 'Actualizar Proveedor' : 'Crear Proveedor' }
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                    submit
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ): <Load/>
};

export default SupplierForm;
