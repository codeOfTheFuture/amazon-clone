import Image from "next/image";
import { Product as ProductType } from "@/typings";
import Product from "@/components/Product";
import ProductFeedImage from "@/assets/product-feed-image.jpg";
import crypto from "crypto";

interface Props {
	products: ProductType[];
}

const ProductFeed = ({ products }: Props) => {
	return (
		<div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
			{products.slice(0, 4).map((product: ProductType) => (
				<Product key={crypto.randomUUID()} product={product} />
			))}

			<Image
				src={ProductFeedImage}
				alt="Product Feed Image"
				className="md:col-span-full"
			/>

			<div className="md:col-span-2">
				{products.slice(4, 5).map((product: ProductType) => (
					<Product key={crypto.randomUUID()} product={product} />
				))}
			</div>

			{products.slice(5, products.length).map((product: ProductType) => (
				<Product key={crypto.randomUUID()} product={product} />
			))}
		</div>
	);
};

export default ProductFeed;
