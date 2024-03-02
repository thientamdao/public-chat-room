import { twMerge } from 'tailwind-merge'
import { Badge } from './index'

const BadgeList = ({ className = '', label = '', badges = [] }) => {
  return (
    <ul
      aria-label={label}
      className={twMerge(
        'flex flex-wrap before:content-[attr(aria-label)] before:uppercase before:text-sm before:font-semibold before:mt-1 before:mr-2 before:py-0.5 before:text-secondary-dark',
        className,
      )}
    >
      {badges.map((badge, index) => (
        <li key={index} className='mt-1 mr-1 last:mr-0'>
          <Badge>{badge}</Badge>
        </li>
      ))}
    </ul>
  )
}

export default BadgeList
