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
