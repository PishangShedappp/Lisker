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
import firebase from '../../../firebase/firebaseClient';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import toast from 'react-hot-toast';

import './settings.css';
import Link from 'next/link';

function Settings() {
    const [ user ] = useAuthState(firebase.default.auth());
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const [mMode, setMMode] = useState(false);

    const [profile, setProfile] = useState("");
    const [fUsername, setFUsername] = useState("");

    const [userName, setUsername] = useState("");

    const [getUid, setGetUid] = useState("")
    const [getEmail, setGetEmail] = useState("")
    const [getProfilePic, setGetProfilePic] = useState("")
    const [selectedProfile, setSelectedProfile] = useState("");

    // REF for upload profile picture input
    const uploadFileRef = useRef(null);
    
    var fData = firebase.firestore().collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setProfile(doc.data().photoUrl)
            setFUsername(doc.data().name)
            setUsername(doc.data().name)
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
        setGetEmail(JSON.parse(localStorage.getItem('email')));
        setGetProfilePic(JSON.parse(localStorage.getItem('profilePic')));
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

    async function saveProfilePicture() {
        if (selectedProfile) {
            const strRef = firebase.storage().ref();
            const uploadTask = strRef.child(`profile/${selectedProfile.name}`).put(selectedProfile);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, 
                (error) => {
                    // Handle unsuccessful uploads
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        firebase.firestore().collection("users").doc(getUid).update({
                            photoUrl: downloadURL
                        })
                    });
                    router.refresh();
                }
            );
        }
        if (!selectedProfile) {
            console.log("Returned")
            return;
        }
    }

    const saveSettingHandler = () => {
        if (!userName || userName == null || userName == "") {
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
            saveProfilePicture();
            toast.success(`Change saved successfully`, {
                duration: 3000,
                position: 'bottom-center'
            })
        }
    }

    const uploadClick = () => {
        uploadFileRef.current.click();
    }

    const profileChanged = (e) => {
        const fileObj = e.target.files[0];
        if (!fileObj) {
            return;
        }

        setSelectedProfile(e.target.files[0])
    }

    let pImage
    if (selectedProfile) {
        pImage = <img src={URL.createObjectURL(selectedProfile)}/>
    }
    if (!selectedProfile) {
        if (profile === null) {
            pImage = <img src='/profile.jpg'/>
        }
        if (profile !== null) {
            pImage = <img src={profile}/>
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
                                        <Link href="/settings" className='nav-item active'>
                                            <AiOutlineUser size={24}/>
                                            Account
                                        </Link>
                                        <Link href="/settings/password" className='nav-item'>
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
                                                        <label htmlFor="inputName">Username</label>
                                                        <input type="text" className='form-control' id='inputName' placeholder='Username' defaultValue={fUsername} onChange={(e) => setUsername(e.target.value)}/>
                                                    </div>
                                                    <div className="form-profile-group">
                                                        <label htmlFor="inputEmail">Email</label>
                                                        <input type="email" className='form-control' id='inputEmail' disabled="true" value={getEmail}/>
                                                        <p>We disabled email changing for security reason</p>
                                                    </div>
                                                </div>
                                                <div className="right-profile-col">
                                                    <div className='pp-group text-center'>
                                                        {pImage}
                                                        <div className='upload-pp' onClick={uploadClick}>
                                                            <span>
                                                                <input type="file" style={{ display: 'none' }} ref={uploadFileRef} onChange={profileChanged} accept="image/png, image/jpeg"/>
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