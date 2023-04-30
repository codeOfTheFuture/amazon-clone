import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";

import { fulfillOrder } from "./utils/fulfillOrder";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const STRIPE_SIGNING_SECRET = process.env.STRIPE_SIGNING_SECRET!;
const API_VERSION = "2022-11-15";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: API_VERSION,
	typescript: true,
});

const webhook = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	if (req.method === "POST") {
		const REQUEST_BUFFER = await buffer(req);
		const PAYLOAD = REQUEST_BUFFER.toString();

		let event: Stripe.Event;

		if (STRIPE_SIGNING_SECRET) {
			const SIGNATURE = req.headers["stripe-signature"]!;

			try {
				event = stripe.webhooks.constructEvent(PAYLOAD, SIGNATURE, STRIPE_SIGNING_SECRET);
			} catch (error: any) {
				console.error(`Webhook signature verification failed.`, error.message);
				return res.status(error.statusCode || 500).json(error.message);
			}

			const DATA: Stripe.Event.Data = event.data;
			const EVENT_TYPE: string = event.type;

			const CHECKOUT_SESSION_COMPLETED = "checkout.session.completed";

			if (EVENT_TYPE === CHECKOUT_SESSION_COMPLETED) {
				const session: Stripe.Checkout.Session = DATA.object as Stripe.Checkout.Session;

				console.log(`🔔  Webhook received: ${session.object} ${session.status}!`);
				console.log("💰 Payment captured!");

				await fulfillOrder(session);
				res.status(200);
			}
		}
	}
};

interface NextApiConfig {
	api?: {
		bodyParser?: boolean;
		externalResolver?: boolean;
	};
}

export const config: NextApiConfig = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};

export default webhook;
