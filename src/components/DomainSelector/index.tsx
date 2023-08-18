import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

interface DomainSelectorProps {
  domains: string[];
  selectedDomains: string[];
  handleUpdateSelectedDomains: (domain: string) => void;
}

const renderMainDomains = (
  domains: string[],
  selectedDomains: string[],
  handleUpdateSelectedDomains: (domain: string) => void
) => {
  return domains.map((domain) => {
    const isSelected = selectedDomains.includes(domain);

    return (
      <div
        onClick={() => handleUpdateSelectedDomains(domain)}
        key={domain}
        className={clsx(
          isSelected ? "text-accent font-bold" : "text-tertiary font-regular",
          "bg-primary flex justify-center items-center cursor-pointer"
        )}
      >
        {domain}
      </div>
    );
  });
};

const renderAlternativeDomains = (
  domains: string[],
  selectedDomains: string[],
  handleUpdateSelectedDomains: (domain: string) => void
) => {
  return domains.map((domain) => {
    const isSelected = selectedDomains.includes(domain);

    return (
      <div
        key={domain}
        onClick={() => handleUpdateSelectedDomains(domain)}
        className={clsx(
          isSelected ? "text-accent font-bold" : "text-tertiary font-regular",
          "w-full px-6 h-16 flex items-center hover:bg-secondary transition-all cursor-pointer"
        )}
      >
        {domain}
      </div>
    );
  });
};

function DomainSelector({
  domains,
  selectedDomains,
  handleUpdateSelectedDomains,
}: DomainSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center items-center max-w-[400px] bg-primary rounded-lg overflow-hidden">
      <div className="w-full flex items-center">
        <div className="w-full grid grid-cols-4 h-16">
          {renderMainDomains(
            domains.slice(0, 4),
            selectedDomains,
            handleUpdateSelectedDomains
          )}
        </div>
        <ChevronDownIcon
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-5 h-5 text-white mr-5 cursor-pointer"
        />
      </div>
      <div
        className={clsx(
          showDropdown ? "h-[200px]" : "h-0",
          "transition-all overflow-scroll no-scrollbar w-full bg-primary"
        )}
      >
        {renderAlternativeDomains(
          domains.slice(4, domains.length),
          selectedDomains,
          handleUpdateSelectedDomains
        )}
      </div>
    </div>
  );
}

export default DomainSelector;
