import * as actionTypes from './actionTypes'

export const setUserData = (user: IUserData): UserActionTypes => ({
  type: actionTypes.SET_USER_DATA,
  user
})

export const setLogedin = (access_token: string): UserActionTypes => ({
  type: actionTypes.SET_LOGGED_IN,
  access_token
})

