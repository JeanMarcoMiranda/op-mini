import * as actionTypes from './actionTypes'

export const setUserData = (userData: UserState): UserAction => ({
  type: actionTypes.SET_USER_DATA,
  userData
})

