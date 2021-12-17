import { format } from 'path'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Route, Link, Switch, useRouteMatch, useParams, useLocation, NavLink } from 'react-router-dom'
import { CSVLink } from "react-csv";

import {
    TableComponent as Table
} from '../../components/common'
import { formatDate, formatDateHours } from '../../components/utils'
import { RootState } from '../../store/store'

const tableRoutes = [
    {
        title: 'Productos',
        reportTo: 'products'
    },
    {
        title: 'Ventas',
        reportTo: 'sales'
    },
    {
        title: 'Pedidos',
        reportTo: 'orders'
    }
]
// -- Variable to store the head data for every table
const tableHeadData = {
    'products': [
        { text: 'Codigo de Barras', width: 2, name: 'barcode' },
        { text: 'Nombre', width: 2, name: 'name' },
        { text: 'Categoria', width: 1, name: 'category' },
        { text: 'Empresa', width: 1, name: 'company' },
        { text: 'Stock', width: 1, name: 'stock' },
        { text: 'Precio Compra', width: 1, name: 'pricebuy' },
        { text: 'Precio Venta', width: 1, name: 'pricesell' },
        { text: 'Unidad Medida', width: 1, name: 'mesureUnit' },
    ],
    'sales': [
        { text: 'Creado por', width: 2, name: 'createdby' },
        { text: 'Cliente', width: 2, name: 'client' },
        { text: 'Fecha', width: 1, name: 'date' },
        { text: 'Total', width: 1, name: 'subtotal' },
        { text: 'Metodo de pago', width: 2, name: 'methodpay' },
        { text: 'Boleta', width: 1, name: 'voucher' },
        { text: 'Estado', width: 2, name: 'status' },
    ],
    'orders': [
        { text: 'Creado por', width: 2, name: 'createdby' },
        { text: 'Fecha de creacion', width: 2, name: 'createdate' },
        { text: 'Recibido por', width: 1, name: 'receivedby' },
        { text: 'Fecha de recepcion', width: 2, name: 'receptiondate' },
        { text: 'Monto Final', width: 1, name: 'finalamount' },
        { text: 'Proveedor', width: 1, name: 'supplier' },
        { text: 'Estado', width: 2, name: 'status' },
    ]
}

const tableHeadExcel = {
  'products': [
      { label: 'Codigo de Barras', key: 'barcode' },
      { label: 'Nombre', key: 'name' },
      { label: 'Categoria', key: 'category' },
      { label: 'Empresa', key: 'company' },
      { label: 'Stock', key: 'stock' },
      { label: 'Precio Compra', key: 'pricebuy' },
      { label: 'Precio Venta', key: 'pricesell' },
      { label: 'Unidad Medida', key: 'mesureUnit' },
  ],
  'sales': [
      { label: 'Creado por', key: 'createdby' },
      { label: 'Cliente', key: 'client' },
      { label: 'Fecha', key: 'date' },
      { label: 'Total', key: 'subtotal' },
      { label: 'Metodo de pago', key: 'methodpay' },
      { label: 'Boleta', key: 'voucher' },
      { label: 'Estado', key: 'status' },
  ],
  'orders': [
      { label: 'Creado por', key: 'createdby' },
      { label: 'Fecha de creacion', key: 'createdate' },
      { label: 'Recibido por', key: 'receivedby' },
      { label: 'Fecha de recepcion', key: 'receptiondate' },
      { label: 'Monto Final', key: 'finalamount' },
      { label: 'Proveedor', key: 'supplier' },
      { label: 'Estado', key: 'status' },
  ]
}


// To access the params from the URL used by react router we also need to specify the types of thes params
interface reportTableParams {
    reportOf: string
}

const ReportView: React.FC = () => {
    // Hook for getting the current path
    const { url, path } = useRouteMatch()

    return (
        <div className='container mx-auto'>
            <div className='w-full lg:w-10/12 mx-auto my-8'>
                <div className='relative flex flex-col min-w-0 break-word w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
                    <div className='rounded-lg bg-white mb-0 px-6 py-3'>
                        <div className='grid grid-cols-3 divide-x-2 '>
                            {
                                tableRoutes.map(route => (
                                    <NavLink to={`${url}/${route.reportTo}`} activeStyle={{ color: 'rgb(34 197 94)' }}>
                                        <h6 className={`mr-2 `}>{route.title}</h6>
                                    </NavLink>
                                ))
                            }
                        </div>
                    </div>

                    <Switch>
                        <Route exact path={path}>
                            <h3>Buena buena</h3>
                        </Route>
                        {
                            tableRoutes.map(route => (
                                <Route path={`${path}/:reportOf`}>
                                    <ComponentePrueba />
                                </Route>
                            ))
                        }
                    </Switch>
                </div>
            </div>
        </div>
    )
}

const ComponentePrueba: React.FC = () => {
    // -- Setting the state variables to store the table data
    const [rawTableData, setRawTableData] = useState<TableTypes[]>([])
    const [configuredTableData, setConfiguredTableData] = useState<TableDataTypes[]>([])

    // -- Hook for get the URL params
    const { reportOf } = useParams<reportTableParams>()

    // -- Getting the user token and its data from the global values if they are stored
    const { access_token } = useSelector<RootState, RootState['user']>(
        (state) => state.user,
    )

    // -- Http request for getting the data to fill the table
    useEffect(() => {
        async function getTableData() {
            const URL: RequestInfo = `http://localhost:8000/${reportOf}`
            const REQUEST_PARAMS: RequestInit = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-TuseEffectype': 'application/json'
                }
            }

            const response = await fetch(URL, REQUEST_PARAMS)

            if(response.ok) {
                const data = await response.json()
                setRawTableData(data)

            } else {
                console.log(`Error: Unknown error || Server error | Reports`)
            }
        }
        console.log("buenas")
        getTableData()
    }, [reportOf])

    // -- TYPE GUARDS - THIS IS USED FOR "TYPE NARROWING"
    function isProductTable(productData: TableTypes[]): productData is IProduct[] {
        return true
    }
    function isSaleTable(saleData: TableTypes[]): saleData is ISale[] {
        return true
    }
    function isOrderTable(orderData: TableTypes[]): orderData is IOrder[] {
        return true
    }


    // -- Functions to order the data, according to current tabla selected
    function processProductData(productsArray: IProduct[]) {
        const productTableData: IProductTableData[] = productsArray.map(
            ({
                _id,
                barcode,
                name,
                category,
                stock,
                pricebuy,
                pricesell,
                mesureUnit = '',
                company
            }: IProduct) => {
                const newProductTableData: IProductTableData = {
                    _id,
                    barcode,
                    name,
                    category: category.name,
                    stock,
                    pricebuy,
                    pricesell,
                    mesureUnit,
                    company: company.company
                }
                return newProductTableData
            }
        )

        setConfiguredTableData(productTableData)
    }
    function processSaleData(salesArray: ISale[]) {
        const saleTableData: ISaleTableData[] = salesArray.map(
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
                status
            }: ISale) => {
                const newSaleTableData: ISaleTableData = {
                    _id,
                    createdby: createdby.name,
                    client,
                    date: formatDate(new Date(date)),
                    cash: 'S/ ' + cash,
                    change: 'S/ ' + change,
                    subtotal: 'S/ ' + subtotal,
                    methodpay,
                    voucher,
                }

                return newSaleTableData
            }
        )

        setConfiguredTableData(saleTableData)
    }
    function processOrderData(orderArray: IOrder[]) {

        console.log("esta es la tabla de pedidos", orderArray)
        const orderTableData: IOrderTableData[] = orderArray.map(
            ({
                _id,
                createdby,
                createdate,
                receivedby,
                receptiondate,
                finalamount,
                supplier,
                status
            }: IOrder) => {
                const newOrderTableData: IOrderTableData = {
                    _id,
                    createdby: createdby.name,
                    createdate: formatDate(new Date(createdate)),
                    receivedby: receivedby.name,
                    receptiondate: formatDate(new Date(receptiondate)),
                    finalamount: 'S/ ' + finalamount,
                    supplier: supplier.name,
                    status
                }

                return newOrderTableData
            }
        )

        setConfiguredTableData(orderTableData)
    }



    // -- Preparing the data we got to be shown in the table
    useEffect(() => {
        if (rawTableData.length === 0) return;

        const TABLES = Object.keys(tableHeadData)

        function processData(tableDataObject: TableTypes[]) {
            if(reportOf === TABLES[0] && isProductTable(tableDataObject)){
                processProductData(tableDataObject)

            } else if(reportOf === TABLES[1] && isSaleTable(tableDataObject)) {
                processSaleData(tableDataObject)

            } else if (reportOf === TABLES[2] && isOrderTable(tableDataObject)){
                processOrderData(tableDataObject)
            }
        }

        processData(rawTableData)
    }, [rawTableData])


    return (<>
      <CSVLink
        data={configuredTableData}
        headers={tableHeadExcel[reportOf as 'products' | 'sales' | 'orders']}
        filename={`${formatDateHours(new Date())}.csv`}
        className='transition
        duration-500
        bg-gradient-to-r from-green-400 to-green-500
        text-white
        py-2 px-4
        focus:outline-none
        rounded-lg'
        separator={";"}
      >
        Exportar Archivo CSV
      </CSVLink>
      <div className='mb-3'>
              <Table theadData={tableHeadData[reportOf as 'products' | 'sales' | 'orders']} tbodyData={configuredTableData} pagination={{ enabled: true, fieldsPerPage: 15 }}/>
      </div>
    </>)
}

export default ReportView
