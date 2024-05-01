import './index.sass';
import MainPage from '../../components/MainPage'
import { useEffect, useState } from 'react';
import AuthorizationServices from '../../services/authorization.services';
import io from 'socket.io-client';

const BACK_URL = 'http://localhost:4444'

const socket = io.connect(BACK_URL, {
  auth: getAuth(),
});
function getAuth() {
  const name = localStorage.getItem("name");
  const id = localStorage.getItem("id");
  if (name && id) {
    console.log({ name, id });
    return { name, id };
  } else {
    return {};
  }
}
export default function Home() {
  const [chats, setChats] = useState([]);


  const addChat = (chatName) => {
    if (chatName) {
      console.log(chatName);
      socket.emit("create_chat", { name: chatName, author: { name: localStorage.getItem("name"), id: localStorage.getItem("id") } });
    }
  }
  const logOut = () => {
    localStorage.clear();
    window.location.replace('/');
  }

  socket.on('updateRoomCount', () => {
    socket.emit('get_all_chats');
  });

  const getCurrentChat = (roomId) => {
    socket.emit('join_chat', roomId);
    socket.emit('check_online');
  }

  socket.on("receive_chats", (data) => {
    // console.log(data);
    setChats(data);
  });

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      AuthorizationServices
        .checkTokenValidation(token).then(() => {
          socket.emit('get_all_chats');
        })
        .catch(() => {
          localStorage.clear();
          logOut();
        });
    } else {
      logOut()
      console.log(11);
    }
  }, [])

  return (<>
    <MainPage
      logOut={() => logOut()}
      addChat={(chatName) => addChat(chatName)}
      chats={chats}
      getCurrentChat={(roomId) => getCurrentChat(roomId)}
      socket={socket}
    />
  </>)

}
