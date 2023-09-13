"use client"

import React, { useState } from 'react';
import Link from 'next/link';

import './ResetPassword.css';
import firebase from '../../../../firebase/firebaseClient';
import AuthButton from '@/components/auth_comp/AuthButton';
import AuthSuccess from '@/components/auth_comp/auth_success/AuthSuccess';
import AuthError from '@/components/auth_comp/auth_error/AuthError';

function FPassword() {
  const [rEmail, setREmail] = useState("");
  const [sBool, setSBool] = useState(false);
  const [vError, setVError] = useState(false);
  const [eMessage, setEMessage] = useState("");

  async function rPasswordButton() {
    return await firebase
      .auth().fetchSignInMethodsForEmail(rEmail)
        .then((credential) => {
          if (credential[0] !== 'password') {
            setEMessage("This email use different method for login");
            setVError(true);
          }
          else {
            firebase.auth().sendPasswordResetEmail(rEmail);
            setREmail("");
            setSBool(true);
            setVError(false);
          }
        })
        .catch((error) => {
          var errorCode = error.code;
          console.log(errorCode);
          if (errorCode === 'auth/invalid-email') {
            setEMessage('The email address is badly formatted');
            setVError(true);
            setSBool(false);
          }
        })
  }

  const handleKeyDown = (event) => {
    if (event.key == 'Enter') {
      console.log('Enter key clicked')
    }
  }

  return (
    <div className='container forms'>
      <div className="form login">
        <div className="form-content">
          <header><span>Forgot</span> Password</header>

          {sBool === false ?
            <div className='hidden'></div>
          :
            <AuthSuccess content='Reset password link sent'/>
          }

          {vError === false ?
            <div className='hidden'></div>
          :
            <AuthError content={eMessage}/>
          }

          <form action="">
            <div className="rfield rinput-field">
              <input type="email" placeholder='Email' onChange={(e) => setREmail(e.target.value)} onKeyDown={handleKeyDown}/>
            </div>

            <div className='rbutton' onClick={rPasswordButton}>
              <AuthButton content="Reset Password"/>
            </div>

            <div className='authform-link'>
              <span>Go to <Link href='/auth/login' className='gtLogin-link'>Login</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FPassword