import './index.sass';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import AuthorizationServices from '../../../services/authorization.services';

// eslint-disable-next-line react/prop-types
function AuthPage({ setJwtToken }) {

  const [togglePages, setTogglePages] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registrationName, setRegistrationName] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [registrationConfirmPassword, setRegistrationConfirmPassword] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');

  const onSetTogglePages = () => {
    setTogglePages(!togglePages);
    clearInputs();
  }
  const onLogin = async () => {
    const jwtToken = await AuthorizationServices.login(loginEmail, loginPassword);
    if (jwtToken) {
      setJwtToken(jwtToken);
      clearInputs();
    }
  }
  const onRegistration = async () => {
    const response = await AuthorizationServices.registration(registrationEmail, registrationName, registrationPassword, registrationConfirmPassword);
    if (response === 'OK') {
      clearInputs();
      window.location.reload();
    }
  }

  const clearInputs = () => {
    setLoginPassword('');
    setLoginEmail('');
    setRegistrationEmail('');
    setRegistrationPassword('');
    setRegistrationConfirmPassword('');
    setRegistrationName('');
  }


  return (
    <div className="wrapper w-100 d-grid">
      <main>
        {togglePages ? <div className="loginPart w-100 h-100 d-flex flex-column justify-content-around align-items-center ps-5 pe-5 p-1">
          <span className='fw-bold fs-1'>Login</span>
          <div className="form w-100 d-flex flex-column justify-content-between align-items-center">
            <Input
              className='pb-2 mt-3'
              fullWidth={true}
              type='email'
              id="input-with-icon-adornment-email"
              placeholder='Type your email'
              startAdornment={
                <InputAdornment position="start" >
                  <EmailIcon />
                </InputAdornment>
              }
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              className='pb-2'
              fullWidth={true}
              id="input-with-icon-adornment-password"
              placeholder='Type your password'
              type="password"
              startAdornment={
                <InputAdornment position="start" >
                  <LockOutlinedIcon />
                </InputAdornment>
              }
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button className='w-100' style={{ borderRadius: '26px' }} size="lg" variant='solid' color="primary" onClick={onLogin}>
              Login
            </Button>
          </div>
          <button className='btn btn-link' style={{ color: "#6CA6E4", fontSize: "17px", textDecoration: 'none' }} onClick={onSetTogglePages}>Create new account</button>
        </div> : <div className="loginPart w-100 h-100 d-flex flex-column justify-content-around align-items-center ps-5 pe-5 p-1">
          <span className='fw-bold fs-1'>Registration</span>
          <div className="form w-100 d-flex flex-column justify-content-between align-items-center">
            <Input
              className='pb-2'
              fullWidth={true}
              type='email'
              id="input-with-icon-adornment-email"
              placeholder='Type your email'
              startAdornment={
                <InputAdornment position="start" >
                  <EmailIcon />
                </InputAdornment>
              }
              value={registrationEmail}
              onChange={(e) => setRegistrationEmail(e.target.value)}
            />
            <Input
              className='pb-2 mt-3'
              fullWidth={true}
              id="input-with-icon-adornment-name"
              placeholder='Type your name'
              startAdornment={
                <InputAdornment position="start" >
                  <PermIdentityOutlinedIcon />
                </InputAdornment>
              }
              value={registrationName}
              onChange={(e) => setRegistrationName(e.target.value)}
            />
            <Input
              className='pb-2 mt-3'
              fullWidth={true}
              id="input-with-icon-adornment-password-next"
              placeholder='Type your password'
              type="password"
              startAdornment={
                <InputAdornment position="start" >
                  <LockOutlinedIcon />
                </InputAdornment>
              }
              value={registrationPassword}
              onChange={(e) => setRegistrationPassword(e.target.value)}
            />
            <Input
              className='pb-2 mt-3'
              fullWidth={true}
              id="input-with-icon-adornment-password-confirm"
              placeholder='Confirm password'
              type="password"
              startAdornment={
                <InputAdornment position="start" >
                  <LockOutlinedIcon />
                </InputAdornment>
              }
              value={registrationConfirmPassword}
              onChange={(e) => setRegistrationConfirmPassword(e.target.value)}
            />
            <Button className='w-100 mt-5' style={{ borderRadius: '26px' }} size="lg" variant='solid' color="primary" onClick={onRegistration}>
              Registration
            </Button>
          </div>
          <button className='btn btn-link' style={{ color: "#6CA6E4", fontSize: "17px", textDecoration: 'none' }} onClick={onSetTogglePages}>Log In</button>
        </div>}
      </main>
    </div>
  )
}

export default AuthPage;