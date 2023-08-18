import { ArrowPathIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface SearchProps {
  searchQuery: string;
  handleUpdateSearchQuery: (query: string) => void;
  loading: boolean;
}

function Search({
  searchQuery,
  handleUpdateSearchQuery,
  loading,
}: SearchProps) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="w-full relative flex justify-center">
        <input
          onChange={(e) => handleUpdateSearchQuery(e.target.value)}
          className="w-full h-16 focus:outline-none animate-black-swoosh focus:animate-none cursor-pointer focus:cursor-default text-small rounded-lg placeholder:text-small tracking-tighter placeholder:tracking-tighter bg-transparent focus:bg-transparent border-2 border-transparent focus:border-tertiary transition-all px-5"
          type="text"
          placeholder="Enter a name..."
          value={searchQuery}
        />
        <ArrowPathIcon
          className={clsx(
            loading ? "block" : "hidden",
            "w-5 h-5 absolute right-5 top-5 animate-spin text-tertiary ml-2"
          )}
        />
      </div>
    </div>
  );
}

export default Search;
