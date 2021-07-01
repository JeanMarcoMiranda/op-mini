import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  ButtonComponent as Button,
  InputComponent as Input,
  LoadingPageComponent as Load,
  SelectComponent as Select,
} from '../../components/common';
import { toHoverStyle } from '../../components/utils';
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
        email: '',
        doctype: '',
        docnum: '0',
        address: '',
        active: activeOptions[0],
      },
    },
  });
  const { id } = useParams<IParamTypes>();
  const { access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const history = useHistory()

  const backButtonStyles = {
    BACKGROUND_COLOR: 'bg-gradient-to-r from-blue-400 to-blue-500',
    BUTTON_LABEL: 'Regresar',
    TEXT_COLOR: 'white',
    ON_HOVER_STYLES: 'bg-gradient-to-r from-blue-500 to-blue-600',
  };

  useEffect(() => {
    id ? getSupplier() : setShow(true)
    // eslint-disable-next-line
  }, []);

  const getSupplier = async () => {
    const url: RequestInfo = `http://localhost:8000/suppliers/${id}`;
    const response = await fetch(url);
    const { name, phone, email, doctype, docnum, address, active }: ISupplier = await response.json();
    const activeOption = active ? activeOptions[0] : activeOptions[1];
    if (response.ok) {
      setValue('values', {
        name,
        phone,
        email,
        doctype,
        docnum,
        address,
        active: activeOption,
      });
      setSelActive(activeOption)
      setShow(true)
    } else {
      console.log('Error: Unknow error || Server error');
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
    const url: RequestInfo = `http://localhost:8000/suppliers/${id}`;
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        'active': data.active.value
      }),
    }
    const res = await fetch(url, requestInit);
    const dataRes = await res.json()
    if (res.ok) {
      console.log('Supplier Updated', dataRes)
      history.push('/supplier')
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const createSupplier = async (data: IFormSupplier) => {
    const url: RequestInfo = `http://localhost:8000/suppliers`;
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        'active': data.active.value
      }),
    }
    const res = await fetch(url, requestInit);
    const dataRes = await res.json()
    if (res.ok) {
      console.log('Supplier Created', dataRes)
      history.push('/supplier')
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  return show ? (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 px-4 py-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-xl font-bold">Proveedores</h6>
                <Link to="/supplier">
                  <Button
                    label={backButtonStyles.BUTTON_LABEL}
                    bgColor={backButtonStyles.BACKGROUND_COLOR}
                    textColor={backButtonStyles.TEXT_COLOR}
                    onHoverStyles={toHoverStyle(backButtonStyles.ON_HOVER_STYLES)}
                  />
                </Link>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-2 py-4 px-6"
              >
                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion del proveedor
                </h6>
                <div className="grid md:grid-cols-2 gap-4">
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

                <hr className="mt-6 border-b-1 border-gray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de Contacto
                </h6>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 px-4">
                    <Controller
                      control={control}
                      name="values.address"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="text"
                          label="Direccion"
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
                  <div className=" px-4">
                    <Controller
                      control={control}
                      name="values.email"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="email"
                          label="Correo"
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <Button
                  label={ id ? 'Actualizar Proveedor' : 'Crear Proveedor' }
                  bgColor={backButtonStyles.BACKGROUND_COLOR}
                  textColor={backButtonStyles.TEXT_COLOR}
                  onHoverStyles={toHoverStyle(backButtonStyles.ON_HOVER_STYLES)}
                  submit
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ): <Load/>
};

export default SupplierForm;
