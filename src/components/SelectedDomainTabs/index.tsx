import { XCircleIcon } from "@heroicons/react/20/solid";

interface SelectedDomainTabsProps {
  selectedDomains: string[];
}

function SelectedDomainTabs({ selectedDomains }: SelectedDomainTabsProps) {
  return (
    <div className="w-full max-w-[400px] h-8">
      <div className="flex w-min items-center cursor-pointer bg-accent px-2 rounded-full gap-1 justify-center">
        <p>.com</p>
        <XCircleIcon className="w-4 h-4" />
      </div>
    </div>
  );
}

export default SelectedDomainTabs;
