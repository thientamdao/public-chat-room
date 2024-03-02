import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import defaultAvatar from '../assets/img/avatar-default.png'
import { Avatar, ButtonX, CardList } from './index'

const UserOptions = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)
  const [visible, setVisible] = useState(false)

  const handleLogOut = () => {
    dispatch({ type: 'LOG_OUT' })
    navigate('/')
    dispatch({
      type: 'NOTIFICATION',
      payload: {
        status: 'success',
        message: 'Log out successfully',
      },
    })
  }

  const styles = 'flex items-center w-full p-2 cursor-pointer text-mono-dark'

  const cards = [
    <a
      className={styles}
      onMouseDown={() => {
        navigate('/me')
      }}
    >
      <Avatar
        className='mr-2'
        size='lg'
        src={currentUser?.avatarUrl || defaultAvatar}
      />
      {currentUser?.name}
    </a>,
    <a className={styles} onMouseDown={handleLogOut}>
      <ButtonX className='mr-2' tagDiv color='secondary' size='lg' rounded>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </ButtonX>
      Log out
    </a>,
  ]

  return (
    <div className='relative leading-none'>
      <ButtonX
        size='2xl'
        rounded
        onClick={() => {
          setVisible(!visible)
        }}
        onBlur={() => {
          setVisible(false)
        }}
      >
        <img
          className='w-full h-full'
          src={currentUser?.avatarUrl || defaultAvatar}
          alt='Avatar'
        />
      </ButtonX>

      <div
        className={
          visible
            ? 'absolute top-full right-0 z-20 flex flex-col w-max mt-5 mr-3 rounded-sm border-t border-slate-500 shadow-secondary-dark shadow-[0_0_0_12px]'
            : 'hidden'
        }
      >
        <CardList cards={cards} />
      </div>
    </div>
  )
}

export default UserOptions
