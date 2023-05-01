import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = (): JSX.Element => {
	return (
		<div className="hidden md:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
			<input
				className="px-4 py-2 w-6 h-full flex-grow rounded-l-md focus:outline-none"
				type="text"
				placeholder="Search Amazon"
			/>
			<SearchIcon className="h-12 p-4" />
		</div>
	);
};

export default SearchBar;
