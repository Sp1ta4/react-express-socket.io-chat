import { useState, useEffect } from 'react';
import './index.sass';
import Chat from '../Chat'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Input from '@mui/material/Input';
import PropTypes from 'prop-types';
import LogoutIcon from '@mui/icons-material/Logout';
function Chats({ setCurrentChat, logOut, addChat, chats, currentChat }) {
  const [chatName, setChatName] = useState('');
  const [username, setUsername] = useState('');
  const handleChange = (event) => {
    setChatName(event.target.value);
  }
  const clearInput = () => {
    setChatName('');
  }

  useEffect(() => {
    setUsername(localStorage.getItem('name'))
  }, [])


  return (
    <div className='d-flex flex-column justify-content-between'>
      <div className="chatsDiv position-relative">
        <div className="chats  d-flex flex-column align-items-center">
          {chats?.length ? chats.map(chat => {
            return <Chat name={chat.name} messages={chat.messages} currentChat={currentChat} setCurrentChat={setCurrentChat} online={chat.online} roomId={chat.roomId} key={chat._id} />
          }) : ''}
        </div>
        <div className="addDiv d-flex justify-content-around w-100 p-2">
          <Input placeholder="Chat name..." className='ps-3 pe-3 p-2' value={chatName} onChange={handleChange} />
          <IconButton aria-label="sendMessage" onClick={() => { addChat(chatName); clearInput() }}>
            <AddIcon />
          </IconButton>

        </div>
      </div>
      <div className="profileDiv ps-3 pe-3 p-2 d-flex justify-content-between align-items-center">
        <span className='fw-bold'>{username}</span>
        <IconButton aria-label="sendMessage" onClick={logOut}>
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  )
}

Chats.propTypes = {
  setCurrentChat: PropTypes.func,
  addChat: PropTypes.func,
  chats: PropTypes.array,
  currentChat: PropTypes.object,
  logOut: PropTypes.func
}

export default Chats