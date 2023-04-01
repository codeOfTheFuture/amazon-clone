"use client";
import { ReactNode } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addToBasket } from "@/redux/slices/basketSlice";
import { Product } from "@/typings";

interface Props {
  children: ReactNode;
  product: Product;
}

const AddToBasketBtn = ({ children, product }: Props) => {
  const dispatch = useAppDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(product));
  };

  return (
    <button onClick={addItemToBasket} className="mt-auto button">
      {children}
    </button>
  );
};

export default AddToBasketBtn;
