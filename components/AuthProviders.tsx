"use client"
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'


const AuthProviders = () => {
  return (
    <button onClick={() => signIn('google')} className='flexBetween gap-2 font-normal'>
      <FcGoogle/>
      Sign in
    </button>
  )
}

export default AuthProviders