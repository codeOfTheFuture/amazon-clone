import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Header from "@/components/header/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";

const SuccessPage = async (): Promise<JSX.Element> => {
	const session = await getServerSession(authOptions);

	return (
		<div className="bg-gray-100 h-screen">
			<Header session={session} />

			<main className="max-w-screen-lg mx-auto">
				<div className="flex flex-col p-10 bg-white">
					<div className="flex items-center space-x-2 mb-5">
						<CheckCircleIcon className="text-green-500 h-10" />
						<h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
					</div>
					<p>
						Thank you for your purchase! We are excited to fulfill your order and hope you enjoy
						your new items. We will send you a confirmation email as soon as your item(s) are
						shipped. Click the button below to check the status of your order.
					</p>
					<Link href="/orders" className="button button-active-color mt-8">
						Go to my orders
					</Link>
				</div>
			</main>
		</div>
	);
};

export default SuccessPage;
