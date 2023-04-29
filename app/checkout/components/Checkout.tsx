"use client";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";
import { selectItems, selectTotal } from "@/redux/slices/basketSlice";
import { formatCurrency } from "@/utils/formatCurrency";
import Button from "@/components/ButtonWrapper";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.stripe_public_key!);

const Checkout = () => {
	const email = useSession().data?.user?.email;
	const sessionStatus = useSession().status;
	const selectedProducts = useAppSelector(selectItems);
	const total = useAppSelector(selectTotal);

	const createCheckoutSession = async () => {
		if (sessionStatus === "authenticated") {
			console.log("Checkout session client");

			try {
				const stripe = await stripePromise;

				const response = await fetch("/api/checkout_sessions", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						selectedProducts,
						email,
					}),
				});

				const checkoutSession = await response.json();

				console.log("checkout session: ", checkoutSession);

				const result = await stripe?.redirectToCheckout({
					sessionId: checkoutSession.id,
				});

				if (result?.error) alert(result.error.message);
			} catch (error: any) {
				console.error(error.message);
			}
		}
	};

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
						onClick={createCheckoutSession}
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
