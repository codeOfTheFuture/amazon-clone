import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import Header from "@/components/header/Header";
import CheckoutHeading from "@/app/checkout/components/CheckoutHeading";
import BasketItems from "@/app/checkout/components/BasketItems";
import Checkout from "@/app/checkout/components/Checkout";

import primeDayBanner from "@/assets/prime-day-banner.webp";

const CheckoutPage = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className="bg-gray-100">
			<Header session={session} />

			<main className="lg:flex max-w-screen-2xl mx-auto">
				<div className="flex-grow m-5 shadow-sm">
					<Image
						src={primeDayBanner}
						alt="Prime Day Banner"
						width={1020}
						height={250}
						className="object-contain"
					/>

					<div className="flex flex-col p-5 space-y-10 bg-white">
						<CheckoutHeading />
						<BasketItems />
					</div>
				</div>

				<Checkout />
			</main>
		</div>
	);
};

export default CheckoutPage;
