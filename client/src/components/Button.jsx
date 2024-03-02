import { twMerge } from 'tailwind-merge'

const Button = ({
  className = '',
  children = '',
  tagA = false,
  href = '',
  color = 'primary',
  inverse = false,
  size = 'base',
  rounded = false,
  onClick = () => {},
}) => {
  const styles = twMerge(
    `font-semibold
    bg-${color}-${inverse ? 'light' : 'dark'}
    hover:bg-${color}-${inverse ? 'light' : 'dark'}/80
    text-${color}-${inverse ? 'dark' : 'light'} ${
      size === 'sm'
        ? 'px-2 py-1 text-xs'
        : size === 'base'
        ? 'px-4 py-2 text-sm'
        : size === 'lg'
        ? 'px-4 py-3 text-base'
        : ''
    } ${rounded ? 'rounded-full' : 'rounded-md'}`,
    className,
  )

  return tagA ? (
    <a href={href} onClick={onClick} className={styles}>
      {children}
    </a>
  ) : (
    <button type='button' onClick={onClick} className={styles}>
      {children}
    </button>
  )
}

export default Button
