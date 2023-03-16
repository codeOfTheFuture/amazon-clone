interface Props {
  products: any;
}

const ProductFeed = ({ products }: Props) => {
  console.log(products);

  return (
    <div>
      <h1>Products here...</h1>
    </div>
  );
};

export default ProductFeed;
