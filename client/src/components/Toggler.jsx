import { twMerge } from 'tailwind-merge'
import { getSize } from '../constants'

const Toggler = ({
  className = '',
  children = '',
  checked = false,
  color = 'primary',
  size = 'base',
  onClick = () => {},
}) => (
  <button
    type='button'
    className={twMerge(
      `flex justify-center items-center ${getSize(size)} rounded-full ${
        checked
          ? `bg-${color}-dark text-${color}-light`
          : 'bg-secondary-light hover:bg-secondary-dark/20 text-secondary-dark'
      } text-base cursor-pointer`,
      className,
    )}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Toggler
