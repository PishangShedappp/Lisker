"use client"

import React, {useEffect, useRef, useState} from 'react';
import { BiHomeAlt2, BiNotepad, BiCheckCircle, BiStar, BiUpload } from 'react-icons/bi';
import { BsGear, BsMoonStars, BsSun } from 'react-icons/bs';
import { LuLogOut } from 'react-icons/lu';
import {IoLogoGithub} from 'react-icons/io';
import {IoPersonRemoveSharp} from 'react-icons/io5'
import {AiOutlineMenu, AiOutlineUser, AiFillCreditCard} from 'react-icons/ai';
import {MdClose} from 'react-icons/md'
import {FaLock} from 'react-icons/fa'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../../../../firebase/firebaseClient';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';

import './password.css';
import Link from 'next/link';

function Password() {
    const [ user ] = useAuthState(firebase.default.auth());
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const [mMode, setMMode] = useState(false);

    const [profile, setProfile] = useState("");
    const [cPassword, setCPassword] = useState("")
    const [nPassword, setNPassword] = useState("")
    const [vPassword, setVPassword] = useState("")

    const [getUid, setGetUid] = useState("")

    // REF for upload profile picture input
    const uploadFileRef = useRef(null);
    
    var fData = firebase.firestore().collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setProfile(doc.data().photoUrl)
        });
    });

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(sUser) {
            if (sUser) {
                return;
            } else {
                router.push('/auth/login')
            }
        })
        if (user?.emailVerified === false) {
            firebase.auth().signOut()
            router.push('/auth/login')
        }
        setGetUid(JSON.parse(localStorage.getItem('uid')))
        document.title = "Lisker - Settings";
    })

    const menuHandler = () => {
        if (mMode === false) {
        setMMode(true);
        }
        if (mMode === true) {
        setMMode(false);
        }
    }

    const logoutHandler = () => {
        firebase.auth().signOut();
        if (window) {
            localStorage.clear();
        }
        router.push('/auth/login')
    }

    /* Need some update on saveSettingHandler to work with password from username */
    const saveSettingHandler = () => {
        /**if (!userName) {
            toast.error(`Input must be filled`, {
                duration: 3000,
                position: 'bottom-center'
            })
            return;
        } else {
            firebase.firestore().collection("users").doc(getUid).update({
                name: userName
            })
            localStorage.setItem("name", JSON.stringify(userName))
            toast.success(`Change saved successfully`, {
                duration: 3000,
                position: 'bottom-center'
            })
        }**/
        if (nPassword !== vPassword) {
            toast.error("New password not match", {
                duration: 3000,
                position: 'bottom-center'
            })
        }
    }

    return (
        <div className="body">
        {/* SIDEBAR START */}
            <div className={mMode === false ? 'sidebar hide' : 'sidebar'}>
                <Link href='/app' className='brand'>
                    <IoLogoGithub />
                    <span className='text'>Lisker</span>
                </Link>

                <ul className='side-menu top'>
                    <li className=''>
                        <Link href="/app">
                            <BiHomeAlt2 />
                            <span className='text'>Home</span>
                        </Link>
                    </li>

                    <li>
                        <a href="#">
                            <BiCheckCircle />
                            <span className='text'>Tasks</span>
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <BiNotepad />
                            <span className="text">Notes</span>
                        </a>
                    </li>

                    <li>
                        <a href="">
                            <BiStar />
                            <span className="text">Starred</span>
                        </a>
                    </li>
                    </ul>

                    <ul className="side-menu bottom">
                    <li>
                        <Link href="/settings">
                            <BsGear />
                            <span className="text">Settings</span>
                        </Link>
                    </li>

                    <li>
                        <div className='logout' onClick={logoutHandler}>
                            <span>
                                <LuLogOut />
                                <span className='text'>Logout</span>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            {/* SIDEBAR END */}

            {mMode === true ?
                <div className='dump' onClick={menuHandler}>
                </div>
            :
                <div className='hidden'>
                </div>
            }

            {/* CONTENT START */}
            <div className='content'>
                {/* NAVBAR START */}
                <nav className='navbar'>
                    {mMode === false ?
                        <AiOutlineMenu onClick={menuHandler}/>
                    :
                        <MdClose onClick={menuHandler} size={22}/>
                    }
                    <Link href='/profile' className='profile'>
                        {profile == null ?
                        <img src='/profile.jpg'/>
                        :
                        <img src={profile}/>
                        }
                    </Link>
                </nav>
                {/* NAVBAR END */}

                {/* MAIN BODY START */}
                <main>
                    {/* HEADER START */}
                    <div className='header'>
                        <h1>Settings</h1>
                    </div>
                    {/* HEADER END */}
                    {/* SETTINGS OPTION START */}
                    <div className='option-container'>
                        <div className='left-option'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div className='option'>
                                        <Link href="/settings" className='nav-item'>
                                            <AiOutlineUser size={24}/>
                                            Account
                                        </Link>
                                        <Link href="/settings/password" className='nav-item active'>
                                            <FaLock size={24}/>
                                            Password
                                        </Link>
                                        <Link href="#" className='nav-item'>
                                            <BsGear size={24}/>
                                            Preferences
                                        </Link>
                                        <Link href="#" className='nav-item'>
                                            <AiFillCreditCard size={24}/>
                                            Billing
                                        </Link>
                                        <Link href="#" className='nav-item'>
                                            <IoPersonRemoveSharp size={24}/>
                                            Delete Account
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-option">
                            <div className="card">
                                <div className="card-body">
                                    <div className="tab-pane">
                                        <h6>Profile Information</h6>
                                        <hr />

                                        <form action="">
                                            <div className='profile-body'>
                                                <div className="left-profile-col">
                                                    <div className="form-profile-group">
                                                        <label htmlFor="inputCurrentPassword">Current Password</label>
                                                        <input type="text" className='form-control' id='inputCurrentPassword' onChange={(e) => setCPassword(e.target.value)}/>
                                                        <Link href='/auth/password_reset'>
                                                            <p className='reset-link'>Forgot Password?</p>
                                                        </Link>
                                                    </div>
                                                    <div className="form-profile-group">
                                                        <label htmlFor="inputNewPassword">New Password</label>
                                                        <input type="password" className='form-control' id='inputNewPassword' onChange={(e) => setNPassword(e.target.value)}/>
                                                    </div>
                                                    <div className="form-profile-group">
                                                        <label htmlFor="inputVerifyPassword">Verify Password</label>
                                                        <input type="password" className='form-control' id='inputVerifyPassword' onChange={(e) => setVPassword(e.target.value)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type='button' className='save-button' onClick={saveSettingHandler}>Save Changes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* SETTINGS OPTION END */}
                </main>
                {/* MAIN BODY END */}
            </div>
        {/* CONTENT END */}
        </div>
    )
}

export default Password