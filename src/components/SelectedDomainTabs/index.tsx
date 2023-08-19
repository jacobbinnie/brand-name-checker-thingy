import { XCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface SelectedDomainTabsProps {
  selectedDomains: string[];
  handleUpdateSelectedDomains: (domain: string) => void;
}

const SelectedDomainTabs = ({
  selectedDomains,
  handleUpdateSelectedDomains,
}: SelectedDomainTabsProps) => {
  const renderSelectedDomains = () => {
    return selectedDomains.map((domain) => (
      <div
        key={domain}
        className="flex w-min h-8 items-center cursor-pointer bg-accent px-2 rounded-full gap-1 justify-center"
        onClick={() => handleUpdateSelectedDomains(domain)}
      >
        <p className="text-tertiary">{domain}</p>
        <XCircleIcon className="w-4 h-4" />
      </div>
    ));
  };

  return (
    <div
      className={clsx(
        selectedDomains.length > 0 ? "h-full" : "h-0",
        "w-full max-w-[400px] flex gap-3 flex-wrap"
      )}
    >
      {renderSelectedDomains()}
    </div>
  );
};

export default SelectedDomainTabs;
