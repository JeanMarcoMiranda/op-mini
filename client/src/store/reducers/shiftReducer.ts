import * as actionTypes from '../action/actionTypes';

const initialShiftState: IShiftProps = {
  //inShift: false,
  inShift: JSON.parse(localStorage.getItem('shift') as string) ? true : false,
};

const initialState: ShiftState = {
  shiftData: initialShiftState
};

export const shiftReducer = (
  state: ShiftState = initialState,
  action: ShiftActionTypes,
): ShiftState => {
  switch (action.type) {
    case actionTypes.SET_SHIFT: {
      return { ...state, shiftData: action.shift };
    }
    default:
      return state;
  }
};
