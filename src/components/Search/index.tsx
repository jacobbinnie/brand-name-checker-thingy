import { ArrowPathIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full max-w-[400px]">
      <div className="w-full relative flex justify-center">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-16 focus:outline-none animate-black-swoosh focus:animate-none cursor-pointer focus:cursor-default text-small rounded-lg placeholder:text-small tracking-tighter placeholder:tracking-tighter bg-transparent focus:bg-transparent border-2 border-transparent focus:border-tertiary transition-all px-5"
          type="text"
          placeholder="Enter a name..."
          value={searchQuery}
        />
        <ArrowPathIcon
          className={clsx(
            loading ? "block" : "hidden",
            "w-5 h-5 absolute right-5 top-5 animate-spin text-tertiary ml-2",
          )}
        />
        <button
          className={"ml-2 bg-gray-600 px-4 rounded-lg"}
          onClick={() => setSearchTerm()}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
