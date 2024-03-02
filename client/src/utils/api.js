import axios from 'axios'
import { ACCESS_TOKEN, API_BASE_URL } from '../constants'

const instance = (auth = false) => {
  return auth
    ? axios.create({
        baseURL: API_BASE_URL,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
    : axios.create({
        baseURL: API_BASE_URL,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
}

export const signUp = (signUpRequest) => {
  return instance().post('/auth/signup', signUpRequest)
}

export const logIn = (logInRequest) => {
  return instance().post('/auth/login', logInRequest)
}

export const getCurrentUser = () => {
  return instance(true).get('/user')
}

export const updateName = (updateNameRequest) => {
  return instance(true).patch('/user/name', updateNameRequest)
}

export const updateEmail = (updateEmailRequest) => {
  return instance(true).patch('/user/email', updateEmailRequest)
}

export const updatePassword = (updatePasswordRequest) => {
  return instance(true).patch('/user/password', updatePasswordRequest)
}

export const deleteUser = () => {
  return instance(true).delete('/user')
}

export const searchRooms = (keywords = '') => {
  return instance().get(`/rooms?k=${keywords}`)
}

export const createRoom = (createRoomRequest) => {
  return instance(true).post('/room', createRoomRequest)
}

export const joinRoom = (roomId) => {
  return instance(true).put(`/room/join?roomId=${roomId}`)
}

export const leaveRoom = (roomId) => {
  return instance(true).put(`/room/leave?roomId=${roomId}`)
}
