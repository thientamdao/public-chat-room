import { twMerge } from 'tailwind-merge'

const Progress = ({ className = '', color = 'primary', value = 100 }) => (
  <div
    className={twMerge(`h-1 w-20 bg-${color}-light rounded-full`, className)}
  >
    <div
      className={`h-1 bg-${color}-dark rounded-full`}
      style={{ width: `${value}%` }}
    ></div>
  </div>
)

export default Progress
