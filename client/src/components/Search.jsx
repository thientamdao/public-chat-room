import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { searchRooms } from '../utils/api'

const Search = () => {
  const dispatch = useDispatch()

  const [keywords, setKeywords] = useState('')

  const fetchRooms = async () => {
    try {
      console.log('Search: Fetch Rooms')
      const response = await searchRooms(keywords)
      dispatch({ type: 'CARDS', payload: response.data })
    } catch (error) {
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          status: 'danger',
          message: error.response ? error.response.data : error.message,
        },
      })
    }
  }

  const submit = (e) => {
    e.preventDefault()
    dispatch({ type: 'LOADING', payload: true })
    fetchRooms()
    dispatch({ type: 'LOADING', payload: false })
  }

  return (
    <form className='relative w-full'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <svg
          className='w-4 h-4 text-secondary-dark'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
          />
        </svg>
      </div>
      <input
        type='search'
        className='block w-full px-4 py-2 pl-10 bg-secondary-light text-secondary-dark text-sm font-medium rounded-full outline-none'
        placeholder='Type # to filter, search everything'
        required
        value={keywords}
        onChange={(e) => {
          setKeywords(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            submit(e)
          }
        }}
      />
    </form>
  )
}

export default Search
