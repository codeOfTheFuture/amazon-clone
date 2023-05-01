"use client";
import Logo from "@/components/header/Logo";
import SearchBar from "@/components/header/SearchBar";
import AuthLinks from "@/components/header/AuthLinks";
import BasketLink from "@/components/header/BasketLink";
import NavLinks from "./NavLinks";
import { Session } from "next-auth";

interface Props {
	session: Session | null;
}

const Header = ({ session }: Props) => {
	return (
		<header>
			<div className="flex items-center flex-grow bg-amazon_blue px-1 py-2">
				<Logo />
				<SearchBar />
				<div className="flex items-center text-white text-xs space-x-6 mx-6 whitespace-nowrap">
					<AuthLinks session={session} />
					<BasketLink />
				</div>
			</div>

			<NavLinks />
		</header>
	);
};

export default Header;
