import { useEffect, useState } from 'react'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { THEME } from '../constants'
import { ButtonX } from './index'

const ThemeToggler = ({ className, size = '2xl' }) => {
  const [icon, setIcon] = useState(faSun)

  const toggleTheme = () => {
    if (localStorage.getItem(THEME) === 'dark') {
      localStorage.setItem(THEME, 'light')
      document.documentElement.classList.remove('dark')
      setIcon(faSun)
    } else {
      localStorage.setItem(THEME, 'dark')
      document.documentElement.classList.add('dark')
      setIcon(faMoon)
    }
  }

  useEffect(() => {
    if (localStorage.getItem(THEME) === 'dark') {
      document.documentElement.classList.add('dark')
      setIcon(faMoon)
    } else {
      document.documentElement.classList.remove('dark')
      setIcon(faSun)
    }
  }, [])

  return (
    <ButtonX
      className={className}
      color='secondary'
      size={size}
      rounded
      onClick={toggleTheme}
    >
      <FontAwesomeIcon icon={icon} />
    </ButtonX>
  )
}

export default ThemeToggler
