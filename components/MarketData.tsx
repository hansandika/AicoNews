"use client";

import React, { useEffect, useRef } from "react";

export const MarketData = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		// If there is no window
		if (typeof window === "undefined") return;

		const scriptElement = document.createElement("script");
		scriptElement.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
		scriptElement.async = true;
		scriptElement.text = `
        {
            "width": "100%",
            "height": "100%",
            "symbolsGroups": [
              {
                "name": "Indices",
                "originalName": "Indices",
                "symbols": [
                  {
                    "name": "FOREXCOM:SPXUSD",
                    "displayName": "S&P 500 Index"
                  },
                  {
                    "name": "FOREXCOM:NSXUSD",
                    "displayName": "US 100 Cash CFD"
                  },
                  {
                    "name": "FOREXCOM:DJI",
                    "displayName": "Dow Jones Industrial Average Index"
                  },
                  {
                    "name": "INDEX:NKY",
                    "displayName": "Nikkei 225"
                  },
                  {
                    "name": "INDEX:DEU40",
                    "displayName": "DAX Index"
                  },
                  {
                    "name": "FOREXCOM:UKXGBP",
                    "displayName": "FTSE 100 Index"
                  }
                ]
              },
              {
                "name": "Futures",
                "originalName": "Futures",
                "symbols": [
                  {
                    "name": "CME_MINI:ES1!",
                    "displayName": "S&P 500"
                  },
                  {
                    "name": "CME:6E1!",
                    "displayName": "Euro"
                  },
                  {
                    "name": "COMEX:GC1!",
                    "displayName": "Gold"
                  },
                  {
                    "name": "NYMEX:CL1!",
                    "displayName": "WTI Crude Oil"
                  },
                  {
                    "name": "NYMEX:NG1!",
                    "displayName": "Gas"
                  },
                  {
                    "name": "CBOT:ZC1!",
                    "displayName": "Corn"
                  }
                ]
              },
              {
                "name": "Cryptocurrencies",
                "originalName": "Bonds",
                "symbols": [
                  {
                    "name": "BINANCE:BTCUSDT",
                    "displayName": "Bitcoin"
                  },
                  {
                    "name": "BINANCE:ETHUSDT",
                    "displayName": "Ethereum"
                  },
                  {
                    "name": "BINANCE:MANTAUSDT",
                    "displayName": "Manta"
                  },
                  {
                    "name": "BYBIT:ONDOUSDT",
                    "displayName": "Ondo Finance"
                  }
                ]
              },
              {
                "name": "Forex",
                "originalName": "Forex",
                "symbols": [
                  {
                    "name": "FX:EURUSD",
                    "displayName": "EUR to USD"
                  },
                  {
                    "name": "FX:GBPUSD",
                    "displayName": "GBP to USD"
                  },
                  {
                    "name": "FX:USDJPY",
                    "displayName": "USD to JPY"
                  },
                  {
                    "name": "FX:USDCHF",
                    "displayName": "USD to CHF"
                  },
                  {
                    "name": "FX:AUDUSD",
                    "displayName": "AUD to USD"
                  },
                  {
                    "name": "FX:USDCAD",
                    "displayName": "USD to CAD"
                  }
                ]
              }
            ],
            "showSymbolLogo": true,
            "isTransparent": true,
            "colorTheme": "dark",
            "locale": "en"
          }`;

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
	}, []);

	return (
		<div
			ref={containerRef}
			id="script-container"
			className="tradingview-widget-container"
		></div>
	);
};
