import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button, ButtonX, Input } from '../components'
import { ACCESS_TOKEN, GOOGLE_AUTH_URL } from '../constants'
import { logIn } from '../utils/api'

const LogIn = ({ loadCurrentUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [emailFeedback, setEmailFeedback] = useState('')
  const [password, setPassword] = useState('')
  const [passwordFeedback, setPasswordFeedback] = useState('')
  const [hidePwd, setHidePwd] = useState(true)

  const validate = (validEmail, validPassword) => {
    let flag = true

    if (validEmail) {
      if (email === '') {
        setEmailFeedback('Required')
        flag = false
      }
    }
    if (validPassword) {
      if (password === '') {
        setPasswordFeedback('Required')
        flag = false
      }
    }

    return flag
  }

  const handleLogIn = async () => {
    if (validate(1, 1)) {
      try {
        dispatch({ type: 'LOADING', payload: true })
        const response = await logIn({ email, password })
        localStorage.setItem(ACCESS_TOKEN, response.data)

        console.log('Login: Load current user')
        loadCurrentUser()
        navigate('/')
      } catch (error) {
        dispatch({ type: 'LOADING', payload: false })
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            status: 'danger',
            message: error.response ? error.response.data : error.message,
          },
        })
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      navigate('/')
    }
  }, [])

  return (
    <div className='flex items-center justify-center min-h-screen min-w-fit bg-secondary-light'>
      <div className='flex flex-col w-full sm:max-w-[640px] p-6 sm:p-8 m-4 rounded-xl shadow-xl bg-mono-light'>
        <div className='flex justify-center py-3'>
          <Link to='/' className='flex'>
            <img className='w-8' src='/logo.svg' alt='Topichat' />
            <span className='ml-2 text-2xl text-mono-dark font-medium'>
              Topichat
            </span>
          </Link>
        </div>

        <p className='mb-4 text-secondary-dark text-center'>
          Sign in to your account
        </p>

        <Input
          className='mb-4'
          label='Email'
          value={email}
          feedbackInvalid={emailFeedback}
          onChange={(e) => {
            setEmail(e.target.value)
            setEmailFeedback('')
          }}
        />

        <Input
          className='mb-6'
          label='Password'
          value={password}
          type={hidePwd ? 'password' : 'text'}
          feedbackInvalid={passwordFeedback}
          onChange={(e) => {
            setPassword(e.target.value)
            setPasswordFeedback('')
          }}
        >
          <ButtonX
            className={password === '' ? 'hidden' : 'ml-2 bg-transparent'}
            color='secondary'
            rounded
            onClick={() => setHidePwd(!hidePwd)}
          >
            <FontAwesomeIcon icon={hidePwd ? faEyeSlash : faEye} />
          </ButtonX>
        </Input>

        <Button size='lg' onClick={handleLogIn}>
          Log in
        </Button>

        <div className='flex justify-between min-w-max mt-6 text-sm'>
          <p className='text-mono-dark'>
            New to Topichat?
            <Link
              to='/signup'
              className='ml-1 text-primary-dark hover:underline'
            >
              Sign up
            </Link>
          </p>

          <Link to='/forgot' className='ml-4 text-primary-dark hover:underline'>
            Forgot password?
          </Link>
        </div>

        <div className="flex mt-4 mb-6 text-sm text-secondary-dark before:content-[''] before:h-3 before:mr-3 before:grow before:border-b before:border-secondary-dark after:content-[''] after:h-3 after:ml-3 after:grow after:border-b after:border-secondary-dark">
          Or
        </div>

        <Button tagA href={GOOGLE_AUTH_URL} color='secondary' inverse size='lg'>
          <p className='flex items-center justify-center'>
            <img
              src='https://cdn4.iconfinder.com/data/icons/social-media-and-logos-11/32/Logo_Google-512.png'
              className='mr-2 h-6'
              alt='Google'
            />
            <span>Log in with Google</span>
          </p>
        </Button>
      </div>
    </div>
  )
}

export default LogIn
