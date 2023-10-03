"use client"

import React, {useEffect, useState} from 'react';
import { BiHomeAlt2, BiNotepad, BiCheckCircle, BiStar } from 'react-icons/bi';
import { BsGear, BsMoonStars, BsSun } from 'react-icons/bs';
import { LuLogOut } from 'react-icons/lu';
import {IoLogoGithub} from 'react-icons/io';
import {AiOutlineMenu} from 'react-icons/ai';
import {MdClose} from 'react-icons/md'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../../../firebase/firebaseClient';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import './app.css';
import Link from 'next/link';

function App() {
  const [ user ] = useAuthState(firebase.default.auth());
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [mMode, setMMode] = useState(false);

  const [getUid, setGetUid] = useState("");

  const [profile, setProfile] = useState("");
  const [dName, setDName] = useState();
  
  var pData = firebase.firestore().collection("users").get(getUid).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setProfile(doc.data().photoUrl)
    });
  });

  function nData() {
    firebase.firestore().collection("users").get(getUid).then((querySnapshot) => {
      if (!querySnapshot.docs[querySnapshot.docs.length-1].data().name) {
        router.push('/epsuccess?action=1')
      } else {
        return;
      }
    });
  }

  useEffect(() => {
    setGetUid(JSON.parse(localStorage.getItem('uid')));
    firebase.auth().onAuthStateChanged(function(sUser) {
      if (sUser) {
        return;
      } else {
        firebase.auth().signOut()
        if (window) {
          localStorage.clear();
        }
        router.push('/auth/login')
      }
    })
    if (user?.emailVerified === false) {
        firebase.auth().signOut()
        router.push('/auth/login')
    }
    nData()
    document.title = "Lisker - App";
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
    firebase.auth().signOut()
    if (window) {
      localStorage.clear();
    }
    router.push('/auth/login')
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
          <li className='active'>
            <a href="#">
              <BiHomeAlt2 />
              <span className='text'>Home</span>
            </a>
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
        <div className="dump" onClick={menuHandler}></div>
      :
        <div className="hidden"></div>
      }

      {/* CONTENT START */}
      <div className='content'>
        {/* NAVBAR START */}
        <nav>
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
          <div className='header'>
            <h1>Dashboard</h1>
          </div>
        </main>
        {/* MAIN BODY END */}
      </div>
      {/* CONTENT END */}
    </div>
  )
}


export default App