"use client";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";
import { selectItems, selectTotal } from "@/redux/slices/basketSlice";
import { formatCurrency } from "@/utils/formatCurrency";
import Button from "@/components/ButtonWrapper";

const Checkout = () => {
	const sessionStatus = useSession().status;
	const selectedProducts = useAppSelector(selectItems);
	const total = useAppSelector(selectTotal);

	return (
		<div className="flex flex-col bg-white p-10 shadow-md">
			{selectedProducts.length > 0 && (
				<>
					<h2 className="whitespace-nowrap">
						Subtotal ({selectedProducts.length} items):
						<span className="font-bold ml-2">{formatCurrency(total)}</span>
					</h2>

					<Button
						className={`button mt-2 ${
							sessionStatus === "authenticated"
								? "button-active-color"
								: "button-disabled-color"
						}`}
						onClick={() => {}}
					>
						{sessionStatus === "authenticated"
							? "Proceed to checkout"
							: "Sign in to checkout"}
					</Button>
				</>
			)}
		</div>
	);
};

export default Checkout;
