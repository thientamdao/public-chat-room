import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  faEnvelope,
  faLock,
  faSignature,
} from '@fortawesome/free-solid-svg-icons'

import defaultAvatar from '../assets/img/avatar-default.png'
import defaultBg from '../assets/img/background-default.png'
import {
  Avatar,
  Badge,
  DeleteAccount,
  Editable,
  Header,
  Input,
} from '../components'
import { ACCESS_TOKEN, borderStyles } from '../constants'
import { updateEmail, updateName, updatePassword } from '../utils/api'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)

  const [name, setName] = useState('')
  const [nameFeedback, setNameFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [emailFeedback, setEmailFeedback] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordFeedback, setNewPasswordFeedback] = useState('')

  const validate = (type = 'name', value = '', setValueFeedback = () => {}) => {
    if (type === 'name') {
      if (value === '') {
        setValueFeedback('Required')
        return false
      }
    } else if (type === 'email') {
      if (value === '') {
        setValueFeedback('Required')
        return false
      } else {
        const emailFormat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
        if (!value.match(emailFormat)) {
          setValueFeedback('Email is not valid')
          return false
        }
      }
    } else if (type === 'password') {
      if (value === '') {
        setValueFeedback('Required')
        return false
      } else {
        if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$/.test(
            value,
          )
        ) {
          setValueFeedback(
            'Password must be at least 8 characters in length and combination of uppercase letters, lowercase letters, numbers, special characters',
          )
          return false
        }
      }
    }

    return true
  }

  const handleSubmit = async (
    info = '',
    callApiFunct = () => {},
    request = {},
  ) => {
    try {
      dispatch({ type: 'LOADING', payload: true })
      const response = await callApiFunct(request)
      dispatch({ type: 'LOADING', payload: false })
      dispatch({ type: 'CURRENT_USER', payload: response.data })
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          status: 'success',
          message: `Your ${info} has been changed`,
        },
      })
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

  useEffect(() => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      navigate('/')
    }
  }, [])

  return (
    <div className='min-h-screen min-w-fit pb-4 bg-mono-light'>
      <Header />

      <div className={`${borderStyles} bg-secondary-light`}>
        <div className='mx-auto w-full lg:w-[56rem] xl:w-[72rem] border border-t-0 border-slate-500 rounded-b-md overflow-hidden bg-primary-dark'>
          <img src={currentUser?.background || defaultBg} alt='Background' />
        </div>

        <div className='flex flex-col sm:flex-row mx-auto px-4 lg:px-8 w-full lg:w-[56rem] xl:w-[72rem] -translate-y-1/2'>
          <Avatar
            className='h-44 w-44 border-4 border-secondary-light shrink-0 mr-2 lg:mr-4 mb-2 sm:mb-0'
            src={currentUser?.avatarUrl || defaultAvatar}
          />

          <div className='flex flex-col justify-end font-medium'>
            <h1 className='text-mono-dark text-2xl sm:text-4xl'>
              {currentUser?.name}
            </h1>
            <p className='sm:my-2 text-secondary-dark text-sm'>
              Identification: {currentUser?.id}
            </p>
          </div>
        </div>
      </div>

      <div className='mx-auto mt-4 px-4 lg:px-8 w-full lg:w-[56rem] xl:w-[72rem]'>
        <div className='flex flex-col p-4 border border-slate-500 rounded-md'>
          <p className='text-mono-dark text-lg font-semibold mb-2'>
            User Information
          </p>

          <Editable
            className='mt-4'
            icon={faSignature}
            label='Name'
            value={currentUser?.name}
            onInvisible={() => {
              setName('')
              setNameFeedback('')
            }}
            onSubmit={() => {
              if (validate('name', name, setNameFeedback)) {
                handleSubmit('name', updateName, { name })
                return true
              }
              return false
            }}
          >
            <Input
              className='mb-2'
              label='New name'
              value={name}
              feedbackInvalid={nameFeedback}
              onChange={(e) => {
                setName(e.target.value)
                setNameFeedback('')
              }}
            />
          </Editable>

          <Editable
            className='mt-4'
            icon={faEnvelope}
            label={
              <p className='flex'>
                Email
                <Badge
                  className='ml-2'
                  color={currentUser?.verified ? 'success' : 'danger'}
                >
                  {currentUser?.verified ? 'Verified' : 'Not verified'}
                </Badge>
              </p>
            }
            value={currentUser?.email}
            onInvisible={() => {
              setEmail('')
              setEmailFeedback('')
            }}
            onSubmit={() => {
              if (validate('email', email, setEmailFeedback)) {
                handleSubmit('email', updateEmail, { email })
                return true
              }
              return false
            }}
          >
            <Input
              className='mb-2'
              label='New email'
              value={email}
              feedbackInvalid={emailFeedback}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailFeedback('')
              }}
            />
          </Editable>

          <Editable
            className='mt-4'
            icon={faLock}
            label='Password'
            value='********'
            onInvisible={() => {
              setOldPassword('')
              setNewPassword('')
              setNewPasswordFeedback('')
            }}
            onSubmit={() => {
              if (validate('password', newPassword, setNewPasswordFeedback)) {
                handleSubmit('password', updatePassword, {
                  oldPassword: oldPassword === '' ? 'salt' : oldPassword,
                  newPassword,
                })
                return true
              }
              return false
            }}
          >
            <Input
              className='mb-2'
              label={
                <p>
                  <span className='block'>Current password</span>
                  <span className='block text-xs text-success-dark font-semibold'>
                    (Not required if this is your first time setting password)
                  </span>
                </p>
              }
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value)
              }}
            />

            <Input
              className='mb-2'
              label='New password'
              value={newPassword}
              feedbackInvalid={newPasswordFeedback}
              onChange={(e) => {
                setNewPassword(e.target.value)
                setNewPasswordFeedback('')
              }}
            />
          </Editable>
        </div>

        <DeleteAccount />
      </div>
    </div>
  )
}

export default Profile
