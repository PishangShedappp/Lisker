"use client"

import React, { useEffect, useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation'

import AuthButton from '@/components/auth_comp/AuthButton';
import './Login.css'
import firebase from '../../../../firebase/firebaseClient';
import AuthError from '@/components/auth_comp/auth_error/AuthError';
import AuthSuccess from '@/components/auth_comp/auth_success/AuthSuccess';

function Login() {
    const [ user ] = useAuthState(firebase.auth())
    const router = useRouter()

    const [lEmail, setLEmail] = useState("");
    const [lPassword, setLPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password")
    const [show, setShow] = useState(false);

    const [vError, setVError] = useState(false);
    const [eMessage, setEMessage] = useState("");

    const [vEmailError, setVEmailError] = useState(false);

    const [name, setName] = useState("")
    const [getName, setGetName] = useState("")

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(sUser) {
            if (user?.emailVerified === true) {
                router.push('/app')
                return;
            }
            if (sUser) {
                return;
            } else {
                router.push('/auth/login')
            }
        })
        if (user?.emailVerified === true) {
            router.push('/app')
            return;
        }
        document.title = "Lisker - Login";
    }, [])

    const eyeHandler = () => {
        if (show === true) {
            setPasswordType("password");
            setShow(false);
        } if (show === false) {
            setPasswordType("text");
            setShow(true)
        }
    }

    async function loginButton() {
        return await firebase
            .auth()
            .signInWithEmailAndPassword(lEmail, lPassword)
                .then((userCredential) => {
                    if (userCredential.user?.emailVerified === false) {
                        setEMessage("Please verify your email before login");
                        setVError(true);
                    } else {
                        firebase.firestore().collection("users").doc(userCredential.user?.uid).update({
                            verified: true,
                        })
                        console.log(userCredential.user.displayName)
                        if (window) {
                            localStorage.setItem("uid", JSON.stringify(userCredential.user.uid))
                            localStorage.setItem("email", JSON.stringify(userCredential.user.email))
                            localStorage.setItem("name", JSON.stringify(userCredential.user.displayName))
                            localStorage.setItem("profilePic", JSON.stringify(userCredential.user.photoURL))
                        }
                        router.push('/app')
                        setVError(false)
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

    async function githubButton() {
        return await firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
                .then((userCredential) => {
                    if (userCredential.additionalUserInfo.isNewUser === true) {
                        firebase.firestore().collection("users").doc(userCredential.user.uid).set({
                            uid: userCredential.user.uid,
                            verified: userCredential.user.emailVerified,
                            email: userCredential.user.email,
                            name: userCredential.user.displayName,
                            provider: userCredential.user.providerData[0].providerId,
                            photoUrl: userCredential.user.photoURL
                        })
                        firebase.firestore().collection("plans").doc(userCredential.user.uid).set({
                            uid: userCredential.user.uid,
                            plans: "1",
                            dAt: Date().toLocaleString()
                        })
                    }
                    if (userCredential.user.emailVerified === false) {
                        firebase.auth().currentUser.sendEmailVerification();
                        setEMessage("Please verify your email before login");
                        setVEmailError(true)
                        setVError(true);
                    }
                    else {
                        firebase.firestore().collection("users").doc(userCredential.user.uid).update({
                            verified: true,
                        })
                        if (window) {
                            localStorage.setItem("uid", JSON.stringify(userCredential.user.uid))
                            localStorage.setItem("email", JSON.stringify(userCredential.user.email))
                            localStorage.setItem("name", JSON.stringify(userCredential.user.displayName))
                            localStorage.setItem("profilePic", JSON.stringify(userCredential.user.photoURL))
                        }
                        router.push('/app')
                    }
                })
                .catch((error) => {
                    var errorCode = error.code;
                    console.log(errorCode)
                    if (errorCode === 'auth/account-exists-with-different-credential') {
                        setEMessage("Account exists with different login methods")
                        setVError(true)
                    }
                })
    }

    async function googleButton() {
        return await firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then((userCredential) => {
                    if (userCredential.additionalUserInfo.isNewUser === true) {
                        firebase.firestore().collection("users").doc(userCredential.user.uid).set({
                            uid: userCredential.user.uid,
                            verified: userCredential.user.emailVerified,
                            email: userCredential.user.email,
                            name: userCredential.user.displayName,
                            provider: userCredential.user.providerData[0].providerId,
                            photoUrl: userCredential.user.photoURL
                        })
                        firebase.firestore().collection("plans").doc(userCredential.user?.uid).set({
                            uid: userCredential.user?.uid,
                            plans: "1",
                            dAt: Date().toLocaleString()
                        })
                    }
                    if (window) {
                        localStorage.setItem("uid", JSON.stringify(userCredential.user.uid))
                        localStorage.setItem("email", JSON.stringify(userCredential.user.email))
                        localStorage.setItem("name", JSON.stringify(userCredential.user.displayName))
                        localStorage.setItem("profilePic", JSON.stringify(userCredential.user.photoURL))
                    }
                    router.push('/app')
                })
                .catch((error) => {
                    var errorCode = error.code;
                    console.log(errorCode)
                })
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

                    {vEmailError === false?
                        <div className='hidden'></div>
                    :
                        <AuthSuccess content='We have sent you verification email'/>
                    }

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
                        <span>Don&apos;t have an account? <Link href="/auth/register" className="signup-link">Sign Up</Link></span>
                    </div>

                    <div className='line'></div>

                    <div className="media-options">
                        <a className="lfield github" onClick={githubButton}>
                            <BsGithub className="github-icon" size={22} />
                            <span>Login with GitHub</span>
                        </a>
                        <a className="lfield google" onClick={googleButton}>
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