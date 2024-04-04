import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsInstagram, BsTwitterX } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className='flexBetween flex-wrap bg-blue-primary h-40'>
      <div className='md:ml-24 ml-12'>
        <Image src='logo-white.svg' width={179} height={44} alt='AicoNews' className='text-white'/>
        <p className='text-heading6 font-500 text-blue-secondary'>© 2024 AicoNews All rights reserved.</p>
      </div>
      <div className='flex gap-3 text-white text-[1.75rem] md:mr-24 mr-12 ml-12'>
        <Link href='https://twitter.com' target='_blank'>
          <BsTwitterX />
        </Link>
        <Link href='https://instagram.com' target='_blank'>
          <BsInstagram />
        </Link>
        <Link href='https://facebook.com' target='_blank'>
          <FaFacebookF />
        </Link>
      </div>
    </footer>
  )
}

export default Footer