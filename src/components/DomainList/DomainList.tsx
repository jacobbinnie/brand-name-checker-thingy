import React from "react";
import { BulkDomainSearchResponse } from "@/app/interfaces";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/20/solid";

interface DomainListProps {
  domainData: BulkDomainSearchResponse | undefined;
}

function DomainList({ domainData }: DomainListProps) {
  const renderDomainResponses = () => {
    if (!domainData) {
      return null;
    }

    return Object.keys(domainData).map((domain) => (
      <div
        key={domain}
        className="flex tracking-tighter items-center justify-between"
      >
        <p>{domain}</p>
        {domainData[domain] ? (
          <CheckBadgeIcon className="w-5 h-5 text-accent" />
        ) : (
          <XCircleIcon className="w-5 h-5 text-red-700" />
        )}
      </div>
    ));
  };

  return (
    <div className="w-full bg-gray-800 rounded-lg p-5">
      <h2 className={"text-center text-2xl font-semibold"}>Domains</h2>
      {renderDomainResponses()}
    </div>
  );
}

export default DomainList;
