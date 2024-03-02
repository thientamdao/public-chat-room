import defaultAvatar from '../assets/img/avatar-default.png'
import { Avatar, BadgeList, Progress } from './index'

const RoomCard = ({ card }) => (
  <div className='flex flex-col h-full'>
    <div className='flex items-center'>
      <Avatar
        className='shrink-0 mr-2'
        size='xl'
        src={card?.owner.avatarUrl || defaultAvatar}
      />

      <div className='flex flex-col justify-between overflow-hidden'>
        <p className='whitespace-nowrap text-ellipsis overflow-hidden text-sm text-mono-dark font-semibold'>
          <span>{card?.owner.name}</span>
          <span className='mx-1'>•</span>
          <span className='font-normal'>
            {new Date(card?.createdAt).toLocaleTimeString()}
          </span>
        </p>
        <div className='whitespace-nowrap text-ellipsis overflow-hidden flex items-center'>
          <p className='mr-2 text-sm text-mono-dark'>Members</p>
          <Progress value={(card?.members.length / card?.totalSlots) * 100} />
          <p className='ml-2 text-sm text-mono-dark'>
            {card?.members?.length} / {card?.totalSlots}
          </p>
        </div>
      </div>
    </div>

    <div className='mt-auto pt-4'>
      <div className='pb-2'>
        <h3 className='text-mono-dark text-lg font-semibold'>
          {card?.heading}
        </h3>
        <p className='text-mono-dark text-sm mt-1'>{card?.description}</p>
      </div>

      <div className='mt-1'>
        <BadgeList label='Languages' badges={card?.languages} />
      </div>

      <div className='mt-1'>
        <BadgeList label='Topics' badges={card?.topics} />
      </div>
    </div>
  </div>
)

export default RoomCard
