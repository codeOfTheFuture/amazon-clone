import { NextApiRequest, NextApiResponse } from "next";
import stripe from "stripe";
import { getToken, decode } from "next-auth/jwt";
import { transformToStripeFormat } from "@/utils/transformToStripeFormat";
import { Product } from "@/types/typings";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const API_VERSION = "2022-11-15";

const SHIPPING_RATE = "shr_1N24LcJ6McfLlfvXQGBJ7cP6";
const SUCCESS_URL = `${process.env.HOST}/success`;
const CANCEL_URL = `${process.env.HOST}/checkout`;

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;

interface RequestBody {
	basketItems: Product[];
	email: string;
}

const checkoutSession = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const token = await getToken({ req, secret: NEXTAUTH_SECRET });
	token;

	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	if (req.method === "POST") {
		const { basketItems, email } = req.body as RequestBody;

		const stripeProducts = transformToStripeFormat(basketItems);

		const productImages = JSON.stringify(basketItems.map((product: Product) => product.image));

		try {
			const session = await new stripe(STRIPE_SECRET_KEY, {
				apiVersion: API_VERSION,
			}).checkout.sessions.create({
				payment_method_types: ["card"],
				shipping_options: [
					{
						shipping_rate: SHIPPING_RATE,
					},
				],
				shipping_address_collection: {
					allowed_countries: ["US", "CA", "MX"],
				},
				line_items: stripeProducts,
				mode: "payment",
				success_url: SUCCESS_URL,
				cancel_url: CANCEL_URL,
				metadata: {
					email,
					images: productImages,
				},
			});

			res.status(200).json({ id: session.id });
		} catch (error: any) {
			res.status(error.statusCode || 500).json(error.message);
		}
	}
};

export default checkoutSession;
