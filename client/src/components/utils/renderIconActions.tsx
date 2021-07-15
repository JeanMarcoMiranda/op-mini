import { Link } from "react-router-dom";
import { IconComponent as Icon } from "../common";
import {
  AnnotationIcon,
  PencilAltIcon,
  ArchiveIcon,
} from '@heroicons/react/outline';

const renderIconActions = (idCRUD: string, crudName: string, showAlert: (type: string, id?: string | undefined) => void) => (
  <div className="flex item-center justify-center">
    <Icon
      width={5}
      color="blue"
      Icon={AnnotationIcon}
      hover
      onClick={() => showAlert('notifi', idCRUD)}
    />
    <Link to={`/${crudName}/form/${idCRUD}`}>
      <Icon
        width={5}
        color="yellow"
        Icon={PencilAltIcon}
        hover
      />
    </Link>
    <Icon
      width={5}
      color="red"
      Icon={ArchiveIcon}
      hover
      onClick={() => showAlert('delete',idCRUD)}
    />
  </div>
);

export default renderIconActions
