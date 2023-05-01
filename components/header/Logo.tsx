import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/amazon_logo.png";

const Logo = () => {
	return (
		<Link className="flex items-center mt-2 mx-6 flex-grow md:flex-grow-0" href="/">
			<div className="relative w-28 h-10">
				<Image
					src={logo}
					alt="logo"
					className="absolute object-contain cursor-pointer"
					fill
					sizes="(min-width: 1024px) 5vw, (min-width: 768px) 15vw, 25vw"
				/>
			</div>
		</Link>
	);
};

export default Logo;
