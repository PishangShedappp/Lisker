"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams  } from 'next/navigation';
import { BsCheck2Circle } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import './Action.css';
import firebase from '../../../../firebase/firebaseClient';
import AuthButton from '@/components/auth_comp/AuthButton';
import AuthError from '@/components/auth_comp/auth_error/AuthError';

function Action() {
    const router = useRouter();

    const [VSuccess, setVSuccess] = useState(false);
    const [VError, setVError] = useState("");
    const [rPInterface, setRPInterface] = useState(false);
    const [rPassword, setRPassword] = useState("");
    const [rPSuccess, setRPSuccess] = useState(false);
    const [rpError, setRPError] = useState(false);
    const [rpErrorMessage, setRPErrorMessage] = useState("")
    const [rpStatusInterface, setRPStatusInterface] = useState(false)

    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    const searchParams = useSearchParams();
    const actionMode = searchParams.get('mode');
    const oobCode = searchParams.get('oobCode');
    const actionCode: string = oobCode as string;
    const apiKey = searchParams.get('apiKey');
    const rpStatus = searchParams.get('rpStatus');

    function mainAction() {
        if (actionMode === 'verifyEmail') {
            verify();
        }
        if (actionMode === 'resetPassword') {
            reset();
        }
        if (!actionMode) {
            setRPInterface(false)
        }
        if (rpStatus === 'success') {
            setRPStatusInterface(true)
        }
    }

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

    function reset() {
        setRPInterface(true)
    }

    async function srButtonHandler() {
        if (password !== cPassword) {
            setRPErrorMessage("Confirm password not match");
            setRPError(true);
        }
        else {
            setRPError(false);
            firebase.auth().verifyPasswordResetCode(actionCode).then((email) => {
                firebase.auth().confirmPasswordReset(actionCode, password).then((resp) => {
                    router.push('/auth/action?rpStatus=success')
                })
                .catch((error) => {
                    var errorCode = error.code;
                    console.log(errorCode)
                    if (errorCode === 'auth/weak-password') {
                        setRPErrorMessage('Password is to weak');
                        setRPError(true);
                    }
                })
            })
            .catch((error) => {
                setRPErrorMessage('Invalid or expired action code.');
                setRPError(true)
            })
        }
    }

    useEffect(() => {
        mainAction();
        document.title = "Lisker - Action";
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
            {rPInterface === false ?
                <div className='hidden'></div>
            :
                <div className="container forms">
                    <div className="form login">
                        <div className="form-content">
                            <header><span>Reset</span> Password</header>

                            {rpError === false ?
                                <div className='hidden'></div>
                            :
                                <AuthError content={rpErrorMessage}/>
                            }

                            <form action="">
                                <div className="pfield pinput-field">
                                    <input type="password" placeholder='New Password' onChange={(e) => setPassword(e.target.value)}/>
                                </div>

                                <div className="pfield pinput-field">
                                    <input type="password" placeholder='Confirm New Password' onChange={(e) => setCPassword(e.target.value)}/>
                                </div>

                                <div className="srbutton" onClick={srButtonHandler}>
                                    <AuthButton content='Reset Password'/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {rpStatusInterface === false ?
                <div className="hidden"></div>
            :
                <div className='verified-container'>
                    <div className='box verification'>
                        <div className="box-content">
                            <div className='verified-icon'>
                                <BsCheck2Circle size={64}/>
                            </div>

                            <div className="verified-header">
                                <header>Password Changed</header>
                            </div>

                            <div className='line'></div>

                            <div className='verified-desc'>
                                <p>You have changed your password.</p>
                                <p>You can now continue to login</p>

                                <Link href='/auth/login'>
                                    <AuthButton content='Continue Login'/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Action