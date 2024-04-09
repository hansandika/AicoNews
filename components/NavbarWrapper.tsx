import React from "react";
import { getCurrentUser } from "@/lib/session";
import Navbar from "./Navbar";

const NavbarWrapper = async () => {
	const session = await getCurrentUser();
	return <Navbar session={session} />;
};

export default NavbarWrapper;
