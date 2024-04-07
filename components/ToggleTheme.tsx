"use client";

import React, { useEffect, useState } from "react";
import { BsBrightnessLowFill } from "react-icons/bs";
import { HiMiniMoon } from "react-icons/hi2";
function ToggleTheme() {
	const [theme, setTheme] = useState("light");
	if (typeof window === undefined) return null;

	useEffect(() => {
		// Check if window is defined (this is for server-side rendering)
		if (typeof window !== "undefined") {
			// check if the localstorage has a theme set
			const localTheme = window.localStorage.getItem("theme");
			console.log(localTheme);
			// if it does, set the theme to the local storage theme
			if (localTheme) {
				setTheme(localTheme);
				document.documentElement.classList.add(localTheme);
			} else {
				// if not, check if the user prefers dark mode
				const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
				if (darkThemeMq.matches) {
					setTheme("dark");
				} else {
					setTheme("light");
				}
			}
		}
	}, []);

	const toggleTheme = () => {
		if (theme === "light") {
			// if the theme is light, set the theme to dark
			setTheme("dark");
			//save the theme to local storage
			window.localStorage.setItem("theme", "dark");
			// add the dark class to the document
			document.documentElement.classList.add("dark");
		} else {
			setTheme("light");
			window.localStorage.setItem("theme", "light");
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<div className="text-blue-secondary">
			{theme === "light" ? (
				<BsBrightnessLowFill
					size={24}
					onClick={() => toggleTheme()}
				/>
			) : (
				<HiMiniMoon
					size={24}
					onClick={() => toggleTheme()}
				/>
			)}
		</div>
	);
}

export default ToggleTheme;
