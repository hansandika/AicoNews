'use client';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { SessionInterface } from '@/common.types';

const SubLayout = ({
	children,
	session,
}: Readonly<{
	children: React.ReactNode;
	session: SessionInterface;
}>) => {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	return (
		domLoaded && (
			<div>
				<div
					className='dark:bg-black'
					suppressHydrationWarning
				>
					<Navbar session={session} />
					<main>{children}</main>
					<Footer />
				</div>
			</div>
		)
	);
};

export default SubLayout;
