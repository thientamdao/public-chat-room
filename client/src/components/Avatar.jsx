import { twMerge } from 'tailwind-merge'
import { getSize } from '../constants'

const Avatar = ({ className = '', size = 'base', src = '' }) => (
  <div
    className={twMerge(
      `flex items-center justify-center rounded-full
      overflow-hidden ${getSize(size)}`,
      className,
    )}
  >
    <img className='w-full h-full' src={src} alt='Avatar' />
  </div>
)

export default Avatar
