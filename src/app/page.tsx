"use client"

import react, {useEffect} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {MdOutlineAttachMoney} from 'react-icons/md';
import {FaUserGraduate} from 'react-icons/fa6';
import {FaFeatherAlt} from 'react-icons/fa';
import {BsFillShieldFill, BsDot} from 'react-icons/bs';
import {BiX} from 'react-icons/bi';
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
      <div className="pricing">
        <div className="pricing_container" data-aos='fade-up'>
          <div className="pricing_header">
            <h2>Our Pricing</h2>
            <p>If you're new here you can compare what we include in every plan below</p>
          </div>
          <div className="pricing_row">
            <div className="pricing_item_container" data-aos='zoom-in' data-aos-delay='200'>
              <div className="pricing_item">
                <div className="pricing_item_header">
                  <h3>Free Plan</h3>
                  <h4>
                    <sup>$</sup>
                    0
                    <span> / month</span>
                  </h4>
                </div>
                <ul>
                  <li>
                    <BsDot />
                    <span>Up to 5 MB file uploads</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>5 projects</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>Email support</span>
                  </li>
                  <li className='na'>
                    <BiX />
                    <span>Ads removed</span>
                  </li>
                  <li className="na">
                    <BiX />
                    <span>Whiteboards</span>
                  </li>
                  <li className="na">
                    <BiX />
                    <span>Priority support 24/7</span>
                  </li>
                </ul> 
                <div className="pricing_button"></div>
              </div>
            </div>
            <div className="pricing_item_container" data-aos='zoom-in' data-aos-delay='350'>
              <div className="pricing_item featured">
                <div className="pricing_item_header">
                  <h3>Premium Plan</h3>
                  <h4>
                    <sup>$</sup>
                    7
                    <span> / month</span>
                  </h4>
                </div>
                <ul>
                  <li>
                    <BsDot />
                    <span>Up to 15 MB file uploads</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>20 projects</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>Email support</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>Ads removed</span>
                  </li>
                  <li className="na">
                    <BiX />
                    <span>Whiteboards</span>
                  </li>
                  <li className="na">
                    <BiX />
                    <span>Priority support 24/7</span>
                  </li>
                </ul> 
                <div className="pricing_button"></div>
              </div>
            </div>
            <div className="pricing_item_container" data-aos='zoom-in' data-aos-delay='500'>
              <div className="pricing_item">
                <div className="pricing_item_header">
                  <h3>Business Plan</h3>
                  <h4>
                    <sup>$</sup>
                    15
                    <span> / month</span>
                  </h4>
                </div>
                <ul>
                  <li>
                    <BsDot />
                    <span>Up to 50 MB file uploads</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>Unlimited projects</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>Email support</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>Ads removed</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>Whiteboards</span>
                  </li>
                  <li>
                    <BsDot />
                    <span>Priority support 24/7</span>
                  </li>
                </ul> 
                <div className="pricing_button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PRICING END */}
    </div>
  )
}