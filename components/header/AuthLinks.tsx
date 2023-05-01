"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface Props {
	session: Session | null;
}

const AuthLinks = ({ session }: Props): JSX.Element => {
	return (
		<>
			<div onClick={() => (session ? signOut() : signIn())} className="link">
				<p>{`Hello, ${session ? session.user?.name : "Sign In"}`}</p>
				<p className="font-extrabold md:text-sm">Account & Lists</p>
			</div>
			<Link href="/orders" className="link">
				<p>Returns</p>
				<p className="font-extrabold md:text-sm">& Orders</p>
			</Link>
		</>
	);
};

export default AuthLinks;
