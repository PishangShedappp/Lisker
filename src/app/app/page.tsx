"use client"

import React, {useEffect, useState} from 'react';
import { BiHomeAlt2, BiNotepad, BiCheckCircle, BiStar } from 'react-icons/bi';
import { BsGear, BsMoonStars, BsSun } from 'react-icons/bs';
import { LuLogOut } from 'react-icons/lu';
import { IoMenu } from 'react-icons/io5';
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../../../firebase/firebaseClient';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import './app.css';
import Link from 'next/link';

function App() {
    const [ user ] = useAuthState(firebase.auth())
    const router = useRouter();
    const { theme, setTheme } = useTheme()

    const [profile, setProfile] = useState("")
  
    var fData = firebase.firestore().collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => [
        setProfile(doc.data().photoUrl)
      ]);
    });

    useEffect(() => {
        if (user?.emailVerified === false) {
            firebase.auth().signOut()
            router.push('/auth/login')
        }
    })

    const themeHandler = () => {
      if (theme === "light") {
        setTheme("dark")
        console.log(theme)
      } else {
        setTheme("light")
        console.log(theme)
      }
    }

    const logoutHandler = () => {
      firebase.auth().signOut()
      router.push('/auth/login')
    }

  return (
    <div className='body'>
      {/* Sidebar Start */}
      <div className='sidebar'>
        <Link href='/app' className='logo'>
          <span className='text'>Lisker</span>
        </Link>

        <ul className='side-menu'>
          <li className='active'>
            <a href="#">
              <BiHomeAlt2 />
              Home
            </a>
          </li>

          <li>
            <a href="#">
              <BiCheckCircle />
              Tasks
            </a>
          </li>

          <li>
            <a href="#">
              <BiNotepad />
              Notes
            </a>
          </li>

          <li>
            <a href="#">
              <BiStar />
              Starred
            </a>
          </li>
        </ul>

        <ul className="side-menu bottom">
          <li>
            <a href="#">
              <BsGear />
              Settings
            </a>
          </li>

          <li>
            <div className='logout' onClick={logoutHandler}>
              <span>
                <LuLogOut />
                Logout
              </span>
            </div>
          </li>
        </ul>
      </div>
      {/* Sidebar End */}

      {/* Content Section Start*/}
      <div className='content'>
        {/* Navbar Start */}
        <nav>
          <IoMenu className="menu"/>
          {theme === "dark" ?
            <BsSun onClick={themeHandler}/>
          :
            <BsMoonStars onClick={themeHandler}/>
          }
          <a href="#" className='profile'>
            {profile == null ?
              <img src='https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'/>
            :
              <img src={profile}/>
            }
          </a>
        </nav>
        {/* Navbar End */}
      </div>
      {/* Content Section End*/}
    </div>
  )
}

export default App