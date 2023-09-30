"use client"

import react, {useEffect} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './page.css'
import rightHero from '../../public/undraw_Make_it_rain_re_w9pc.png';

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
                <Link href='/auth/register' className='login'>Log In</Link>
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
    </div>
  )
}