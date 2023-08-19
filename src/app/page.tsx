"use client";
import DomainSelector from "@/components/DomainSelector";
import LandingInfo from "@/components/LandingInfo";
import Search from "@/components/Search";
import useDomain from "@/hooks/useDomain";
import { useState } from "react";
import SocialResult from "@/components/SocialResult";
import domainEndings from "@/utils/domainEndings.json";
import SelectedDomainTabs from "@/components/SelectedDomainTabs";
import DomainList from "@/components/DomainList/DomainList";
import { handleConstructUrlString } from "@/utils";
import { ConfirmedSearchQuery } from "./interfaces";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [confirmedSearchQuery, setConfirmedSearchQuery] =
    useState<ConfirmedSearchQuery>();

  const handleConfirmSearchQuery = () => {
    setConfirmedSearchQuery({ query: searchQuery, selectedDomains });
  };

  const handleUpdateSelectedDomains = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleUpdateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const {
    data: domainData,
    error: domainError,
    loading: domainLoading,
  } = useDomain(confirmedSearchQuery);

  return (
    <div className="w-full flex px-5 py-20 flex-col min-h-screen gap-5 items-center bg-gray-950">
      <LandingInfo />
      <Search
        searchQuery={searchQuery}
        handleUpdateSearchQuery={handleUpdateSearchQuery}
        loading={domainLoading}
      />
      <SelectedDomainTabs
        selectedDomains={selectedDomains}
        handleUpdateSelectedDomains={handleUpdateSelectedDomains}
      />
      <DomainSelector
        handleUpdateSelectedDomains={handleUpdateSelectedDomains}
        selectedDomains={selectedDomains}
        domains={domainEndings}
      />
      <button
        onClick={() => handleConfirmSearchQuery()}
        disabled={searchQuery.length < 3}
        className="w-full h-8 bg-tertiary transition-all text-primary text-sm disabled:bg-secondary font-bold tracking-tighter flex items-center justify-center rounded-lg max-w-[400px]"
      >
        Search
      </button>

      <div
        className={
          "w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4"
        }
      >
        <DomainList domainData={domainData} />

        {/* Socials TODO: move this into its own component */}
        <SocialResult search={confirmedSearchQuery} />
        {/* SEO TODO: move this into its own component */}
        <div className={"bg-gray-900 rounded-lg p-4"}>
          <h2 className={"text-center text-2xl font-semibold"}>SEO</h2>
        </div>
      </div>
    </div>
  );
}
