import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button, ButtonX } from './index'

const Editable = ({
  className = '',
  children = '',
  icon = '',
  label = '',
  value = '',
  onInvisible = () => {},
  onSubmit = () => {},
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={twMerge('flex justify-between items-start w-full', className)}
    >
      <div className='shrink flex'>
        <div className='shrink-0 w-10'>
          <FontAwesomeIcon className='text-slate-500 text-3xl' icon={icon} />
        </div>

        <div className='shrink ml-2 flex flex-col'>
          <div className='text-mono-dark font-semibold break-words'>
            {label}
          </div>
          <p className='text-sm text-slate-500 break-words'>{value}</p>

          <div className={visible ? 'mt-2' : 'hidden'}>
            {children}

            <div className='flex items-center'>
              <Button
                className='mr-2'
                onClick={() => {
                  if (onSubmit()) {
                    onInvisible()
                    setVisible(false)
                  }
                }}
              >
                OK
              </Button>

              <Button
                color='secondary'
                inverse
                onClick={() => {
                  onInvisible()
                  setVisible(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ButtonX
        className={visible ? 'hidden' : 'shrink-0'}
        color='secondary'
        size='2xl'
        rounded
        onClick={() => {
          setVisible(true)
        }}
      >
        <FontAwesomeIcon icon={faPen} />
      </ButtonX>
    </div>
  )
}

export default Editable
