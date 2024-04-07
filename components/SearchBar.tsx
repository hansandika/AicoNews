import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
	return (
		<button
			type="button"
			className="flexBetween gap-5 w-full lg:w-1/2 px-5 py-3 rounded-lg bg-white text-black-secondary text-heading6 md:text-heading5"
		>
			Search
			<FaMagnifyingGlass />
		</button>
	);
};

export default SearchBar;
