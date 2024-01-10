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
          <div className="dashboard_cardBox">
            <div className="dashboard_card">
              <div>
                <div className="dashboard_numbers">1,504</div>
                <div className="dashboard_cardName">Daily Views</div>
              </div>
              <div className="dashboard_icon"></div>
            </div>

            <div className="dashboard_card">
              <div>
                <div className="dashboard_numbers">80</div>
                <div className="dashboard_cardName">Sales</div>
              </div>
              <div className="dashboard_icon"></div>
            </div>

            <div className="dashboard_card">
              <div>
                <div className="dashboard_numbers">284</div>
                <div className="dashboard_cardName">Comments</div>
              </div>
              <div className="dashboard_icon"></div>
            </div>

            <div className="dashboard_card">
              <div>
                <div className="dashboard_numbers">$7,842</div>
                <div className="dashboard_cardName">Earning</div>
              </div>
              <div className="dashboard_icon"></div>
            </div>
          </div>

          <div className="dashboard_details">
            <div className="dashboard_recentFiles">
              <div className="dashboard_cardHeader">
                <h2>Recent Files</h2>
                <a href="" className='va_btn'>View All</a>
              </div>

              <table>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Payment</td>
                    <td>Status</td>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Star Refrigerator</td>
                    <td>$1200</td>
                    <td>Paid</td>
                    <td><span className='d_status delivered'>Delivered</span></td>
                  </tr>

                  <tr>
                    <td>Dell Laptop</td>
                    <td>$110</td>
                    <td>Due</td>
                    <td><span className="d_status pendiing"></span></td>
                  </tr>

                  <tr>
                    <td>Apple Watch</td>
                    <td>$1200</td>
                    <td>Paid</td>
                    <td><span className="d_status return">Return</span></td>
                  </tr>

                  <tr>
                    <td>Adidas Shoes</td>
                    <td>$629</td>
                    <td>Due</td>
                    <td><span className="d_status inProgress">In Progress</span></td>
                  </tr>   
                </tbody>
              </table>
            </div>

            <div className='d_recentCustomers'>
              <div className="cardheader">
                <h2>Recent Customers</h2>
              </div>

              <table>
                <tr>
                  <td width="60px">
                    <div className="imgBx"><img src="" alt="" /></div>
                  </td>
                  <td><h4>Akmal <br /> <span>Malaysia</span></h4></td>
                </tr>
              </table>
            </div>
          </div>
        </main>
        {/* MAIN BODY END */}
      </div>
      {/* CONTENT END */}
    </div>
  )
}


export default App