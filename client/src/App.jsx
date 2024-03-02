import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Loading, ThemeToggler, Toast } from './components'
import { ACCESS_TOKEN } from './constants'
import { getCurrentUser } from './utils/api'
import {
  Home,
  LogIn,
  Missing,
  OAuth2RedirectHandler,
  Profile,
  Room,
  SignUp,
} from './views'

const App = () => {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.loading)
  const notification = useSelector((state) => state.notification)

  const loadCurrentUser = async () => {
    try {
      const response = await getCurrentUser()
      dispatch({ type: 'CURRENT_USER', payload: response.data })
      dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
      dispatch({ type: 'LOADING', payload: false })
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          status: 'danger',
          message: error.response ? error.response.data : error.message,
        },
      })

      if (error.response && error.response.status === 400) {
        localStorage.removeItem(ACCESS_TOKEN)
      }
    }
  }

  useEffect(() => {
    dispatch({ type: 'LOADING', payload: true })
    if (localStorage.getItem(ACCESS_TOKEN)) {
      console.log('App: Load current user')
      loadCurrentUser()
    } else {
      dispatch({ type: 'LOADING', payload: false })
    }
  }, [])

  return (
    <div>
      <div
        className={
          loading
            ? 'fixed z-50 flex justify-center items-center h-full w-full bg-mono-light/80'
            : 'hidden'
        }
      >
        <Loading size='2xl' />
        <Loading className='ml-4 animate-delay-150' size='2xl' />
        <Loading className='ml-4 animate-delay-300' size='2xl' />
      </div>

      {notification && (
        <Toast
          status={notification.status}
          className='fixed top-4 left-4 right-4 z-40 sm:w-fit sm:mx-auto'
        >
          {notification.message}
        </Toast>
      )}

      <ThemeToggler className='hidden' />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/login'
            element={<LogIn loadCurrentUser={loadCurrentUser} />}
          />
          <Route path='/me' element={<Profile />} />
          <Route path='/rooms/:roomId' element={<Room />} />
          <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler />} />
          <Route path='*' element={<Missing />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
