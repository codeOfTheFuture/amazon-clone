"use client";
import { useAppSelector } from "@/redux/hooks";
import { selectItems } from "@/redux/slices/basketSlice";

const CheckoutHeading = () => {
	const items = useAppSelector(selectItems);

	return (
		<h1 className="text-3xl border-b pb-4">
			{items.length === 0 ? "Your Amazon basket is empty" : "Shopping Basket"}
		</h1>
	);
};

export default CheckoutHeading;
