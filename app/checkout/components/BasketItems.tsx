"use client";
import { useAppSelector } from "@/redux/hooks";
import { selectItems } from "@/redux/slices/basketSlice";
import BasketItem from "@/app/checkout/components/BasketItem";

const BasketItems = () => {
	const selectedProducts = useAppSelector(selectItems);

	return (
		<>
			{selectedProducts.map(product => (
				<BasketItem key={product.uuid} product={product} />
			))}
		</>
	);
};

export default BasketItems;
