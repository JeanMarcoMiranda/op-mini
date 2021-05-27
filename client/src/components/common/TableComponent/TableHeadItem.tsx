import React from 'react'

import { TableField } from './TableComponent';


const TableHeadItem: React.FC<TableField> = ({
  text,
  width,
}) => {
  return (
    <th
      className={`py-3 px-1 w-${width}/12`}
    >
      {text}
    </th>
  )
}

export default TableHeadItem
