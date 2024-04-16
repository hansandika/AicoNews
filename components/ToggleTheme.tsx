"use client";

import { useTheme } from "next-themes";
import React from "react";
import { BsBrightnessLowFill } from "react-icons/bs";
import { HiMiniMoon } from "react-icons/hi2";
function ToggleTheme() {
	const { resolvedTheme: theme, setTheme } = useTheme()

	return (
		<div className="text-blue-secondary">
			{theme === "dark" ? (
				<BsBrightnessLowFill
					size={24}
					onClick={() => setTheme("light")}
				/>
			) : (
				<HiMiniMoon
					size={24}
					onClick={() => setTheme("dark")}
				/>
			)}
		</div>
	);
}

export default ToggleTheme;
