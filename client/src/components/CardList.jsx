import { twMerge } from 'tailwind-merge'
import { borderStyles } from '../constants'

const CardList = ({ className = '', cards = [] }) => {
  return (
    <ul className={twMerge('', className)}>
      {cards.map((card, index) => (
        <li key={index} className='bg-mono-dark'>
          <div
            className={`block h-full ${borderStyles} bg-mono-light hover:bg-secondary-light hover:border-mono-dark hover:-translate-x-1 hover:-translate-y-1 transition-all`}
          >
            {card}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CardList
