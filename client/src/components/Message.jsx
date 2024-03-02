import { useSelector } from 'react-redux'

import { faDownload, faFileLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import defaultAvatar from '../assets/img/avatar-default.png'
import { isNotif } from '../constants'
import { autoConvertUnit, download } from '../utils/common'
import { Avatar, Button } from './index'

const Message = ({ message }) => {
  const currentUser = useSelector((state) => state.currentUser)

  return isNotif(message.contents[0].status) ? (
    <ul className='flex flex-col items-center'>
      {message.contents.map((content, index) => (
        <li key={index} className='relative mb-1 last:mb-0 group'>
          <p className='text-secondary-dark text-sm font-medium'>
            {content.value}
          </p>

          <span
            className='absolute bottom-0 left-1/2 -translate-x-1/2 hidden group-hover:block w-max mr-2
            px-2 py-1 rounded-md bg-mono-light text-secondary-dark text-xs shadow-md shadow-secondary-dark'
          >
            {new Date(content.date).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  ) : message.sender.id === currentUser?.id ? (
    <ul className='flex flex-col items-end pl-20 overflow-hidden'>
      {message.contents.map((content, index) => (
        <li key={index} className='relative max-w-full mb-1 last:mb-0 group'>
          <div
            className={`inline-block max-w-full px-3 py-1 bg-primary-dark text-mono-light text-base rounded-r-sm rounded-l-2xl ${
              index === 0 ? 'rounded-tr-2xl' : ''
            } ${index === message.contents.length - 1 ? 'rounded-br-2xl' : ''}`}
          >
            {content.status === 'FILE' ? (
              <div className='flex items-center overflow-hidden'>
                <FontAwesomeIcon className='text-4xl mr-2' icon={faFileLines} />

                <div className='flex flex-col overflow-hidden'>
                  <p className='whitespace-nowrap text-ellipsis overflow-hidden font-medium'>
                    {content.value.name}
                  </p>

                  <div className='flex justify-between'>
                    <p className='text-sm text-secondary-light'>
                      {autoConvertUnit(content.value.size)}
                    </p>

                    <Button
                      className='ml-2'
                      inverse
                      size='sm'
                      onClick={() => {
                        download(content.value.name, content.value.url)
                      }}
                    >
                      <FontAwesomeIcon icon={faDownload} /> Download
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              content.value
            )}
          </div>

          <span className='absolute bottom-0 right-full hidden group-hover:block mr-2 bg-mono-light text-secondary-dark text-xs'>
            {new Date(content.date).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <div className='flex items-end'>
      <Avatar
        className='shrink-0 mr-2'
        size='lg'
        src={message.sender.avatarUrl || defaultAvatar}
      />

      <div className='flex flex-col overflow-hidden'>
        <p className='px-3 py-1 text-secondary-dark text-xs font-medium'>
          {message.sender.name}
        </p>

        <ul className='flex flex-col items-start pr-20 overflow-hidden'>
          {message.contents.map((content, index) => (
            <li
              key={index}
              className='relative max-w-full mb-1 last:mb-0 group'
            >
              <div
                className={`inline-block max-w-full px-3 py-1 bg-secondary-light text-mono-dark text-base rounded-l-sm rounded-r-2xl ${
                  index === 0 ? 'rounded-tl-2xl' : ''
                } ${
                  index === message.contents.length - 1 ? 'rounded-bl-2xl' : ''
                }`}
              >
                {content.status === 'FILE' ? (
                  <div className='flex items-center overflow-hidden'>
                    <FontAwesomeIcon
                      className='text-4xl mr-2'
                      icon={faFileLines}
                    />

                    <div className='flex flex-col overflow-hidden'>
                      <p className='whitespace-nowrap text-ellipsis overflow-hidden font-medium'>
                        {content.value.name}
                      </p>

                      <div className='flex justify-between'>
                        <p className='text-sm text-secondary-dark'>
                          {autoConvertUnit(content.value.size)}
                        </p>

                        <Button
                          className='ml-2'
                          color='secondary'
                          size='sm'
                          onClick={() => {
                            download(content.value.name, content.value.url)
                          }}
                        >
                          <FontAwesomeIcon icon={faDownload} /> Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  content.value
                )}
              </div>

              <span className='absolute bottom-0 left-full hidden group-hover:block ml-2 bg-mono-light text-secondary-dark text-xs'>
                {new Date(content.date).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Message
