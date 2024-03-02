import { twMerge } from 'tailwind-merge'

const Badge = ({ className = '', children = '', color = 'primary' }) => (
  <span
    className={twMerge(
      `block px-2.5 py-0.5 rounded bg-${color}-light text-${color}-dark text-sm font-medium`,
      className,
    )}
  >
    {children}
  </span>
)

export default Badge
