import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useDispatch } from 'react-redux'
import { Button, ButtonX, Input } from '../components'
import { GOOGLE_AUTH_URL } from '../constants'
import { signUp } from '../utils/api'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [nameFeedback, setNameFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [emailFeedback, setEmailFeedback] = useState('')
  const [password, setPassword] = useState('')
  const [passwordFeedback, setPasswordFeedback] = useState('')
  const [hidePwd, setHidePwd] = useState(true)

  const validate = (validName, validEmail, validPassword) => {
    let flag = true

    if (validName) {
      if (name === '') {
        setNameFeedback('Required')
        flag = false
      }
    }
    if (validEmail) {
      if (email === '') {
        setEmailFeedback('Required')
        flag = false
      } else {
        const emailFormat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
        if (!email.match(emailFormat)) {
          setEmailFeedback('Email is not valid')
          flag = false
        }
      }
    }
    if (validPassword) {
      if (password === '') {
        setPasswordFeedback('Required')
        flag = false
      } else {
        if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$/.test(
            password,
          )
        ) {
          setPasswordFeedback(
            'Password must be at least 8 characters in length and combination of uppercase letters, lowercase letters, numbers, special characters',
          )
          flag = false
        }
      }
    }

    return flag
  }

  const handleSignUp = async () => {
    if (validate(1, 1, 1)) {
      try {
        dispatch({ type: 'LOADING', payload: true })
        await signUp({ name, email, password })
        dispatch({ type: 'LOADING', payload: false })
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            status: 'success',
            message: "Sign up successfully, let's log in",
          },
        })
        navigate('/login')
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
          Create your new account
        </p>

        <Input
          className='mb-4'
          label='Full name'
          value={name}
          feedbackInvalid={nameFeedback}
          onChange={(e) => {
            setName(e.target.value)
            setNameFeedback('')
          }}
          onBlur={() => {
            validate(1, 0, 0)
          }}
        />

        <Input
          className='mb-4'
          label='Email'
          value={email}
          feedbackInvalid={emailFeedback}
          onChange={(e) => {
            setEmail(e.target.value)
            setEmailFeedback('')
          }}
          onBlur={() => {
            validate(0, 1, 0)
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
          onBlur={() => {
            validate(0, 0, 1)
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

        <Button size='lg' onClick={handleSignUp}>
          Sign up
        </Button>

        <p className='mt-6 text-sm text-mono-dark text-center'>
          Already have an account?
          <Link to='/login' className='ml-1 text-primary-dark hover:underline'>
            Log in
          </Link>
        </p>

        <div className="flex mt-4 mb-6 text-sm text-secondary-dark before:content-[''] before:h-3 before:mr-3 before:grow before:border-b before:border-secondary-dark after:content-[''] after:h-3 after:ml-3 after:grow after:border-b after:border-secondary-dark">
          Or
        </div>

        <Button
          className='min-w-max'
          tagA
          href={GOOGLE_AUTH_URL}
          color='secondary'
          inverse
          size='lg'
        >
          <p className='flex items-center justify-center'>
            <img
              src='https://cdn4.iconfinder.com/data/icons/social-media-and-logos-11/32/Logo_Google-512.png'
              className='mr-2 h-6'
              alt='Google'
            />
            <span>Sign up with Google</span>
          </p>
        </Button>
      </div>
    </div>
  )
}

export default SignUp
