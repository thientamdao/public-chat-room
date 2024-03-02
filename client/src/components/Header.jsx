import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { borderStyles } from '../constants'
import { Button, CreateRoom, Search, ThemeToggler, UserOptions } from './index'

const Header = () => {
  const navigate = useNavigate()

  const currentUser = useSelector((state) => state.currentUser)

  return (
    <div
      className={`flex flex-wrap items-center justify-between px-4 py-3 ${borderStyles} bg-mono-light`}
    >
      <Link to='/' className='flex'>
        <img className='w-7' src='/logo.svg' alt='Topichat' />
        <span className='ml-2 text-lg text-mono-dark font-medium'>
          Topichat
        </span>
      </Link>

      <div className='order-1 lg:order-none w-full lg:w-1/2 mt-2 lg:mt-0'>
        <Search />
      </div>

      <div className='flex'>
        <ThemeToggler className='mx-2' />

        <CreateRoom />

        {currentUser ? (
          <UserOptions />
        ) : (
          <Button
            rounded
            onClick={() => {
              navigate('/login')
            }}
          >
            Log in
          </Button>
        )}
      </div>
    </div>
  )
}

export default Header
