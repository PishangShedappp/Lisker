import React from 'react';
import './AuthSuccess.css';

function AuthSuccess({ content}: {content: string}) {
  return (
    <div className='AuthField AuthSuccess'>
        <div className='aSuccess'>
            <span>{content}</span>
        </div>
    </div>
  )
}

export default AuthSuccess