import { Link } from "react-router-dom";
import { IconComponent as Icon } from "../common";
import {
  AnnotationIcon,
  PencilAltIcon,
  ArchiveIcon,
  BellIcon,
  BanIcon,
} from '@heroicons/react/outline';

const renderIconActions = (
  idCRUD: string,
  crudName: string,
  showAlert: (type: string, id?: string | undefined) => void,
  showAction: {
    edit?: boolean,
    delete?: boolean,
    order?: boolean,
    more?: boolean,
    cancel?: {show: boolean, action: (id:string) => void}} = {}
) => {
  let editAct = false
  let deleteAct = false
  let orderAct = false
  let moreAct = true
  let cancelAct = false
  let action = (id: string) => {}
  for (const property in showAction) {
    switch (property) {
      case "edit":
        editAct = showAction[property] ? true : false
        break;
      case "delete":
        deleteAct = showAction[property] ? true : false
        break;
      case "order":
        orderAct = showAction[property] ? true : false
        break;
      case "more":
        moreAct = showAction[property] ? true : false
        break;
      case "cancel":
        cancelAct = showAction[property]?.show ? true : false
        if (showAction.cancel) {
          action = showAction.cancel.action
        }
        break;
    }
  }
  return (
  <div className="flex item-center justify-center">
    {moreAct &&
      <Icon
        width={5}
        color="blue"
        Icon={AnnotationIcon}
        hover
        onClick={() => showAlert('notifi', idCRUD)}
        />
    }
    {editAct &&
      <Link to={`/${crudName}/form/${idCRUD}`}>
        <Icon
          width={5}
          color="blue"
          Icon={PencilAltIcon}
          hover
        />
      </Link>
    }
    {orderAct &&
      <Link to={`/order/create/${idCRUD}`}>
        <Icon
          width={5}
          color="blue"
          Icon={BellIcon}
          hover
        />
      </Link>
    }
    {deleteAct &&
      <Icon
        width={5}
        color="red"
        Icon={ArchiveIcon}
        hover
        onClick={() => showAlert('delete',idCRUD)}
      />
    }
    {cancelAct &&
      <Icon
        width={5}
        color="red"
        Icon={BanIcon}
        hover
        onClick={() => action(idCRUD)}
      />
    }
  </div> )
};

export default renderIconActions
