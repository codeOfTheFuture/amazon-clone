import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/amazon_logo.png";

const Logo = () => {
	return (
		<Link
			className="flex items-center mt-2 mx-6 flex-grow md:flex-grow-0"
			href="/"
		>
			<Image
				src={logo}
				alt="logo"
				width={150}
				height={40}
				className="object-contain cursor-pointer"
			/>
		</Link>
	);
};

export default Logo;
