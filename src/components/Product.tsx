import Image from "next/image";
import { Product } from "@/typings";
import { StarIcon } from "@heroicons/react/solid";
import { formatCurrency } from "@/utils/formatCurrency";
import PrimeTag from "@/assets/prime-tag.png";

interface Props {
  product: Product;
}

const Product = ({ product }: Props) => {
  const hasPrime = Math.random() < 0.5;

  return (
    <div className="relative flex flex-col m-5 p-10 bg-white z-30">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>

      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="object-contain h-[200px]"
      />

      <h4 className="my-3">{product.title}</h4>

      <div className="flex">
        {Array(Math.round(product.rating.rate))
          .fill(0)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{product.description}</p>

      <div className="mb-5">{formatCurrency(product.price)}</div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image
            src={PrimeTag}
            alt="Prime Tag"
            width={48}
            height={10}
            className="object-contain"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
};

export default Product;
