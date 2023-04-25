import Banner from "@/components/Banner";
import Header from "@/components/Header";
import ProductFeed from "@/components/ProductFeed";
import { Product } from "@/typings";

const ENDPOINT = "https://fakestoreapi.com/products";

const Home = async () => {
	const response = await fetch(ENDPOINT);
	const products: Product[] = await response.json();

	return (
		<div className="bg-gray-100">
			<Header />

			<main className="max-w-screen-2xl mx-auto">
				<Banner />
				<ProductFeed products={products} />
			</main>
		</div>
	);
};

export default Home;
