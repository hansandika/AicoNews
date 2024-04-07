"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";

const AuthProviders = () => {
	return (
		<Button
			variant={"google"}
			onClick={() => signIn("google")}
			className="flexBetween gap-2 font-normal "
		>
			<FcGoogle />
			Sign in with Google
		</Button>
	);
};

export default AuthProviders;
