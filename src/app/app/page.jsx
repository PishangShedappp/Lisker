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
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      window.localStorage.clear();
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
      </div>
      {/* CONTENT END */}
    </div>
  )
}


export default App