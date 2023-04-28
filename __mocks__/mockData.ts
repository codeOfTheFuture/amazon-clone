import { Product } from "@/typings";

export const mockProducts: Product[] = [
	{
		id: 1,
		uuid: "abc123",
		title: "Product 1",
		price: 9.99,
		description: "This is the first product",
		category: "electronics",
		image: "https://example.com/product1.jpg",
		rating: {
			rate: 4.5,
			count: 10,
		},
		hasPrime: true,
	},
	{
		id: 2,
		uuid: "def456",
		title: "Product 2",
		price: 19.99,
		description: "This is the second product",
		category: "clothing",
		image: "https://example.com/product2.jpg",
		rating: {
			rate: 3.8,
			count: 5,
		},
		hasPrime: false,
	},
];
