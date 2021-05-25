import React, { useEffect, useState } from 'react';
import { InputSimple } from '../../components/common';

const url = 'http://localhost:5000/suppliers/';

const Supplier = () => {
  const [name, setName] = useState("buenas2");

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then(data =>  console.log(data))
  },[]);

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-8/12 px-4 py-4 mx-auto">
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
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <InputSimple label={"nombre"} value={name} onChange={setName} />
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
                        Tipo de Documento
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        defaultValue="Mis huevos morenos"

                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
                        Numero de Documento
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        defaultValue="Mis huevos morenos"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
                        Estado
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        defaultValue="Mis huevos morenos"
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-gray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de Contacto
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
                        Direccion
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        defaultValue="Mi casa"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
                        Telefono
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        defaultValue="#buenas"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="text-left block uppercase text-gray-600 text-xs font-bold mb-2">
                        Correo
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        defaultValue="buenas@gmail.com"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Supplier;
