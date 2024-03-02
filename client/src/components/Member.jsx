import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import defaultAvatar from '../assets/img/avatar-default.png'
import { Avatar, Button } from './index'

const Member = ({ member = {} }) => (
  <Button
    className='w-full px-2 bg-transparent font-normal'
    color='secondary'
    inverse
  >
    <div className='flex justify-between items-center'>
      <div className='flex items-center overflow-hidden'>
        <Avatar
          className='shrink-0 mr-2'
          src={member.avatarUrl || defaultAvatar}
        />

        <p className='whitespace-nowrap text-ellipsis overflow-hidden text-mono-dark'>
          {member.name}
        </p>
      </div>

      <FontAwesomeIcon icon={faMicrophoneSlash} />
    </div>
  </Button>
)

export default Member
