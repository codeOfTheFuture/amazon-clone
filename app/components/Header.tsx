import Image from "next/image";
import logo from "../assets/amazon_logo.png";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

const Header = () => {
  return (
    <header>
      <div className="flex items-center flex-grow bg-amazon_blue px-1 py-2">
        <div className="flex items-center mt-2 flex-grow sm:flex-grow-0">
          <Image
            src={logo}
            alt="Amazon logo"
            width={150}
            height={40}
            className="object-contain cursor-pointer"
          />
        </div>

        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="px-4 py-2 w-6 h-full flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="flex items-center text-white text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link">
            <p>Hello Jeffrey Oliver</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              0
            </span>

            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:block font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      <div></div>
    </header>
  );
};

export default Header;
