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
    <div className="flex-auto px-4 lg:px-10 py-5 mt-3 mb-6">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-fixed">
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
