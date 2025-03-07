import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '/public/assets/JS/firebase.js';

const OAuth = () => {
    const handleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const res = await signInWithPopup(auth,provider)
            console.log(res.user)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <button className='bg-orange-600 text-white w-full px-4 py-2 rounded-lg mt-2' onClick={handleClick}>Sign in with Google</button>
  )
}

export default OAuth