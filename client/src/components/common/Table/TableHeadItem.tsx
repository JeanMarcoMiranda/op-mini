import React from 'react';

import { TableField } from './Table';

interface TableHeadProps {
  field: TableField;
  fieldsToHide: Array<String>;
}

const TableHeadItem = ({
  field: { text, width, name },
  fieldsToHide,
}: TableHeadProps) => {
  return (
    <th
      className={`py-3 px-1 w-${width}/12 ${fieldsToHide.includes(name) && 'hidden'}`}
    >
      {text}
    </th>
  );
};

export default TableHeadItem;
