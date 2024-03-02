import { twMerge } from 'tailwind-merge'
import { getSize } from '../constants'

const Loading = ({
  className = '',
  color = 'primary',
  inverse = false,
  size = 'base',
}) => {
  return (
    <div
      className={twMerge(
        `rounded-full bg-${color}-${inverse ? 'light' : 'dark'}
        ${getSize(size)} animate-beat`,
        className,
      )}
    ></div>
  )
}

export default Loading
