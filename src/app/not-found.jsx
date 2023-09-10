"use client"

import React from 'react';
import { useRouter } from 'next/navigation'

import './not-found.css';

export default function NotFound() {
    const router = useRouter()

    return (
        <div className='nf__container'>
            <div className="innf__container">
                <h2>Oops! Page not found.</h2>
                <h1>404</h1>
                <p>We can&apos;t find the page you&apos;re looking for.</p>
                <a className='nf__link' onClick={() => router.back()}>Go back</a>
            </div>
        </div>
    );
}