"use client"

import React, {useEffect, useState} from 'react';
import { BiHomeAlt2, BiNotepad, BiCheckCircle, BiStar, BiUpload } from 'react-icons/bi';
import { BsGear, BsMoonStars, BsSun } from 'react-icons/bs';
import { LuLogOut } from 'react-icons/lu';
import {IoLogoGithub} from 'react-icons/io';
import {IoPersonRemoveSharp} from 'react-icons/io5'
import {AiOutlineMenu, AiOutlineUser} from 'react-icons/ai';
import {MdClose} from 'react-icons/md'
import {FaLock} from 'react-icons/fa'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../../../firebase/firebaseClient';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import './settings.css';
import Link from 'next/link';

function Settings() {
    const [ user ] = useAuthState(firebase.default.auth());
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const [mMode, setMMode] = useState(false);

    const [profile, setProfile] = useState("");
    
    var fData = firebase.firestore().collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => [
        setProfile(doc.data().photoUrl)
        ]);
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
        document.title = "Lisker - Settings";
    })

    const themeHandler = () => {
        if (theme === "light") {
        setTheme("dark")
        } else {
        setTheme("light")
        }
    }

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
        const ISSERVER = typeof window === "undefined";
        if (process.browser) {
            window.localStorage.clear();
        }
        router.push('/auth/login')
    }

    const saveSettingHandler = () => {
        console.log("Updated")
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
                        <img src='https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'/>
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
                                        <a href="#" className='nav-item active'>
                                            <AiOutlineUser size={24}/>
                                            Account
                                        </a>
                                        <a href="#" className='nav-item'>
                                            <FaLock size={24}/>
                                            Password
                                        </a>
                                        <a href="#" className='nav-item'>
                                            <BsGear size={24}/>
                                            Preferences
                                        </a>
                                        <a href="#" className='nav-item'>
                                            <IoPersonRemoveSharp size={24}/>
                                            Delete Account
                                        </a>
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
                                                        <label htmlFor="inputName">Username</label>
                                                        <input type="text" className='form-control' id='inputName' placeholder='Username'/>
                                                    </div>
                                                    <div className="form-profile-group">
                                                        <label htmlFor="inputEmail">Email</label>
                                                        <input type="email" className='form-control' id='inputEmail' disabled="true" value={JSON.parse(localStorage.getItem('email'))}/>
                                                        <p>We disabled email changing for security reason</p>
                                                    </div>
                                                </div>
                                                <div className="right-profile-col">
                                                    <div className='pp-group text-center'>
                                                        {profile == null ?
                                                            <img src='/profile.jpg'/>
                                                        :
                                                            <img src={profile}/>
                                                        }
                                                        <div className='upload-pp'>
                                                            <span>
                                                                Upload
                                                            </span>
                                                        </div>
                                                        <small>For best result, use an image at least 128px by 128px.</small>
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

export default Settings