import db from "@/firebase";
import Stripe from "stripe";
import moment from "moment";
import { StripeOrder } from "@/typings";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const API_VERSION = "2022-11-15";
const LIMIT = 100;

const stripe: Stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: API_VERSION,
});

/**
 * Retrieves the Stripe orders for a given user from Firebase and includes the line items.
 *
 * @async
 * @param {string} email - The email address of the user.
 * @returns {Promise<StripeOrder[] | undefined>} - A promise that resolves to an array of `StripeOrder` objects, or `undefined` if there was an error.
 *
 * @throws {Error} - If there was an error while retrieving the orders.
 */

export const getStripeOrders = async (email: string): Promise<StripeOrder[] | undefined> => {
	let stripeOrders: StripeOrder[] | undefined;

	try {
		const orderDocs = await db
			.collection("users")
			.doc(email)
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
						limit: LIMIT,
					})
				).data,
			}))
		)) as StripeOrder[];
	} catch (error: any) {
		console.log(`Error: ${error.message}`);
		throw new Error(error.message);
	}

	return stripeOrders;
};
