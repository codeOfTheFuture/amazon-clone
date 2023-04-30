"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
	const { data: session, status } = useSession();

	return (
		<>
			<div onClick={() => (session ? signOut() : signIn())} className="link">
				<p>{`Hello, ${
					status === "authenticated"
						? session.user?.name
						: status === "unauthenticated"
						? "sign in"
						: ""
				}`}</p>
				<p className="font-extrabold md:text-sm">Account & Lists</p>
			</div>
			<div className="link">
				<p>Returns</p>
				<p className="font-extrabold md:text-sm">& Orders</p>
			</div>
		</>
	);
};

export default AuthLinks;
