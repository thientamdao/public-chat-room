import { twMerge } from 'tailwind-merge'

const Input = ({
  className = '',
  children = '',
  label = '',
  value = '',
  type = 'text',
  feedbackInvalid = '',
  onChange = () => {},
  onBlur = () => {},
}) => (
  <label className={twMerge('block text-mono-dark', className)}>
    <div className='font-medium'>{label}</div>

    <div
      className={
        'flex w-full mt-2 px-4 py-2 rounded-md border ' +
        (feedbackInvalid === ''
          ? 'border-secondary-dark bg-mono-light focus-within:outline outline-1 outline-primary-dark'
          : 'border-danger-dark bg-danger-light focus-within:outline outline-1 outline-danger-dark')
      }
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          onBlur()
        }
      }}
    >
      <input
        className='grow bg-transparent outline-none'
        type={type}
        value={value}
        autoComplete=''
        onChange={onChange}
      />

      {children}
    </div>

    <p
      className={
        feedbackInvalid === ''
          ? 'hidden'
          : 'mt-1 text-sm text-danger-dark font-medium'
      }
    >
      {feedbackInvalid}
    </p>
  </label>
)

export default Input
