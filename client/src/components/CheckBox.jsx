import { useEffect, useState } from 'react'

const CheckBox = ({ children = '', options = [], onSelect = () => {} }) => {
  const [selections, setSelections] = useState([])

  useEffect(() => {
    onSelect(selections)
  }, [selections])

  return (
    <div className='group'>
      <ul
        className='hidden group-focus-within:flex flex-wrap w-full p-2 rounded border border-secondary-dark'
        tabIndex='1'
      >
        {options.map((option, index) => (
          <li key={index} className='my-1 mr-2 last:mr-0'>
            <input
              id={option}
              type='checkbox'
              className='peer sr-only'
              onChange={(e) => {
                if (e.target.checked) {
                  setSelections([...selections, option])
                } else {
                  setSelections(
                    selections.filter((selection) => selection !== option),
                  )
                }
              }}
            />
            <label
              htmlFor={option}
              className='block px-2.5 py-0.5 rounded cursor-pointer border border-secondary-dark peer-checked:bg-secondary-dark text-secondary-dark peer-checked:text-secondary-light text-sm font-medium'
            >
              {option}
            </label>
          </li>
        ))}
      </ul>

      <button type='button'>{children}</button>
    </div>
  )
}

export default CheckBox
