import Header from "@/components/Header";
import Image from "next/image";

import primeDayBanner from "@/assets/prime-day-banner.webp";
import CheckoutHeading from "@/app/checkout/components/CheckoutHeading";
import BasketItems from "@/app/checkout/components/BasketItems";
import Checkout from "@/app/checkout/components/Checkout";

const CheckoutPage = () => {
	return (
		<div className="bg-gray-100">
			<Header />

			<main className="lg:flex max-w-screen-2xl mx-auto">
				{/* Left */}
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
