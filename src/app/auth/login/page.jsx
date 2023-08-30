"use client"

import React, { useEffect, useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation'

import AuthButton from '@/components/auth_comp/AuthButton';
import './Login.css'
import firebase from '../../../../firebase/firebaseClient';
import AuthError from '@/components/auth_comp/auth_error/AuthError';

function Login() {
    const [ user ] = useAuthState(firebase.auth())
    const router = useRouter()

    const [lEmail, setLEmail] = useState("");
    const [lPassword, setLPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password")
    const [show, setShow] = useState(false);

    const [vError, setVError] = useState(false);
    const [eMessage, setEMessage] = useState("")

    const eyeHandler = () => {
        if (show === true) {
            setPasswordType("password");
            setShow(false);
        } if (show === false) {
            setPasswordType("text");
            setShow(true)
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/app')
        }
        if (user?.emailVerified === true) {
            router.push('/app')
        }
    }, [])

    async function loginButton() {
        return await firebase
            .auth()
            .signInWithEmailAndPassword(lEmail, lPassword)
                .then((userCredential) => {
                    if (userCredential.user?.emailVerified === false) {
                        setEMessage("Please verify your email before login");
                        setVError(true);
                    } else {
                        console.log(userCredential.user?.uid)
                        firebase.firestore().collection("users").doc(userCredential.user?.uid).update({
                            verified: true,
                        })
                        console.log("Success");
                        setVError(false)
                        router.push('/app')
                    }
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)
                    if (errorCode === "auth/user-not-found") {
                        setEMessage(`${lEmail} not found`);
                        setVError(true);
                    }
                    if (errorCode === "auth/invalid-email") {
                        setEMessage("The email address is badly formatted.");
                        setVError(true);
                    }
                    if (errorCode === "auth/wrong-password") {
                        setEMessage("The password is invalid");
                        setVError(true)
                    }
                });
    }

    const handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            loginButton();
        }
    }

    return (
        <div className='container forms'>
            <div className="form login">
                <div className='form-content'>
                    <header><span>Tasker</span> Login</header>

                    {vError === false?
                        <div className='hidden'></div>
                        :
                        <AuthError content={eMessage}/>
                    }

                    <form action="">
                        <div className="lfield linput-field">
                            <input type="email" placeholder='Email' onChange={(e) => setLEmail(e.target.value)} onKeyDown={handleKeyDown}/>
                        </div>

                        <div className='lfield linput-field'>
                            <input type={passwordType} placeholder='Password' onChange={(e) => setLPassword(e.target.value)} onKeyDown={handleKeyDown}/>
                            {show === true ? <AiOutlineEye className='eye-icon' onClick={eyeHandler}/> : <AiOutlineEyeInvisible onClick={eyeHandler} className='eye-icon'/>}
                        </div>

                        <div className='authform-link'>
                            <Link href="/auth/password_reset" className='forgot-pass'>Forgot Password?</Link>
                        </div>

                        <div onClick={loginButton}>
                            <AuthButton content="Login"/>
                        </div>
                    </form>

                    <div className='authform-link'>
                        <span>Don`&apos;`t have an account? <Link href="/auth/register" className="signup-link">Sign Up</Link></span>
                    </div>

                    <div className='line'></div>

                    <div className="media-options">
                        <a href="" className="lfield facebook">
                            <BsFacebook className="facebook-icon" size={22} />
                            <span>Login with Facebook</span>
                        </a>
                        <a href="" className="lfield google">
                            <FcGoogle className='google-icon' size={22} />
                            <span>Login with Google</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login