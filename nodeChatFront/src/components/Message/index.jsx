import PropTypes from 'prop-types';
import './index.sass'
import { useEffect, useState } from 'react';
function Message(props) {
  const { message } = props;
  const [name, setName] = useState('');
  useEffect(() => {
    setName(localStorage.getItem('name'))
  }, [])

  return (
    <div className={name === message.author.name ? "message ps-3 pe-4 p-2 bg-1 mt-2 mb-2 text-light myMessage" : "message ps-3 pe-4 p-2 otherMessage bg-2 mt-3 text-light"}>
      <div className="main d-flex flex-column">
        <span className='fw-bold'>{message.author.name}</span>
        <div className="second mt-1 mb-3">
          <span>{message.message}</span>
        </div>
        <span className='date'>{message.date}</span>
      </div>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.object
}

export default Message