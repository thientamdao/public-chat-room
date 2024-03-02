import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { statusDetails } from '../constants'
import { ButtonX } from './index'

const Toast = ({ className = '', children = '', status = 'info' }) => {
  const dispatch = useDispatch()

  const { color, icon } = statusDetails[status]
  const [visible, setVisible] = useState(true)
  const [styles, setStyles] = useState(
    `flex flex-col rounded-sm shadow-lg overflow-hidden bg-${color}-dark text-mono-light animate-moveInTop`,
  )

  useEffect(() => {
    if (!visible) {
      setStyles(styles + ' transition-opacity duration-300 ease-out opacity-0')
      setTimeout(() => {
        setStyles('hidden')
        dispatch({ type: 'NOTIFICATION', payload: null })
      }, 300)
    }
  }, [visible])

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 5000)
  }, [])

  return (
    <div className={twMerge(styles, className)} role='alert'>
      <div className='flex items-center justify-between px-4 py-3'>
        <div className='flex items-center'>
          <FontAwesomeIcon icon={icon} />
          <span className='ml-3 font-medium'>{children}</span>
        </div>

        <ButtonX
          className='shrink-0 ml-2 -mr-1 -my-1'
          color={color}
          inverse
          size='xl'
          onClick={() => {
            setVisible(false)
          }}
        >
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
        </ButtonX>
      </div>

      <div
        className={`h-1 bg-${color}-light animate-[countDown_5s_linear] fill-mode-forwards`}
      ></div>
    </div>
  )
}

export default Toast
