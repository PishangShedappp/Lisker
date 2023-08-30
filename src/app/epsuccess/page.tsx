"use client"

import React from 'react'
import AuthButton from '@/components/auth_comp/AuthButton';
import './epsuccess.css';

function EpSuccess() {
    return (
        <div>
            <p className='bg-credit'>Image by <a target='_blank' href="https://pixabay.com/users/davidrockdesign-2595351/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1789175">David</a> from <a target='_blank' href="https://pixabay.com">Pixabay</a></p>
            <div className='split-screen'>
                <div className="left">
                    <section className='copy'>
                        <h1>Enter username</h1>
                        <p>We just need to know some basic information</p>
                    </section>
                </div>
                <div className="right">
                    <form action="">
                        <section className="copy">
                            <h2>Setting Up</h2>
                        </section>

                        <div className='input-container uname'>
                            <label htmlFor="uname">Username</label>
                            <input type="text" id='uname' name='uname'/>
                        </div>
                        <AuthButton content='next'/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EpSuccess