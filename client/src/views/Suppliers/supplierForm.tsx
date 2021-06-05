import React, { useState, useEffect } from 'react';
import {
  InputComponent,
  SelectComponent,
  ButtonComponent,
} from '../../components/common';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const options: IFormOptions[] = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];

const SupplierView: React.FC = () => {
  const { id } = useParams<IParamTypes>();
  const backButtonStyles = {
    BACKGROUND_COLOR: 'bg-gradient-to-r from-blue-400 to-blue-500',
    IS_TRANSPARENT: false,
    BUTTON_LABEL: 'Regresar',
    TEXT_COLOR: 'text-white',
    ON_HOVER_STYLES: 'bg-gradient-to-r from-blue-500 to-blue-600',
  };

  function toHoverStyle(stylesOnHover: string): string {
    const stylesSplited = stylesOnHover.split(' ');
    let hoverStyles = '';

    stylesSplited.forEach((style, index) => {
      let newStyle = `hover:${style}`;
      if (index !== stylesSplited.length - 1) {
        newStyle = newStyle + ' ';
      }
      hoverStyles = hoverStyles + newStyle;
    });

    return hoverStyles;
  }

  const [show, setShow] = useState(false);
  const [selActive, setSelActive] = useState<IFormOptions>(options[0]);
  const { control, handleSubmit, setValue } = useForm<
    TFormValues<IFormSupplier>
  >({
    defaultValues: {
      values: {
        name: '',
        phone: 0,
        email: '',
        doctype: '',
        docnum: 0,
        address: '',
        active: options[0],
      },
    },
  });

  async function supplierGet() {
    const URL: RequestInfo = `http://localhost:5000/suppliers/${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    let active = data.active ? options[0] : options[1];
    if (response.ok) {
      setValue('values', {
        name: data.name,
        phone: data.phone,
        email: data.email,
        doctype: data.doctype,
        docnum: data.docnum,
        address: data.address,
        active: active,
      });
      setSelActive(active)
      setShow(true)
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const onSubmit: SubmitHandler<IFormSupplier> = (data) => console.log(data);

  useEffect(() => {
    id ? supplierGet() : setShow(true)
  }, []);

  return show ? (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 px-4 py-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-xl font-bold">Proveedores</h6>
                <ButtonComponent
                  label={backButtonStyles.BUTTON_LABEL}
                  bgColor={backButtonStyles.BACKGROUND_COLOR}
                  bgTransparent={backButtonStyles.IS_TRANSPARENT}
                  textColor={backButtonStyles.TEXT_COLOR}
                  onHoverStyles={toHoverStyle(backButtonStyles.ON_HOVER_STYLES)}
                />
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
                      render={({ field: { onChange, value } }) => (
                        <InputComponent
                          type="text"
                          label="Nombre"
                          name="name"
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
                      render={({ field: { onChange, value } }) => (
                        <InputComponent
                          type="text"
                          label="Tipo de documento"
                          name="doctype"
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
                      render={({ field: { onChange, value } }) => (
                        <InputComponent
                          type="number"
                          label="Numero de documento"
                          name="docnum"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.active"
                      render={({ field: { onChange, name } }) => (
                        <SelectComponent
                          label="Estado"
                          name={name}
                          value={selActive}
                          options={options}
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
                      render={({ field: { onChange, value } }) => (
                        <InputComponent
                          type="text"
                          label="Direccion"
                          name="address"
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
                      render={({ field: { onChange, value } }) => (
                        <InputComponent
                          type="number"
                          label="Telefono"
                          name="phone"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className=" px-4">
                    <Controller
                      control={control}
                      name="values.email"
                      render={({ field: { onChange, value } }) => (
                        <InputComponent
                          type="email"
                          label="Correo"
                          name="email"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                </div>
                <button type="submit">Pensalidad de tigre</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ): <></>;

};

export default SupplierView;
