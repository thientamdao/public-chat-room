import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteUser } from '../utils/api'
import { Button } from './index'

const DeleteAccount = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [visible, setVisible] = useState(false)

  const handleDeleteUser = async () => {
    try {
      dispatch({ type: 'LOADING', payload: true })
      await deleteUser()
      dispatch({ type: 'LOADING', payload: false })

      dispatch({ type: 'LOG_OUT' })
      navigate('/')
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          status: 'success',
          message: 'Delete account successfully',
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

  return (
    <>
      <Button
        className='mt-4'
        color='danger'
        inverse
        onClick={() => {
          setVisible(true)
        }}
      >
        Delete Account
      </Button>

      <div
        className={
          visible
            ? 'fixed inset-0 z-50 flex items-center justify-center py-16 bg-secondary-light/80 transition-opacity'
            : 'hidden'
        }
      >
        <form className='relative flex flex-col w-full max-h-full sm:max-w-[640px] sm:mx-4 overflow-auto rounded-sm sm:rounded-xl shadow-xl bg-mono-light'>
          <div className='p-4 border-b border-secondary-dark rounded-t'>
            <h3 className='text-xl text-mono-dark font-semibold'>
              Delete Account
            </h3>
          </div>

          <div className='flex flex-col p-4 border-b border-secondary-dark bg-mono-light'>
            <h4>
              Your account will be permanently deleted. Are you sure about that?
            </h4>
          </div>

          <div className='flex items-center p-4'>
            <Button color='danger' onClick={handleDeleteUser}>
              Delete
            </Button>

            <Button
              className='ml-2'
              color='secondary'
              inverse
              onClick={() => {
                setVisible(false)
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default DeleteAccount
