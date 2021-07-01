import React from 'react'

import TableHeadItem from './TableHeadItem'
import TableRow from './TableRow'

export interface TableField {
  text: string;
  width: number;
  name: string;
}

interface TableComponentProps {
  theadData: TableField[];
  tbodyData: any[];
}

const TableComponent: React.FC<TableComponentProps> = ({
  theadData,
  tbodyData,
}) => {
  return (
    <div className="flex-auto mx-6 my-3">
      <div className="bg-white shadow-md rounded">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {theadData.map( (field, index) => (
                <TableHeadItem
                  key={index}
                  {... field}
                />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {tbodyData.map((row) => (
              <TableRow
                key={row._id}
                data={row}
                fields={theadData}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableComponent
