"use client";
import Script from "next/script";
import React, { useEffect, useRef } from "react";

function MarketWidgets() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		// If there is no window
		if (typeof window === "undefined") return;

		const scriptElement = document.createElement("script");
		scriptElement.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
		scriptElement.async = true;
		scriptElement.text = `
        {
            "colorTheme": "light",
            "dateRange": "1M",
            "showChart": true,
            "locale": "en",
            "width": "100%",
            "height": "100%",
            "largeChartUrl": "",
            "isTransparent": true,
            "showSymbolLogo": true,
            "showFloatingTooltip": true,
            "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
            "plotLineColorFalling": "rgba(41, 98, 255, 1)",
            "gridLineColor": "rgba(0, 0, 0, 0)",
            "scaleFontColor": "rgba(134, 137, 147, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "tabs": [
              {
                "title": "Indices",
                "symbols": [
                  {
                    "s": "FOREXCOM:SPXUSD",
                    "d": "S&P 500 Index"
                  },
                  {
                    "s": "INDEX:NKY",
                    "d": "Nikkei 225"
                  },
                  {
                    "s": "FOREXCOM:UKXGBP",
                    "d": "FTSE 100 Index"
                  },
                  {
                    "s": "HSI:HSI",
                    "d": "Hang Seng Index"
                  },
                  {
                    "s": "IDX:COMPOSITE",
                    "d": "Composite Idx"
                  }
                ],
                "originalTitle": "Indices"
              },
              {
                "title": "Futures",
                "symbols": [
                  {
                    "s": "COMEX:GC1!",
                    "d": "Gold"
                  },
                  {
                    "s": "NYMEX:CL1!",
                    "d": "WTI Crude Oil"
                  }
                ],
                "originalTitle": "Futures"
              },
              {
                "title": "Cryptocurrencies",
                "symbols": [
                  {
                    "s": "BINANCE:BTCUSDT",
                    "d": "Bitcoin"
                  },
                  {
                    "s": "BINANCE:ETHUSDT",
                    "d": "Ethereum"
                  },
                  {
                    "s": "BYBIT:ONDOUSDT",
                    "d": "Ondo Finance"
                  },
                  {
                    "s": "BINANCE:MANTAUSDT",
                    "d": "Manta"
                  }
                ],
                "originalTitle": "Bonds"
              },
              {
                "title": "Forex",
                "symbols": [
                  {
                    "s": "FX:EURUSD",
                    "d": "EUR to USD"
                  },
                  {
                    "s": "FX:GBPUSD",
                    "d": "GBP to USD"
                  },
                  {
                    "s": "FX:USDJPY",
                    "d": "USD to JPY"
                  },
                  {
                    "s": "FX_IDC:USDIDR",
                    "d": "USD to IDR"
                  }
                ],
                "originalTitle": "Forex"
              }
            ]
          }
          `;

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
}

export default MarketWidgets;
