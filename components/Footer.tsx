import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsInstagram, BsTwitterX } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa6'

const Footer = () => {
	return (
		<footer className='bg-blue-primary py-8'>
			<div className='container flex flex-col md:flex-row items-start md:justify-between md:items-center w-full gap-8 md:gap-4'>
				<div className='flex flex-col gap-2'>
					<Image src='/logo-white.svg' width={179} height={44} alt='AicoNews' className='text-white w-32 sm:w-44' />
					<p className='text-sm sm:text-base font-medium text-blue-secondary'>© 2024 AicoNews All rights reserved.</p>
				</div>
				<div className='flex gap-4 text-white sm:text-[1.75rem] text-lg'>
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
			</div>

		</footer>
	)
}

export default Footer