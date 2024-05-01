import './index.sass';
import Chats from '../Chats'
import CurrentChat from '../CurrentChat';
import { useState } from 'react';
import PropTypes from 'prop-types';


function MainPage({ logOut, addChat, chats, getCurrentChat, socket }) {
  const [currentChat, setCurrentChat] = useState({});
  return (
    <div className="wrapperMain d-flex">
      <Chats setCurrentChat={(chat) => {
        setCurrentChat(chat);
        getCurrentChat(chat.roomId);
      }} addChat={(chatName) => addChat(chatName)} currentChat={currentChat} logOut={() => logOut()} chats={chats} />
      <CurrentChat currentChat={currentChat} socket={socket} room={currentChat} />
    </div>
  )
}
MainPage.propTypes = {
  logOut: PropTypes.func,
  socket: PropTypes.object,
  getCurrentChat: PropTypes.func,
  chats: PropTypes.array,
  addChat: PropTypes.func
}
export default MainPage