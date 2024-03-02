import { useState } from 'react'
import { useSelector } from 'react-redux'

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { borderStyles } from '../constants'
import { Button, MemberList, RoomCard } from './index'

const PropertiesChannel = () => {
  const card = useSelector((state) => state.room)

  const [roomInfo, setRoomInfo] = useState(false)
  const [memberInfo, setMemberInfo] = useState(false)

  return (
    <div className={`flex flex-col h-full px-4 ${borderStyles} overflow-auto`}>
      <Button
        className='mt-2 -mx-2 px-2 bg-transparent text-base'
        color='secondary'
        inverse
        onClick={() => {
          setRoomInfo(!roomInfo)
        }}
      >
        <p className='flex justify-between items-center'>
          <span className='mr-2'>Chat Room</span>
          <FontAwesomeIcon icon={roomInfo ? faChevronUp : faChevronDown} />
        </p>
      </Button>

      <div className={roomInfo ? 'my-2 ml-4' : 'hidden'}>
        <RoomCard card={card}></RoomCard>
      </div>

      <Button
        className='-mx-2 px-2 bg-transparent text-base'
        color='secondary'
        inverse
        onClick={() => {
          setMemberInfo(!memberInfo)
        }}
      >
        <p className='flex justify-between items-center'>
          <span className='mr-2'>Members</span>
          <FontAwesomeIcon icon={memberInfo ? faChevronUp : faChevronDown} />
        </p>
      </Button>

      <div className={memberInfo ? 'm-2 -mr-2' : 'hidden'}>
        <MemberList members={card?.members} />
      </div>
    </div>
  )
}

export default PropertiesChannel
