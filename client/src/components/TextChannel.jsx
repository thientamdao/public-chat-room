import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import SockJS from 'sockjs-client/dist/sockjs'
import { over } from 'stompjs'

import { WEB_SOCKET_URL, borderStyles, isNotif } from '../constants'
import { getFile, getLastPath } from '../utils/common'
import { MessageInput, MessageList } from './index'
import { joinRoom, leaveRoom } from '../utils/api'

const TextChannel = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const location = useLocation()
  const roomId = getLastPath(location.pathname)

  const stompClient = useRef()
  const messagesEnd = useRef()

  const currentUser = useSelector((state) => state.currentUser)
  const [messages, setMessages] = useState([])

  const sendMessage = (status = 'TEXT', value = '') => {
    stompClient.current?.send(
      '/app/message',
      {},
      JSON.stringify({
        sender: {
          id: currentUser?.id,
          name: currentUser?.name,
          avatarUrl: currentUser?.avatarUrl,
        },
        roomId,
        status,
        value,
      }),
    )
  }

  const handleJoinRoom = async () => {
    try {
      stompClient.current = over(new SockJS(WEB_SOCKET_URL))

      dispatch({ type: 'LOADING', payload: true })
      const response = await joinRoom(roomId)
      dispatch({ type: 'ROOM', payload: response.data })

      // Connect to {roomId} room
      stompClient.current.connect(
        {},
        () => {
          stompClient.current.send('/app/room', {})
          stompClient.current.subscribe(`/room/${roomId}/public`, (payload) => {
            const receivedMessage = JSON.parse(payload.body)

            if (isNotif(receivedMessage.status)) {
              dispatch({
                type: 'ROOM',
                payload: JSON.parse(receivedMessage.value),
              })
            }

            const content = {
              status: receivedMessage.status,
              value:
                receivedMessage.status === 'JOIN'
                  ? `${receivedMessage.sender.name} join this room ヽ(>∀<☆)ノ`
                  : receivedMessage.status === 'LEAVE'
                  ? `${receivedMessage.sender.name} leave this room (ノ_<、)`
                  : receivedMessage.status === 'FILE'
                  ? getFile(receivedMessage.value)
                  : receivedMessage.value,
              date: receivedMessage.date,
            }

            if (
              messages.length > 0 &&
              ((isNotif(receivedMessage.status) &&
                !messages[messages.length - 1].sender) ||
                (!isNotif(receivedMessage.status) &&
                  messages[messages.length - 1].sender?.id ===
                    receivedMessage.sender.id))
            ) {
              messages[messages.length - 1].contents.push(content)
            } else {
              messages.push({
                sender: isNotif(receivedMessage.status)
                  ? undefined
                  : receivedMessage.sender,
                contents: [content],
              })
            }

            setMessages([...messages])
          })

          sendMessage('JOIN')
          dispatch({ type: 'LOADING', payload: false })
        },
        (error) => {
          dispatch({ type: 'LOADING', payload: false })
          dispatch({
            type: 'NOTIFICATION',
            payload: {
              status: 'danger',
              message: error.headers?.message,
            },
          })
          navigate('/')
        },
      )
    } catch (error) {
      dispatch({ type: 'LOADING', payload: false })
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          status: 'danger',
          message: error.response ? error.response.data : error.message,
        },
      })
      navigate('/')
    }
  }

  useEffect(() => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!currentUser) {
      navigate('/')
    } else {
      handleJoinRoom()
    }

    return async () => {
      if (messages.length !== 0) {
        dispatch({ type: 'LOADING', payload: true })
        await leaveRoom(roomId)
        sendMessage('LEAVE')
        stompClient.current.send('/app/room', {})
        dispatch({ type: 'ROOM', payload: null })
        stompClient.current?.disconnect()
        dispatch({ type: 'LOADING', payload: false })
      }
    }
  }, [])

  return (
    <div className={`flex flex-col h-full overflow-hidden`}>
      <div className={`grow ${borderStyles} overflow-hidden`}>
        <div className='block h-full px-4 overflow-auto'>
          <div className='flex flex-col h-full'>
            <div className='grow'></div>
            <MessageList messages={messages} />
            <div ref={messagesEnd}></div>
          </div>
        </div>
      </div>

      <MessageInput
        onSend={(message) => {
          sendMessage(message.status, message.value)
        }}
      />
    </div>
  )
}

export default TextChannel
