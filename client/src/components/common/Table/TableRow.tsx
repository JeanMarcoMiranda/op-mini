import React from 'react'
import { TableField } from './Table'

interface TableRowProps {
  data: any,
  fields: TableField[]
  fieldsToHide: Array<string>,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const TableRow: React.FC<TableRowProps> = ({
  data,
  fields,
  fieldsToHide,
  onClick = (data:any) => {},
}) => {

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100" onClick={() => onClick(data)}>
      {fields.map(({name}, index) => (
        <td
          key={index}
          className={`px-1 py-3 ${fieldsToHide.includes(name) && "hidden"}`}
        >
          {data[name]}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
