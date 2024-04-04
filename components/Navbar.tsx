import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from './SearchBar'
import { FaRegSun } from 'react-icons/fa6'
import { getCurrentUser } from '@/lib/session'
import ProfileMenu from './ProfileMenu'
import AuthProviders from './AuthProviders'
import { NavLinks } from '@/constants'

const Navbar = async () => {
  const session = await getCurrentUser();
  var currentPath = '/'
  if(typeof window !== 'undefined') {
    currentPath = window.location.hostname;
  }
  return (
    <nav className='flexAround flex-wrap h-32 m-3'>
      <Link href="/">
        <Image
          src="/logo.svg"
          width={179}
          height={44}
          alt='AicoNews'
        />
      </Link>
      <div className='flexBetween w-full lg:w-2/3 flex-col-reverse lg:flex-row gap-3 mt-3 lg'>
        <SearchBar/>
        <div className='flexBetween lg:justify-end w-full lg:w-1/2 gap-8 text-base lg:text-xl font-bold text-black-tertiary'>
          <ul className='flexCenter gap-3'>
            {NavLinks.map((link) => (
              <Link href={link.href} key={link.key} className={currentPath == link.href ? 'text-blue-primary' : ''}>
                {link.text}
              </Link>
            ))}
          </ul>
          <div className='border border-black-secondary h-9 hidden lg:block'></div>
          <div className='flexBetween gap-3'>
            <button><FaRegSun className='text-2xl lg:text-[2rem]'/></button>
            <div className='flexCenter gap-3 shrink-0'>
              {session?.user ? (
                <ProfileMenu session={session}/>
              ) : (
                <AuthProviders/>
              )}
          </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar