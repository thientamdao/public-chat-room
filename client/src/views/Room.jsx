import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { faArrowLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  ButtonX,
  PropertiesChannel,
  TextChannel,
  ThemeToggler,
  Toggler,
} from '../components'
import { borderStyles } from '../constants'

const Room = () => {
  const navigate = useNavigate()

  const card = useSelector((state) => state.room)

  // const [mediaChannel, setMediaChannel] = useState(false)
  const [propsChannel, setPropsChannel] = useState(false)

  return (
    <div className='flex flex-col h-screen w-screen overflow-hidden bg-mono-light'>
      {/* Room Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 ${borderStyles}`}
      >
        <div className='flex mr-2 overflow-hidden'>
          <ButtonX
            className='shrink-0 mr-2'
            color='secondary'
            size='lg'
            rounded
            onClick={() => {
              navigate('/')
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </ButtonX>

          <p className='whitespace-nowrap text-ellipsis overflow-hidden text-lg text-mono-dark font-medium'>
            {card?.heading}
          </p>
        </div>

        <div className='flex'>
          <ThemeToggler size='lg' />

          {/* <Toggler
            className='ml-2'
            size='lg'
            checked={mediaChannel}
            onClick={() => {
              setMediaChannel(!mediaChannel)
              if (document.getElementById('root').offsetWidth <= 640) {
                setPropsChannel(false)
              }
            }}
          >
            <FontAwesomeIcon icon={faMusic} />
          </Toggler> */}

          <Toggler
            className='ml-2'
            size='lg'
            checked={propsChannel}
            onClick={() => {
              setPropsChannel(!propsChannel)
              // if (document.getElementById('root').offsetWidth <= 640) {
              //   setMediaChannel(false)
              // }
            }}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </Toggler>
        </div>
      </div>

      {/* <Channels /> */}
      <div className='grow flex overflow-hidden'>
        <div className='grow overflow-hidden'>
          <TextChannel />
        </div>

        {/* <div
          className={
            mediaChannel
              ? propsChannel
                ? 'shrink-0 w-full sm:w-1/3 xl:w-1/2'
                : 'shrink-0 w-full sm:w-1/2'
              : 'hidden'
          }
        >
          <MediaChannel />
        </div> */}

        <div
          className={
            propsChannel ? 'shrink-0 w-full sm:max-w-xs sm:w-1/3' : 'hidden'
          }
        >
          <PropertiesChannel />
        </div>
      </div>
    </div>
  )
}

export default Room
