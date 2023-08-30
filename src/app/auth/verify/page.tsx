"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams  } from 'next/navigation';
import firebase from '../../../../firebase/firebaseClient';
import { BsCheck2Circle } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';

import './Verify.css'
import AuthButton from '@/components/auth_comp/AuthButton';
import Link from 'next/link';

function Verify() {
    const [VSuccess, setVSuccess] = useState(false)
    const [VError, setVError] = useState("")

    const searchParams = useSearchParams();
    const oobCode = searchParams.get('oobCode')
    const actionCode: string = oobCode as string;
    const apiKey = searchParams.get('apiKey')

    async function verify() {
        return await firebase
            .auth()
            .applyActionCode(actionCode).then((resp) => {
                setVSuccess(true);
            })
            .catch((error) => {
                const errorCode = error.code
                setVError(errorCode)
            });
    }

    useEffect(() => {
        verify();
    }), [];

    return (
        <div>
            {VSuccess === false ? 
                <div className='hidden'>
                </div>
                :
                <div className='verified-container'>
                    <div className='box verification'>
                        <div className="box-content">
                            <div className="verified-icon">
                                <BsCheck2Circle size={64}/>
                            </div>

                            <div className="verified-header">
                                <header>Your email has been confirmed</header>
                            </div>

                            <div className='line'></div>

                            <div className="verified-desc">
                                <p>Thank you for validating your email address.</p>
                                <p>You can now continue to login</p>

                                <Link href='/auth/login'>
                                    <AuthButton content='Continue Login'/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {!VError ?
                <div className='hidden'>
                </div>
                :
                <div className='verified-container'>
                    <div className="box verification">
                        <div className="box-content">
                            <div className="error-icon">
                                <BiErrorCircle size={64}/>
                            </div>

                            <div className="error-header">
                                <header>Your email verification failed</header>
                            </div>

                            <div className="line"></div>
                            
                            <div className="error-desc">
                                <p>{VError}</p>

                                <Link href='/auth/register'>
                                    <AuthButton content='Continue register' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Verify