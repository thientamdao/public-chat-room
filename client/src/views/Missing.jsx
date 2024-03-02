import { Header } from '../components'

const Missing = () => {
  return (
    <div className='min-h-screen min-w-fit bg-mono-light'>
      <Header />

      <div className='p-4'>
        <p className='text-4xl text-mono-dark'>Oops!</p>
        <p className='text-base text-mono-dark mt-2'>Page Not Found</p>
      </div>
    </div>
  )
}

export default Missing
