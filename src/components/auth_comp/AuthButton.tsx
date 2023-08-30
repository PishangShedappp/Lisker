import React from 'react'
import "./AuthButton.css";

function AuthButton({ content }: { content: string }) {
  return (
    <div className='AuthField AuthButton-Field'>
        <div className='button'>
          <span>{content}</span>
        </div>
    </div>
  )
}

export default AuthButton