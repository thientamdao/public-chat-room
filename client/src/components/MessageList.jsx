import { Message } from './index'

const MessageList = ({ messages }) => {
  return (
    <ul className='flex flex-col py-2'>
      {messages.map((message, index) => (
        <li key={index} className='mb-2 last:mb-0'>
          <Message message={message} />
        </li>
      ))}
    </ul>
  )
}

export default MessageList
