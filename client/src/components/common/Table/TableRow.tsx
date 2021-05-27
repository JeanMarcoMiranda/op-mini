import React from 'react'
import { TableField } from './Table'

interface TableRowProps {
  data: any,
  fields: TableField[]
}

const TableRow: React.FC<TableRowProps> = ({
  data,
  fields
}) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {fields.map(({name}, index) => (
        <td
          key={data._id + index + ''}
          className="py-3 px-1"
        >
          {data[name]}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
