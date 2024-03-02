import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SockJS from 'sockjs-client/dist/sockjs'
import { over } from 'stompjs'

import { Header, RoomCardList } from '../components'
import { WEB_SOCKET_URL } from '../constants'
import { searchRooms } from '../utils/api'

const Home = () => {
  const dispatch = useDispatch()

  const stompClient = useRef()
  const cards = useSelector((state) => state.cards)

  const fetchRooms = async () => {
    try {
      console.log('Home: Fetch Rooms')
      const response = await searchRooms('')
      dispatch({ type: 'CARDS', payload: response.data })
    } catch (error) {
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
    fetchRooms()

    stompClient.current = over(new SockJS(WEB_SOCKET_URL))
    stompClient.current.connect(
      {},
      () => {
        stompClient.current.subscribe(`/room/public`, (payload) => {
          const newCards = JSON.parse(payload.body)
          dispatch({ type: 'CARDS', payload: newCards })
        })
      },
      (error) => {
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            status: 'danger',
            message: error.headers?.message,
          },
        })
      },
    )

    return () => {
      stompClient.current?.disconnect()
    }
  }, [])

  return (
    <div className='min-h-screen min-w-fit bg-mono-light'>
      <Header />
      <RoomCardList cards={cards} />
    </div>
  )
}

export default Home
