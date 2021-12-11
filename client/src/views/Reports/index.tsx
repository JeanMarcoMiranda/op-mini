import React from 'react'
import { Route, Link, Switch, useRouteMatch, useParams, useLocation, NavLink } from 'react-router-dom'

const tableRoutes = [
    {
        title: 'Productos',
        reportTo: 'products'
    },
    {
        title: 'Proveedores',
        reportTo: 'suppliers'
    },
    {
        title: 'Ventas',
        reportTo: 'sales'
    },
    {
        title: 'Turnos',
        reportTo: 'shifts'
    },
    {
        title: 'Pedidos',
        reportTo: 'orders'
    }
]

// To access the params from the URL used by react router we also need to specify the types of thes params
interface reportTableParams {
    reportOf: string
}



const ReportView: React.FC = () => { 

    // Hook for getting the current path
    const { url, path } = useRouteMatch()

    return(
        <div className='container mx-auto'>
            <div className='w-full lg:w-10/12 mx-auto my-8'>
                <div className='relative flex flex-col min-w-0 break-word w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0'>
                    <div className='rounded-lg bg-white mb-0 px-6 py-3'>
                        <div className='grid grid-cols-5 divide-x-2 '>
                            {
                                tableRoutes.map(route => (
                                        <NavLink to={`${url}/${route.reportTo}`} activeStyle={{color:'rgb(34 197 94)'}}>
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
                                    <ComponentePrueba/>
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
    const {reportOf} = useParams<reportTableParams>()

    return (<>
        <h1>{reportOf}</h1> 
    </>)
}

export default ReportView