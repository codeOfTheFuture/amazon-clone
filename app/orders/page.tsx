import Header from "@/components/header/Header";
import moment from "moment";
import { getServerSession } from "next-auth/next";
import Stripe from "stripe";
import db from "@/firebase";
import { StripeOrder } from "@/typings";
import { Session } from "next-auth";
import Orders from "@/app/orders/components/Orders";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const API_VERSION = "2022-11-15";

const stripe: Stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: API_VERSION,
});

type OrderDocs = FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

const OrdersPage = async (): Promise<JSX.Element> => {
	const session: Session | null = await getServerSession(authOptions);

	let stripeOrders: StripeOrder[] | undefined;

	if (session?.user?.email) {
		try {
			const orderDocs: OrderDocs = await db
				.collection("users")
				.doc(session.user.email)
				.collection("orders")
				.orderBy("timestamp", "desc")
				.get();

			stripeOrders = (await Promise.all(
				orderDocs.docs.map(async order => ({
					id: order.id,
					amount: order.data().amount,
					amountShipping: order.data().amount_shipping,
					images: order.data().images,
					timestamp: moment(order.data().timestamp.toDate()).unix(),
					items: (
						await stripe.checkout.sessions.listLineItems(order.id, {
							limit: 100,
						})
					).data,
				}))
			)) as StripeOrder[];
		} catch (error: any) {
			console.log(`Error: ${error.message}`);
		}
	}

	return (
		<div>
			<Header />
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
