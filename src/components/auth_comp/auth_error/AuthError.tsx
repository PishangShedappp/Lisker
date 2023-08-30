import React from 'react';
import './AuthError.css';

function AuthError({ content}: {content: string}) {
  return (
    <div className='AuthField AuthError'>
        <div className='aError'>
            <span>{content}</span>
        </div>
    </div>
  )
}

export default AuthError