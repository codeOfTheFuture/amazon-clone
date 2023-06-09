import { StripeOrder } from "@/types/typings";
import { formatCurrency } from "@/utils/formatCurrency";
import moment from "moment";
import Image from "next/image";
import crypto from "crypto";

interface Props {
	order: StripeOrder;
}

const Order = ({ order }: Props): JSX.Element => {
	const { id, amount, amountShipping, items, timestamp, images } = order;

	return (
		<div className="relative border rounded-md">
			<div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
				<div>
					<p className="font-bold text-xs">ORDER PLACED</p>
					<p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
				</div>

				<div>
					<p className="text-xs font-bold">TOTAL</p>
					<p>
						{formatCurrency(amount)} - Next Day Delivery {formatCurrency(amountShipping)}
					</p>
				</div>

				<p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
					{items.length} items
				</p>

				<p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
					ORDER # {id}
				</p>
			</div>

			<div className="p-5 sm:p-10">
				<div className="flex space-x-6 overflow-x-auto">
					{images.map(image => (
						<div key={crypto.randomUUID()} className="relative flex w-16 h-20 sm:w-28 sm:h-32">
							<Image
								src={image}
								alt="Product Image"
								className="object-contain"
								fill
								sizes="(min-width: 1024px) 10vw, (min-width: 768px) 15vw, 20vw"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Order;
