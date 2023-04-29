"use client";
import { useAppSelector } from "@/redux/hooks";
import { selectItems } from "@/redux/slices/basketSlice";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import Link from "next/link";

const BasketLink = () => {
	const items = useAppSelector(selectItems);

	return (
		<Link
			className="relative link flex items-center"
			href="/checkout"
			role="link"
		>
			<span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
				{items.length}
			</span>

			<ShoppingCartIcon className="h-10" />
			<p className="hidden md:block font-extrabold md:text-sm mt-2">Basket</p>
		</Link>
	);
};

export default BasketLink;
