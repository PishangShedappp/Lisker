"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import firebase from '../../../firebase/firebaseClient';
import AuthButton from '@/components/auth_comp/AuthButton';
import './epsuccess.css';
import toast from 'react-hot-toast';

function EpSuccess() {
    const router = useRouter();

    const [name, setName] = useState("")

    const [getUid, setGetUid] = useState("");

    const searchParams = useSearchParams();
    const actionMode = searchParams.get('action')

    useEffect(() => {
        setGetUid(JSON.parse(localStorage.getItem('uid')));
        document.title = "Lisker - Success";
    })

    function usernameSubmit () {
        /** This thing is not function **/
        firebase.auth().currentUser?.updateProfile({
            displayName: name
        })
        firebase.firestore().collection("users").doc(getUid).update({
            name: name,
        })
        if (window) {
            localStorage.setItem("name", JSON.stringify(name))
        }
        toast.success(`You're good to go`, {
            duration: 3000,
            position: 'bottom-center'
        })
        router.push('/app')
    }

    return (
        <div>
            {actionMode === '1' ?
                <div>
                    <p className='bg-credit'>Image by <a target='_blank' href="https://pixabay.com/users/davidrockdesign-2595351/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1789175">David</a> from <a target='_blank' href="https://pixabay.com">Pixabay</a></p>
                    <div className='split-screen'>
                        <div className="left">
                            <section className='copy'>
                                <h1>Enter username</h1>
                                <p>We just need to know some basic information</p>
                            </section>
                        </div>
                        <div className="right">
                            <form action="">
                                <section className="copy">
                                    <h2>Setting Up</h2>
                                </section>

                                <div className='input-container uname'>
                                    <label htmlFor="uname">Username</label>
                                    <input type="text" id='uname' name='uname' onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div onClick={usernameSubmit}>
                                    <AuthButton content='next'/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            :
                <div className='hidden'></div>
            }
        </div>
    )
}

export default EpSuccess