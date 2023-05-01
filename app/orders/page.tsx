import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth";
import Header from "@/components/header/Header";
import Orders from "@/app/orders/components/Orders";
import { getStripeOrders } from "@/utils/getStripeOrders";
import { StripeOrder } from "@/types/typings";

const OrdersPage = async (): Promise<JSX.Element> => {
	const session: Session | null = await getServerSession(authOptions);

	let stripeOrders: StripeOrder[] | undefined;

	if (session?.user?.email) {
		stripeOrders = await getStripeOrders(session.user.email);
	}

	return (
		<div>
			<Header session={session} />
			<main className="max-w-screen-lg mx-auto p-10">
				<h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>

				{session ? (
					<h2>{stripeOrders?.length || 0} Orders</h2>
				) : (
					<h2>Please sign in to see your orders</h2>
				)}

				{stripeOrders && (
					<div className="mt-5 space-y-4">
						<Orders orders={stripeOrders} />
					</div>
				)}
			</main>
		</div>
	);
};

export default OrdersPage;
