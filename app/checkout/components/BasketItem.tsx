"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Product } from "@/types/typings";
import ProductRating from "@/components/ProductRating";
import { formatCurrency } from "@/utils/formatCurrency";
import { addToBasket, removeFromBasket } from "@/redux/slices/basketSlice";
import { useAppDispatch } from "@/redux/hooks";
import primeTag from "@/assets/prime-tag.png";
import Button from "@/components/ButtonWrapper";

interface Props {
	product: Product;
}

const BasketItem = ({ product }: Props) => {
	const { uuid, title, image, rating, description, price, hasPrime } = product;

	const dispatch = useAppDispatch();

	const addItemToBasket = (): void => {
		const basketItem = { ...product, uuid: crypto.randomUUID() };
		dispatch(addToBasket(basketItem));
	};

	const removeItemFromBasket = (): void => {
		dispatch(removeFromBasket(uuid));
	};

	return (
		<div className="grid grid-cols-5">
			<div className="relative w-52 h-52">
				<Image
					src={image}
					className="object-contain"
					alt={`Item: ${title}`}
					fill
					sizes="(min-width: 1024px) 20vw, (min-width: 768px) 35vw, 50vw"
				/>
			</div>

			<div className="col-span-3 mx-5">
				<p>{title}</p>

				<ProductRating rate={rating.rate} />

				<p className="text-xs my-2 line-clamp-3">{description}</p>

				<div>{formatCurrency(price)}</div>

				{hasPrime && (
					<div className="flex items-center space-x-2">
						<Image
							src={primeTag}
							alt="Prime Tag"
							width={48}
							height={5}
							className="object-contain"
						/>
						<p className="text-xs text-gray-500">Free Next-day Delivery</p>
					</div>
				)}
			</div>

			<div className="flex flex-col justify-end space-y-2 my-auto">
				<Button className="button button-active-color mt-auto" onClick={addItemToBasket}>
					Add to Basket
				</Button>
				<Button className="button button-active-color mt-auto" onClick={removeItemFromBasket}>
					Remove from Basket
				</Button>
			</div>
		</div>
	);
};

export default dynamic(() => Promise.resolve(BasketItem), { ssr: false });
