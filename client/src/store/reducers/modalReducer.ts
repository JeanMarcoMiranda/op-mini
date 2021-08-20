import * as actionTypes from '../action/actionTypes';

const initialModalState: IModalProps = {
  isOpen: false,
  setisOpen: (prev => !prev),
  title: '',
  img: '',
  contentText: '',
  contentObj: [],
  cancelButton: false,
  defaultButton: '',
  colorDB: '',
  onClickDB: '',
  typeButton: '',
  colorTYB: '',
  onClickTYB: ''
};

const initialState: AlertState = {
  modalData: initialModalState,
};

export const modalReducer = (
  state: AlertState = initialState,
  action: AlertActionTypes,
): AlertState => {
  switch (action.type) {
    case actionTypes.SET_MODAL: {
      return { ...state, modalData: action.modal };
    }
    default:
      return state;
  }
};
