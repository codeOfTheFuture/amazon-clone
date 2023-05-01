import { Product, StripeProduct } from "@/types/typings";

/**
 * Transforms an array of Product objects into a format suitable for use with Stripe API.
 *
 * @param {Product[]} products - An array of Product objects to transform.
 * @returns {StripeProduct[]} An array of StripeProduct objects, representing the transformed products.
 */

export const transformToStripeFormat = (products: Product[]): StripeProduct[] => {
	const DOLLAR_TO_CENTS = 100;
	const CURRENCY = "usd";
	const QUANTITY = 1;

	/**
	 * Converts a dollar amount to cents.
	 *
	 * @param {number} price - The dollar amount to convert.
	 * @returns {number} The converted amount in cents.
	 */

	const convertDollarsToCents = (price: number): number => {
		return price * DOLLAR_TO_CENTS;
	};

	return products.map((product: Product) => ({
		quantity: QUANTITY,
		price_data: {
			currency: CURRENCY,
			unit_amount: convertDollarsToCents(product.price),
			product_data: {
				name: product.title,
				description: product.description,
				images: [product.image],
			},
		},
	}));
};

/**
 * Represents a product in the format required by Stripe.
 *
 * @typedef {Object} StripeProduct
 * @property {number} quantity - The quantity of the product being purchased.
 * @property {object} price_data - The price of the product in the required format for Stripe.
 * @property {string} price_data.currency - The currency of the price.
 * @property {number} price_data.unit_amount - The price of the product in cents.
 * @property {object} price_data.product_data - Additional product data in the required format for Stripe.
 * @property {string} price_data.product_data.name - The name of the product.
 * @property {string} price_data.description - The description of the product.
 * @property {string[]} price_data.product_data.images - An array of images for the product.
 */
