import { transformToStripeFormat } from "@/utils/transformToStripeFormat";
import { NextApiRequest, NextApiResponse } from "next";
import stripe from "stripe";
import { Product } from "@/typings";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const API_VERSION = "2022-11-15";

const SHIPPING_RATE = "shr_1N24LcJ6McfLlfvXQGBJ7cP6";
const SUCCESS_URL = `${process.env.HOST}/success`;
const CANCEL_URL = `${process.env.HOST}/checkout`;

interface RequestBody {
	selectedProducts: Product[];
	email: string;
}

const checkoutSession = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { selectedProducts, email } = req.body as RequestBody;

		const stripeProducts = transformToStripeFormat(selectedProducts);

		const productImages = JSON.stringify(
			selectedProducts.map((product: Product) => product.image)
		);

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
			console.error("Error message: ", error.message);
			res.status(error.statusCode || 500).json(error.message);
		}
	}
};

export default checkoutSession;
