import { twMerge } from 'tailwind-merge'
import { getSize } from '../constants'

const ButtonX = ({
  className = '',
  children = '',
  tagDiv = false,
  color = 'primary',
  inverse = false,
  size = 'base',
  rounded = false,
  onClick = () => {},
  onBlur = () => {},
}) => {
  const styles = (salt) =>
    twMerge(
      `flex items-center justify-center overflow-hidden
      bg-${color}-${inverse ? 'dark' : 'light'} ${salt}
      text-${color}-${inverse ? 'light' : 'dark'} ${getSize(size)}
      ${rounded ? 'rounded-full' : 'rounded-md'}`,
      className,
    )

  return tagDiv ? (
    <div className={styles()}>{children}</div>
  ) : (
    <button
      type='button'
      onClick={onClick}
      onBlur={onBlur}
      className={styles(`hover:bg-${color}-${inverse ? 'light' : 'dark'}/20`)}
    >
      {children}
    </button>
  )
}

export default ButtonX
