import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { ACCESS_TOKEN } from '../constants'

const OAuth2RedirectHandler = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getUrlParam = (name) => {
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(location.search)

    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '))
  }

  useEffect(() => {
    const accessToken = getUrlParam('accessToken')
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN, accessToken)
      navigate('/')
    } else {
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          status: 'danger',
          message: getUrlParam('error'),
        },
      })
      navigate('/login')
    }
  }, [])

  return <div>OAuth2RedirectHandler</div>
}

export default OAuth2RedirectHandler
