import { StarIcon } from "@heroicons/react/solid";

interface Props {
	rate: number;
}

const ProductRating = ({ rate }: Props): JSX.Element => {
	return (
		<div className="flex" role="product-rating">
			{Array(Math.round(rate))
				.fill(0)
				.map((_, i) => (
					<StarIcon key={i} className="h-5 text-yellow-500" />
				))}
		</div>
	);
};

export default ProductRating;
