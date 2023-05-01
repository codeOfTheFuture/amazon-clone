"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Product } from "@/types/typings";
import { formatCurrency } from "@/utils/formatCurrency";
import Button from "@/components/ButtonWrapper";
import ProductRating from "@/components/ProductRating";
import { addToBasket } from "@/redux/slices/basketSlice";
import { useAppDispatch } from "@/redux/hooks";
import primeTag from "@/assets/prime-tag.png";

interface Props {
	product: Product;
}

const Product = ({ product }: Props): JSX.Element => {
	const PRIME_THRESHOLD = 0.5;
	const hasPrime = Math.random() < PRIME_THRESHOLD;

	const dispatch = useAppDispatch();

	const addItemToBasket = () => {
		const basketItem = { ...product, hasPrime, uuid: crypto.randomUUID() };
		dispatch(addToBasket(basketItem));
	};

	return (
		<div
			className="relative flex flex-col m-5 p-10 bg-white z-30"
			data-testid="product"
			role="product"
		>
			<p className="absolute top-2 right-2 text-xs italic text-gray-400">{product.category}</p>

			<div className="relative w-52 h-52">
				<Image
					src={product.image}
					className="object-contain"
					alt={product.title}
					fill
					sizes="(min-width: 1024px) 20vw, (min-width: 768px) 35vw, 50vw"
				/>
			</div>

			<h4 className="my-3">{product.title}</h4>

			<ProductRating rate={product.rating.rate} />

			<p className="text-xs my-2 line-clamp-2">{product.description}</p>

			<div className="mb-5">{formatCurrency(product.price)}</div>

			{hasPrime && (
				<div className="flex items-center space-x-2 -mt-5">
					<div className="relative w-12 h-12">
						<Image
							src={primeTag}
							className="object-contain"
							alt="Prime Tag"
							fill
							sizes="(min-width: 1024px) 2vw, (min-width: 768px) 5vw"
						/>
					</div>
					<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
				</div>
			)}

			<Button className="button button-active-color mt-auto" onClick={addItemToBasket}>
				Add to Basket
			</Button>
		</div>
	);
};

export default dynamic(() => Promise.resolve(Product), { ssr: false });
