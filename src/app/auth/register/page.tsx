"use client"

import React, { useEffect, useState } from 'react'
import type { Metadata } from 'next'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import firebase from '../../../../firebase/firebaseClient';

import AuthButton from '@/components/auth_comp/AuthButton';
import './Register.css'
import AuthSuccess from '@/components/auth_comp/auth_success/AuthSuccess';
import AuthError from '@/components/auth_comp/auth_error/AuthError';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

function Login() {
    const user = firebase.auth()
    const router = useRouter();

    const [SEmail, setSEmail] = useState("");
    const [SPassword, setSPassword] = useState("");
    const [CPassword, setCPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password")
    const [show, setShow] = useState(false);

    const [sBool, setSBool] = useState(false);
    const [sMessage, setSMessage] = useState("")
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

    async function SUButton() {
        if (SPassword !== CPassword) {
            setEMessage("Confirm password not match")
            setSBool(false);
            setVError(true)
        } else {
            return await firebase
                .auth()
                .createUserWithEmailAndPassword(SEmail, SPassword)
                    .then((userCredential) => {
                        firebase.auth().currentUser?.sendEmailVerification()
                        firebase.firestore().collection("users").doc(userCredential.user?.uid).set({
                            uid: userCredential.user?.uid,
                            verified: userCredential.user?.emailVerified,
                            email: userCredential.user?.email,
                            name: userCredential.user?.displayName,
                            provider: userCredential.user?.providerData[0]?.providerId,
                            photoUrl: userCredential.user?.photoURL,
                        })
                        firebase.firestore().collection("plans").doc(userCredential.user?.uid).set({
                            uid: userCredential.user?.uid,
                            plans: "1",
                            dAt: Date().toLocaleString()
                        })
                        setSEmail("")
                        setSPassword("")
                        setCPassword("")
                        setSMessage("We have sent you verification email")
                        setVError(false)
                        setSBool(true)
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        console.log(errorCode)
                        if (errorCode === "auth/invalid-email") {
                            setEMessage("The email address is badly formatted.");
                            setSBool(false);
                            setVError(true);
                        }
                        if (errorCode === "auth/email-already-in-use") {
                            setEMessage("This email is already exist");
                            setSBool(false);
                            setVError(true);
                        }
                    })
        }
    }

    const handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            SUButton();
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/app')
        }
    }, [])

    return (
        <div className='container forms'>
            <div className="form login">
                <div className='form-content'>
                    <header><span>Tasker</span> Register</header>

                    {sBool === false ?
                        <div className='hidden'></div>
                        :
                        <AuthSuccess content={sMessage}/>
                    }

                    {vError === false ?
                        <div className='hidden'></div>
                        :
                        <AuthError content={eMessage}/>
                    }

                    <form action="">
                        <div className="lfield linput-field">
                            <input type="email" placeholder='Email' value={SEmail} onChange={(e) => setSEmail(e.target.value)} onKeyDown={handleKeyDown}/>
                        </div>

                        <div className='lfield linput-field'>
                            <input type={passwordType} placeholder='Password' value={SPassword} onChange={(e) => setSPassword(e.target.value)} onKeyDown={handleKeyDown}/>
                            {show === true ? <AiOutlineEye className='eye-icon' onClick={eyeHandler}/> : <AiOutlineEyeInvisible className='eye-icon' onClick={eyeHandler}/>}
                        </div>

                        <div className='lfield linput-field'>
                            <input type={passwordType} placeholder='Confirm Password' value={CPassword} onChange={(e) => setCPassword(e.target.value)} onKeyDown={handleKeyDown}/>
                        </div>

                        <div onClick={SUButton}>
                            <AuthButton content="Sign Up"/>
                        </div>
                    </form>

                    <div className='authform-link'>
                        <span>Already have an account? <Link href="/auth/login" className='login-link'>Login</Link></span>
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