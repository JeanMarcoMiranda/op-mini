import * as actionTypes from './actionTypes'

export const setUserData = (user: IUserData): UserActionTypes => ({
  type: actionTypes.SET_USER_DATA,
  user
})

export const setToken = (access_token: string): UserActionTypes => ({
  type: actionTypes.SET_TOKEN,
  access_token
})

export const setAuthUser = (is_auth: boolean): UserActionTypes => ({
  type: actionTypes.SET_AUTH_USER,
  is_auth
})
