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
      <div key={domain} className="flex items-center justify-between">
        <p>{domain}</p>
        {domainData[domain] ? (
          <CheckBadgeIcon className="w-5 h-5 text-accent" />
        ) : (
          <XCircleIcon className="w-5 h-5 text-red-700" />
        )}
      </div>
    ));
  };

  return <div className="w-full">{renderDomainResponses()}</div>;
}

export default DomainList;
