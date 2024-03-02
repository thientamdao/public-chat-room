import {
  faCircleCheck,
  faCircleInfo,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const GOOGLE_AUTH_URL = `${API_BASE_URL}/oauth2/authorization/google`
export const WEB_SOCKET_URL = `${API_BASE_URL}/ws`

export const ACCESS_TOKEN = 'accessToken'
export const THEME = 'theme'

export const borderStyles =
  'border border-slate-500 border-t-transparent border-l-transparent'

export const statusDetails = {
  info: { color: 'primary', icon: faCircleInfo },
  success: { color: 'success', icon: faCircleCheck },
  danger: { color: 'danger', icon: faTriangleExclamation },
}

export const getSize = (size) =>
  size === 'xs'
    ? 'h-4 w-4'
    : size === 'sm'
    ? 'h-5 w-5'
    : size === 'base'
    ? 'h-6 w-6'
    : size === 'lg'
    ? 'h-7 w-7'
    : size === 'xl'
    ? 'h-8 w-8'
    : size === '2xl'
    ? 'h-9 w-9'
    : ''

export const isNotif = (status) => ['JOIN', 'LEAVE'].includes(status)
