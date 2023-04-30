import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Banner from "@/components/Banner";
import Header from "@/components/header/Header";
import ProductFeed from "@/components/ProductFeed";
import { Product } from "@/typings";

const ENDPOINT = "https://fakestoreapi.com/products";

const HomePage = async (): Promise<JSX.Element> => {
	const session = await getServerSession(authOptions);

	const response: Response = await fetch(ENDPOINT);
	const products: Product[] = await response.json();

	return (
		<div className="bg-gray-100">
			<Header session={session} />

			<main className="max-w-screen-2xl mx-auto">
				<Banner />
				<ProductFeed products={products} />
			</main>
		</div>
	);
};

export default HomePage;
