import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Stripe from "stripe";

export interface StripeOrder {
	id: string;
	amount: number;
	amountShipping: number;
	images: string[];
	timestamp: number;
	items: Stripe.LineItem[];
	quantity: number;
}

export interface Product {
	id: number;
	uuid: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
	hasPrime: boolean;
}

export interface StripeProduct {
	quantity: number;
	price_data: {
		currency: string;
		unit_amount: number;
		product_data: {
			name: string;
			description: string;
			images: string[];
		};
	};
}
