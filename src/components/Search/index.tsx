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
        className="w-full h-8 bg-tertiary transition-all text-primary text-sm disabled:bg-secondary font-bold tracking-tighter flex items-center justify-center rounded-lg max-w-[400px]"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
