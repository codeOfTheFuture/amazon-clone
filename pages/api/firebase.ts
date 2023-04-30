import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "@/permissions.json";
import Stripe from "stripe";

type App = admin.app.App;

const app: App = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount as ServiceAccount),
	  })
	: admin.app();

const CENTS_TO_DOLLARS = 100;

const USER_COLLECTION = "users";
const ORDERS_COLLECTION = "orders";

type SessionType = Stripe.Checkout.Session;
type FulfillmentResult = admin.firestore.WriteResult | undefined;

/**
 * Adds the details of a fulfilled order to the Firestore database.
 *
 * @async
 * @param {Stripe.Checkout.Session} session - The Stripe Checkout Session object
 *   representing the completed order.
 * @returns {Promise<admin.firestore.WriteResult|undefined>} A Promise that resolves to
 *   the Firestore `WriteResult` object of the created document, or `undefined` if the
 *   operation failed.
 * @throws {Error} If the operation failed due to an unexpected error.
 */

export const fulfillOrder = async (session: SessionType): Promise<FulfillmentResult> => {
	console.log("Fulfilling order", session);

	const METADATA: Stripe.Metadata = session.metadata as Stripe.Metadata;
	const AMOUNT_TOTAL: number = session.amount_total as number;
	const AMOUNT_SHIPPING: number = session.total_details?.amount_shipping as number;

	try {
		const result: FulfillmentResult = await app
			.firestore()
			.collection(USER_COLLECTION)
			.doc(METADATA.email)
			.collection(ORDERS_COLLECTION)
			.doc(session.id)
			.set({
				amount: AMOUNT_TOTAL / CENTS_TO_DOLLARS,
				amount_shipping: AMOUNT_SHIPPING / CENTS_TO_DOLLARS,
				images: JSON.parse(METADATA.images),
				timestamp: admin.firestore.FieldValue.serverTimestamp(),
			});

		console.log(`SUCCESS: Order ${session.id} has been added to the DB`);

		return result;
	} catch (error: any) {
		console.error("ERROR:", error.statusCode, error.message);
	}
};
