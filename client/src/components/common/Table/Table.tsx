import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import TableHeadItem from './TableHeadItem'
import TableRow from './TableRow'
import { RootState } from '../../../store/store'


export interface TableField {
  text: string;
  width: number;
  name: string;
}

interface TableComponentProps {
  theadData: TableField[];
  tbodyData: any[];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface IRolesForField {
  [key: string]: {
    roles: Array<String>,
    routes: Array<String>
  }
}

const TableComponent: React.FC<TableComponentProps> = ({
  theadData,
  tbodyData,
  onClick = (data:any) => {},
}) => {

  const {pathname: currentPath} = useLocation()

  // == GLOBAL STATE
  const { userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const userRole = userData.role;

  // == BASED ON ROL ADMINISTRATION VARIABLES
  const ACCESS_ADMINISTRATION_FOR_FIELD: IRolesForField = {
    actions: {
      roles: ["Administrador", "Almacenero"],
      routes: ["/user"]
    }
  }
  const ROLE_KEYS = Object.keys(ACCESS_ADMINISTRATION_FOR_FIELD)
  const FIELD_NAMES = theadData.map(field => field.name)

  // == LOGIC FOR GETTING THE FIELDS TO HIDE
  const FIELDS_TO_HIDE = FIELD_NAMES.filter(field => {
    if(ROLE_KEYS.includes(field)){
      const CURRENT_PROPERTY_ACCESS = ACCESS_ADMINISTRATION_FOR_FIELD[field]
      const ACCESS_PROPERTY_ROUTES = CURRENT_PROPERTY_ACCESS.routes
      const ACCESS_PROPERTY_ROLES = CURRENT_PROPERTY_ACCESS.roles
      if(ACCESS_PROPERTY_ROUTES.includes(currentPath))
        return ACCESS_PROPERTY_ROLES.includes(userRole.name) ? false : true
      return false
    }
    return false
  })

  return (
    <div className="flex-auto mx-6 my-3">
      <div className="bg-white shadow-md rounded">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {theadData.map( (field, index) => (
                <TableHeadItem
                  key={index}
                  field={field}
                  fieldsToHide={FIELDS_TO_HIDE}
                />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {tbodyData.map((row) => (
              <TableRow
                onClick={onClick}
                key={row._id}
                data={row}
                fields={theadData}
                fieldsToHide={FIELDS_TO_HIDE}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableComponent
