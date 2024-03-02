import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import SockJS from 'sockjs-client/dist/sockjs'
import { over } from 'stompjs'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import defaultAvatar from '../assets/img/avatar-default.png'
import { WEB_SOCKET_URL } from '../constants'
import { createRoom } from '../utils/api'
import { Avatar, BadgeList, Button, ButtonX, CheckBox, Progress } from './index'

const CreateRoom = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const stompClient = useRef()
  const currentUser = useSelector((state) => state.currentUser)

  const [visible, setVisible] = useState(false)
  const [totalSlots, setTotalSlots] = useState(10)
  const [heading, setHeading] = useState('')
  const [description, setDescription] = useState('')
  const [languages, setLanguages] = useState([])
  const [topics, setTopics] = useState([])

  const autoHeight = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const handleCreateRoom = async () => {
    try {
      dispatch({ type: 'LOADING', payload: true })
      const response = await createRoom({
        totalSlots,
        heading,
        description,
        languages,
        topics,
      })

      const newRoom = response.data
      stompClient.current.send('/app/room', {})
      navigate(`/rooms/${newRoom.id}`)
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
    stompClient.current = over(new SockJS(WEB_SOCKET_URL))

    return () => {
      stompClient.current?.disconnect()
    }
  }, [])

  return (
    <>
      <ButtonX
        className='mr-2'
        size='2xl'
        rounded
        onClick={() => {
          if (currentUser) {
            if (currentUser?.verified) {
              setVisible(true)
            } else {
              dispatch({
                type: 'NOTIFICATION',
                payload: {
                  status: 'info',
                  message:
                    'You need to verify your email before creating a chat room',
                },
              })
            }
          } else {
            dispatch({
              type: 'NOTIFICATION',
              payload: {
                status: 'info',
                message: 'To create a chat room, you need to log in first',
              },
            })
          }
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </ButtonX>

      <div
        className={
          visible
            ? 'fixed inset-0 z-50 flex items-center justify-center py-16 bg-secondary-light/80 transition-opacity'
            : 'hidden'
        }
      >
        <form className='relative flex flex-col w-full max-h-full sm:max-w-[640px] sm:mx-4 rounded-sm sm:rounded-xl shadow-xl bg-mono-light'>
          <div className='p-4 border-b border-secondary-dark rounded-t'>
            <h3 className='text-xl text-mono-dark font-semibold'>
              Create new chat room
            </h3>
          </div>

          <div className='flex flex-col p-4 overflow-auto border-b border-secondary-dark bg-mono-light'>
            <div className='flex items-center'>
              <Avatar
                className='shrink-0 mr-2'
                size='xl'
                src={currentUser?.avatarUrl || defaultAvatar}
              />

              <div className='grow flex flex-col justify-between'>
                <p className='text-sm text-mono-dark font-semibold'>
                  <span>{currentUser?.name}</span>
                  <span className='mx-1'>•</span>
                  <span className='font-normal'>Just now</span>
                </p>

                <div className='flex items-center text-sm text-mono-dark'>
                  <p className='mr-2'>Members</p>
                  <Progress value={0} />
                  <p className='grow flex ml-2'>
                    0<span className='mx-1'>/</span>
                    <textarea
                      name='nSlots'
                      className='grow w-full bg-transparent'
                      rows='1'
                      placeholder='Number of slots'
                      value={totalSlots}
                      onChange={(e) => {
                        setTotalSlots(e.target.value)
                      }}
                    ></textarea>
                  </p>
                </div>
              </div>
            </div>

            <div className='pt-5'>
              <div className='pb-2'>
                <textarea
                  name='heading'
                  rows='1'
                  className='block w-full bg-transparent text-mono-dark text-xl font-semibold'
                  placeholder='Title of your chat room'
                  onInput={(e) => autoHeight(e)}
                  value={heading}
                  onChange={(e) => {
                    setHeading(e.target.value)
                  }}
                ></textarea>
                <textarea
                  name='description'
                  rows='1'
                  className='block w-full bg-transparent text-mono-dark text-base font-normal mt-2'
                  placeholder='Description of your chat room'
                  onInput={(e) => autoHeight(e)}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                ></textarea>
              </div>

              <div className='mt-2'>
                <CheckBox
                  options={[
                    'English',
                    'Tiếng Việt',
                    '中文',
                    '日本語',
                    '한국인',
                    'แบบไทย',
                  ]}
                  onSelect={(selections) => {
                    setLanguages(selections)
                  }}
                >
                  <BadgeList label='Languages' badges={languages} />
                </CheckBox>
              </div>

              <div className='mt-2'>
                <CheckBox
                  options={['Study', 'Gaming', 'Just Chat']}
                  onSelect={(selections) => {
                    setTopics(selections)
                  }}
                >
                  <BadgeList label='Topics' badges={topics} />
                </CheckBox>
              </div>
            </div>
          </div>

          <div className='flex items-center p-4'>
            <Button onClick={handleCreateRoom}>Create</Button>

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

export default CreateRoom
