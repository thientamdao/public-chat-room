import { createStore } from 'redux'
import { ACCESS_TOKEN } from '../constants'

const initialState = {
  currentUser: null,
  loading: false,
  notification: null,
  room: null,
  cards: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_USER': {
      return { ...state, currentUser: action.payload }
    }

    case 'LOADING': {
      return { ...state, loading: action.payload }
    }

    case 'NOTIFICATION': {
      return { ...state, notification: action.payload }
    }

    case 'ROOM': {
      return { ...state, room: action.payload }
    }

    case 'CARDS': {
      return { ...state, cards: action.payload }
    }

    case 'LOG_OUT': {
      localStorage.removeItem(ACCESS_TOKEN)
      return initialState
    }

    default:
      return state
  }
}

export default createStore(reducer)
