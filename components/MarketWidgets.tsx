'use client';
import { getMarketWidgetTexts } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';

const MarketWidgets = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { resolvedTheme: theme } = useTheme();

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const scriptElement = document.createElement('script');
		scriptElement.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
		scriptElement.async = true;

		scriptElement.text = getMarketWidgetTexts(theme as string);

		if (containerRef.current!.children.length > 1) {
			for (let i = 0; i < 2; i++) {
				containerRef.current!.removeChild(containerRef.current!.children[0]);
			}
		}

		if (containerRef.current) {
			containerRef.current.appendChild(scriptElement);
		}

		return () => {
			if (
				scriptElement &&
				containerRef.current &&
				containerRef.current.contains(scriptElement)
			) {
				containerRef.current.removeChild(scriptElement);
			}
		};
	}, [theme]);

	return (
		<div
			ref={containerRef}
			id='script-container'
			className='tradingview-widget-container'
		></div>
	);
};

export default MarketWidgets;
