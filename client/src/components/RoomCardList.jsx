import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { CardList, RoomCard } from './index'

const RoomCardList = ({ cards = [] }) => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.currentUser)

  return (
    <CardList
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      cards={cards.map((card, index) => (
        <Link
          key={index}
          className='block h-full p-4'
          to={currentUser ? `/rooms/${card.id}` : ''}
          onClick={() => {
            if (!currentUser) {
              dispatch({
                type: 'NOTIFICATION',
                payload: {
                  status: 'info',
                  message: 'To join a chat room, you need to log in first',
                },
              })
            }
          }}
        >
          <RoomCard card={card} />
        </Link>
      ))}
    />
  )
}

export default RoomCardList
