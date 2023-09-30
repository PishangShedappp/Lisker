"use client"

import react, {useEffect} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {MdOutlineAttachMoney} from 'react-icons/md';
import {FaUserGraduate} from 'react-icons/fa6';
import {FaFeatherAlt} from 'react-icons/fa';
import {BsFillShieldFill} from 'react-icons/bs';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './page.css'

export default function Page() {
  useEffect(() => {
    document.title = "Lisker";
    AOS.init();
    AOS.refresh();
  })

  return (
    <div className="body">
      {/* HEADER START */}
      <div className="header">
        <div className="header_container">
          <h1 className='logo'>
            <Link href='/'>Lisker</Link>
          </h1>
          <nav className='navbar'>
            <ul>
              <li>
                <Link href='/auth/login' className='login'>Log In</Link>
              </li>
            </ul>
            <AiOutlineMenu className='mobile-nav-toggle'/>
          </nav>
        </div>
      </div>
      {/* HEADER END */}
      {/* HERO START */}
      <div className='hero'>
        <div className="hero_container">
          <div className="hero_row">
            <div className="hero_left" data-aos='fade-up' data-aos-delay='200'>
              <h1>Simple Solutions For Your Work</h1>
              <h2>Lisker make it simple and easy with affordable price</h2>
              <div className="hero_left_button">
                <Link href='/auth/register'>Sign Up</Link>
              </div>
            </div>
            <div className="hero_right" data-aos='fade-up' data-aos-delay='200'>
              <img src='/undraw_Make_it_rain_re_w9pc.svg' alt="" className='ill'/>
            </div>
          </div>
        </div>
      </div>
      {/* HERO END */}
      {/* FEATURES START */}
      <div className="features">
        <div className="features_container">
          <div className='line_features' data-aos='zoom-out'></div>
          <div className="features_row">
            <div className="features_item_container" data-aos='zoom-out'>
              <div className="features_item">
                <MdOutlineAttachMoney className='features_icon'/>
                <h4>Affordable</h4>
                <p>It&apos;s suitable for anyone who want to save their money and limit some budget.</p>
              </div>
            </div>
            <div className="features_item_container" data-aos='zoom-out'>
              <div className="features_item">
                <FaUserGraduate className='features_icon'/>
                <h4>User Friendly</h4>
                <p>The UI is user friendly that means it&apos;s easy to learn for any age either young or old.</p>
              </div>
            </div>
            <div className="features_item_container" data-aos='zoom-out'>
              <div className="features_item">
                <BsFillShieldFill className='features_icon'/>
                <h4>Security</h4>
                <p>Secure your personal or group project notes from any other unauthorized person.</p>
              </div>
            </div>
            <div className="features_item_container" data-aos='zoom-out'>
              <div className="features_item">
                <FaFeatherAlt className='features_icon'/>
                <h4>Lightweight</h4>
                <p>This tools can be used by any other platform like web, mobile and desktop application.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FEATURES END */}
      {/* PRICING START */}
      {/* PRICING END */}
    </div>
  )
}