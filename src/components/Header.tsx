"use client";
import Image from "next/image";
import logo from "@/assets/amazon_logo.png";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectItems } from "@/redux/slices/basketSlice";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const items = useAppSelector(selectItems);

  return (
    <header>
      <div className="flex items-center flex-grow bg-amazon_blue px-1 py-2">
        <div
          className="flex items-center mt-2 mx-6 flex-grow md:flex-grow-0"
          onClick={() => router.push("/")}>
          <Image
            src={logo}
            alt="Amazon logo"
            width={150}
            height={40}
            className="object-contain cursor-pointer"
          />
        </div>

        <div className="hidden md:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="px-4 py-2 w-6 h-full flex-grow rounded-l-md focus:outline-none"
            type="text"
            placeholder="Search Amazon..."
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="flex items-center text-white text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            onClick={() => (session ? signOut() : signIn())}
            className="link">
            <p>{`Hello, ${session ? session.user?.name : "sign in"}`}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:block font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today&apos;s Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
