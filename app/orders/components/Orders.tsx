import { StripeOrder } from "@/typings";
import Order from "@/app/orders/components/Order";

interface Props {
	orders: StripeOrder[];
}

const Orders = ({ orders }: Props): JSX.Element => {
	return (
		<>
			{orders.map(order => (
				<Order key={order.id} order={order} />
			))}
		</>
	);
};

export default Orders;
