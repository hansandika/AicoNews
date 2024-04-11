import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
	const duration = moment.duration(moment().diff(date));

	if (duration.asHours() > 24) {
		// If the date is more than 24 hours ago, format it as "April 7, 2024"
		return moment(date).format("MMMM D, YYYY");
	} else {
		// If the date is less than 24 hours ago, format it as "2 hours ago"
		return moment(date).fromNow();
	}
};

export const getMarketWidgetTexts = (theme: string): string => {
	return `
  {
      "colorTheme": "${theme}",
      "dateRange": "1M",
      "showChart": true,
      "locale": "en",
      "width": "100%",
      "height": "100%",
      "largeChartUrl": "",
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
              "s": "BINANCE:SOLUSDT",
              "d": "Solana"
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
    `
}