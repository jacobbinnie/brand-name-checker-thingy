import { ArrowPathIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import SelectedDomainTabs from "../SelectedDomainTabs";
import DomainSelector from "../DomainSelector";
import DomainEndings from "../../utils/domainEndings.json";

interface SearchProps {
  searchQuery: string;
  loading: boolean;
  selectedDomains: string[];
  handleUpdateSearchQuery: (query: string) => void;
  handleUpdateSelectedDomains: (domain: string) => void;
  handleConfirmSearchQuery: () => void;
}

function Search({
  searchQuery,
  loading,
  selectedDomains,
  handleUpdateSearchQuery,
  handleUpdateSelectedDomains,
  handleConfirmSearchQuery,
}: SearchProps) {
  return (
    <div className="w-full max-w-[400px] gap-5 flex flex-col transition-all">
      <div className="w-full relative flex justify-center">
        <input
          onChange={(e) => handleUpdateSearchQuery(e.target.value)}
          className="w-full h-16 border-gray-400 focus:outline-none cursor-pointer focus:cursor-default text-small rounded-lg placeholder:text-small tracking-tighter placeholder:tracking-tighter bg-transparent border-2 focus:border-accent transition-all px-5"
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

      <SelectedDomainTabs
        selectedDomains={selectedDomains}
        handleUpdateSelectedDomains={handleUpdateSelectedDomains}
      />

      <DomainSelector
        handleUpdateSelectedDomains={handleUpdateSelectedDomains}
        selectedDomains={selectedDomains}
        domains={DomainEndings}
      />
      <button
        onClick={() => handleConfirmSearchQuery()}
        disabled={searchQuery.length < 3}
        className="w-full h-12 bg-accent disabled:bg-gray-700 transition-all text-primary font-semibold tracking-tighter flex items-center justify-center rounded-lg max-w-[400px]"
      >
        {loading ? (
          <ArrowPathIcon className="w-5 h-5 text-tertiary animate-spin" />
        ) : (
          <>
            Search
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}

export default Search;
