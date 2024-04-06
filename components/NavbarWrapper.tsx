import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import { FaRegSun } from "react-icons/fa6";
import { getCurrentUser } from "@/lib/session";
import { useMediaQuery } from "@/hooks/use-media-query";
import Navbar from "./Navbar";

const NavbarWrapper = async () => {
	const session = await getCurrentUser();
	var currentPath = "/";
	if (typeof window !== "undefined") {
		currentPath = window.location.hostname;
	}
	return <Navbar session={session} />;
};

export default NavbarWrapper;
