import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { ButtonX } from './index'

const Alert = ({
  className = '',
  children = '',
  color = 'primary',
  setMessage = () => {},
}) => {
  const [visible, setVisible] = useState(true)
  const [alertClass, setAlertClass] = useState(
    `flex items-center justify-between p-4 rounded-md border border-${color}-dark bg-${color}-light text-${color}-dark`,
  )

  useEffect(() => {
    if (!visible) {
      setAlertClass(
        alertClass + ' transition-opacity duration-300 ease-out opacity-0',
      )
      setTimeout(() => {
        setAlertClass('hidden')
        setMessage('')
      }, 300)
    }
  }, [visible])

  return (
    <div className={twMerge(alertClass, className)} role='alert'>
      {children}

      <ButtonX
        className='shrink-0 ml-2 -mr-1 -my-1'
        color={color}
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
  )
}

export default Alert
