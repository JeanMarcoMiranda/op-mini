import React, { useEffect, useState } from 'react';
import { InputComponent, SelectComponent } from '../../components/common';

const url = 'http://localhost:5000/suppliers/';

const options = [
  { id: 1, label: 'Activo'},
  { id: 2, label: 'Inactivo'}
];

const Supplier = () => {
  const [data, setData] = useState({
    _id: '',
    name: '',
    phone: 0,
    email: '',
    doctype: '',
    docnum: 0,
    address: '',
    active: false,
  });

  const [selectedStatus, setSelectedStatus] = useState(options[data.active?0:1])


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.currentTarget.value,
    });
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const supplierData = data[0];
        setData({
          _id: supplierData._id,
          name: supplierData.name,
          phone: supplierData.phone,
          email: supplierData.email,
          doctype: supplierData.doctype,
          docnum: supplierData.docnum,
          address: supplierData.address,
          active: supplierData.active,
        });
        console.log(data);
      }).catch((err) => {
        console.log("Error con el servidor " + err)
      });
  }, []);

  return (
    <>
      <div className="container mx-auto">
       {/*  <div className="grid grid-cols-1 gap-4 px-4 py-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-xl font-bold">Proveedores</h6>
                <button
                  className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none"
                  type="button"
                >
                  Regresar
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion del proveedor
                </h6>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="px-4">
                    <InputComponent
                      type="text"
                      label="Nombre"
                      name="name"
                      value={data.name}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="px-4">
                    <InputComponent
                      type="text"
                      label="Tipo de documento"
                      name="doctype"
                      value={data.doctype}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="px-4">
                    <InputComponent
                      type="number"
                      label="Numero de documento"
                      name="docnum"
                      value={data.docnum}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="px-4">
                    <SelectComponent
                      label="Estado"
                      val={data.active}
                      options={options}
                      valDef={selectedStatus}
                      onChange={setSelectedStatus}
                    />
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-gray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de Contacto
                </h6>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 px-4">
                    <InputComponent
                      type="text"
                      label="Direccion"
                      name="address"
                      value={data.address}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className=" px-4">
                    <InputComponent
                      type="number"
                      label="Telefono"
                      name="phone"
                      value={data.phone}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className=" px-4">
                    <InputComponent
                      type="email"
                      label="Correo"
                      name="email"
                      value={data.email}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Supplier;
