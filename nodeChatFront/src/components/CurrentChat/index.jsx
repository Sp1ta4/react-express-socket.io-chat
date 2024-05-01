import './index.sass'
import Input from '@mui/material/Input';
import EmojiPicker from 'emoji-picker-react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { useEffect, useState, useRef } from 'react';
import Message from '../Message';
import PropTypes from 'prop-types';

function CurrentChat({ currentChat, socket, room }) {
  const [toggleEmojiBar, setToggleEmojiBar] = useState(false);
  const [arrayMessages, setArrayMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const handleChange = (event) => {
    setCurrentMessage(event.target.value);
  }
  const addEmoji = ({ emoji }) => {
    setCurrentMessage(currentMessage.concat(emoji));
  }
  const sendMessage = () => {
    console.log(room);
    if (currentMessage) {
      const messageData = {
        roomId: room.roomId,
        author: {},
        message: currentMessage,
        date: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      socket.emit("send_message", messageData);
      clearInput();
    } else {
      alert("Write Your Message");
    }
  }
  const clearInput = () => {
    setCurrentMessage('');
  }
  const messagesContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    socket.on("receive_message", (room) => {
      console.log(1020, room);
      setArrayMessages(room.messages);
    });
  }, [])
  useEffect(() => {
    scrollToBottom()
  }, [arrayMessages])

  return (
    <>
      {Object.keys(currentChat).length ?
        <div className='currentWrapper'>
          <div ref={messagesContainerRef} className="messagesDiv d-flex flex-column" >
            <div className="messages d-grid ps-3 pe-3 pb-4" >
              {arrayMessages.length ? arrayMessages.map((message, index) => <Message key={index} message={message} />) : null}
            </div>
          </div>
          <div className="inputDiv bg-light d-flex">
            <Input placeholder="Type..." className='mainInput ps-3 pe-3 p-2' value={currentMessage} onChange={handleChange} />
            {currentMessage.length ? <IconButton aria-label="sendMessage" onClick={sendMessage}>
              <SendIcon />
            </IconButton> : <IconButton aria-label="sendMessage" disabled>
              <SendIcon />
            </IconButton>}
            <IconButton aria-label="emoji" onClick={() => setToggleEmojiBar(!toggleEmojiBar)}>
              <SentimentSatisfiedAltIcon />
            </IconButton>
          </div>
          <EmojiPicker className='position-absolute bottom-0 end-0 emojiBar'
            open={toggleEmojiBar}
            onEmojiClick={addEmoji}
            defaultSkinTone='1f3fc'
            skinTonesDisabled
          />
        </div> :
        <div className='emptyPage'>
          <div className='d-flex flex-column justify-content-between align-items-center'>
            <span className='mt-5 fw-bold fs-4'>Select the chat in which you would like to write</span>
          </div>
        </div>}
    </>
  )
}
CurrentChat.propTypes = {
  currentChat: PropTypes.object,
  room: PropTypes.object,
  socket: PropTypes.object,
}
export default CurrentChat