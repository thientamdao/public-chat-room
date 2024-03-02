import { useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  faFaceSmile,
  faImage,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmojiPicker from 'emoji-picker-react'

import { borderStyles } from '../constants'
import { ButtonX } from './index'

const MessageInput = ({ onSend = () => {} }) => {
  const dispatch = useDispatch()

  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const [defaultIcon, setDefaultIcon] = useState('💙')

  const autoHeight = (e) => {
    e.target.style.height = 'auto'
    if (e.target.scrollHeight < 100) {
      e.target.style.height = e.target.scrollHeight + 'px'
    } else {
      e.target.style.height = '100px'
    }
  }

  const submit = (e) => {
    e.preventDefault()
    const messageTrim = message.trim()
    if (messageTrim !== '') {
      onSend({ status: 'TEXT', value: messageTrim })
      setMessage('')
      setVisible(false)
      document.querySelector('#messageInput').style.height = 'auto'
    }
  }

  const dropHeart = () => {
    onSend({ status: 'TEXT', value: defaultIcon })
    setVisible(false)
  }

  const handleSendFiles = (files) => {
    files.forEach((file) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = (e) => {
        try {
          const ciphertext = btoa(
            String.fromCharCode(...new Uint8Array(e.target.result)),
          )

          onSend({
            status: 'FILE',
            value: file.name + '\n' + file.size + '\n' + ciphertext,
          })
        } catch (error) {
          dispatch({
            type: 'NOTIFICATION',
            payload: {
              status: 'danger',
              message: 'File is too large',
            },
          })
        }
      }
    })
  }

  return (
    <div className={`flex items-end justify-between px-4 py-2 ${borderStyles}`}>
      <label className='shrink-0 mr-2 hover:bg-secondary-dark/20 rounded-full cursor-pointer'>
        <ButtonX
          className='bg-transparent'
          tagDiv
          color='secondary'
          size='xl'
          rounded
        >
          <FontAwesomeIcon icon={faImage} />
        </ButtonX>

        <input
          className='sr-only'
          type='file'
          multiple
          onChange={(e) => {
            handleSendFiles([...e.target.files])
          }}
        />
      </label>

      <form className='grow relative pr-10'>
        <div
          className={`absolute bottom-full right-0 flex justify-end w-1/2 min-w-80 mb-1 ${
            visible ? '' : 'hidden'
          }`}
        >
          <EmojiPicker
            reactionsDefaultOpen={true}
            onEmojiClick={(emojiData) => {
              setMessage((prevMessage) => prevMessage + emojiData.emoji)
            }}
          />
        </div>

        <textarea
          id='messageInput'
          rows='1'
          className='block w-full px-3 py-1 pr-8 bg-secondary-light text-mono-dark text-base rounded-2xl outline-none resize-none'
          placeholder='Text a message'
          value={message}
          onInput={(e) => {
            autoHeight(e)
            setMessage(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              submit(e)
            }
          }}
          required
        />

        <ButtonX
          className='absolute bottom-0 right-10 bg-transparent'
          color='secondary'
          size='xl'
          rounded
          onClick={() => {
            setVisible(!visible)
          }}
        >
          <FontAwesomeIcon icon={faFaceSmile} />
        </ButtonX>

        <ButtonX
          className='absolute bottom-0 right-0 bg-transparent'
          size='xl'
          rounded
          onClick={message === '' ? dropHeart : submit}
        >
          {message === '' ? (
            defaultIcon
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          )}
        </ButtonX>
      </form>
    </div>
  )
}

export default MessageInput
