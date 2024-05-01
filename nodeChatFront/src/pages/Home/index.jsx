import './index.sass';
import AuthPage from '../../components/Auth/AuthPage'
import { useEffect, useState } from 'react';
import AuthorizationServices from '../../services/authorization.services';

export default function Home() {

  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    if (jwtToken) {
      localStorage.setItem('jwtToken', jwtToken);
      const name = AuthorizationServices.checkTokenValidation(jwtToken);
      if (name) {
        window.location.replace('/Chat');
      }
    }
  }, [jwtToken]);


  return (<>
    {
      <AuthPage setJwtToken={token => setJwtToken(token)} />
    }
  </>)

}
