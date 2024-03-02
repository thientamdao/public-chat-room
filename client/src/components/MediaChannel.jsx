import { useState } from 'react'
import { useSelector } from 'react-redux'

import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import defaultAvatar from '../assets/img/avatar-default.png'
import { borderStyles } from '../constants'
import { Avatar, ButtonX } from './index'

const MediaChannel = () => {
  const currentUser = useSelector((state) => state.currentUser)

  const [microphone, setMicrophone] = useState(false)
  const [video, setVideo] = useState(false)

  return (
    <div className='flex flex-col h-full overflow-hidden'>
      <div className={`grow ${borderStyles} overflow-hidden`}>
        <div className='block h-full overflow-auto'>
          <div className='flex flex-col h-full'>
            <div className='grow'></div>
            {/* video gird */}
          </div>
        </div>
      </div>

      {/* media input */}
      <div
        className={`flex items-end justify-between px-4 py-2 ${borderStyles}`}
      >
        <div className='flex items-center overflow-hidden mr-2'>
          <Avatar
            className='shrink-0 mr-2'
            size='lg'
            src={currentUser?.avatarUrl || defaultAvatar}
          />

          <p className='whitespace-nowrap text-ellipsis overflow-hidden text-mono-dark'>
            {currentUser?.name}
          </p>
        </div>

        <div className='shrink-0 flex'>
          <ButtonX
            className='bg-transparent'
            color={microphone ? 'secondary' : 'danger'}
            size='xl'
            rounded
            onClick={() => {
              setMicrophone(!microphone)
            }}
          >
            <FontAwesomeIcon
              icon={microphone ? faMicrophone : faMicrophoneSlash}
            />
          </ButtonX>

          <ButtonX
            className='bg-transparent'
            color={video ? 'secondary' : 'danger'}
            size='xl'
            rounded
            onClick={() => {
              setVideo(!video)
            }}
          >
            <FontAwesomeIcon icon={video ? faVideo : faVideoSlash} />
          </ButtonX>
        </div>
      </div>
    </div>
  )
}

export default MediaChannel
