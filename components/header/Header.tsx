"use client";
import Logo from "@/components/header/Logo";
import SearchBar from "@/components/header/SearchBar";
import AuthLinks from "@/components/header/AuthLinks";
import Basket from "@/components/header/Basket";
import NavLinks from "./NavLinks";

const Header = () => {
	return (
		<header>
			<div className="flex items-center flex-grow bg-amazon_blue px-1 py-2">
				<Logo />
				<SearchBar />
				<div className="flex items-center text-white text-xs space-x-6 mx-6 whitespace-nowrap">
					<AuthLinks />
					<Basket />
				</div>
			</div>

			<NavLinks />
		</header>
	);
};

export default Header;
