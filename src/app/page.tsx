"use client";
import DomainSelector from "@/components/DomainSelector";
import LandingInfo from "@/components/LandingInfo";
import Search from "@/components/Search";
import useDomain from "@/hooks/useDomain";
import { useState } from "react";
import SocialResult from "@/components/SocialResult";
import DomainList from "@/components/DomainList/DomainList";
import { ConfirmedSearchQuery } from "./interfaces";
import useTrademark from "@/hooks/useTrademark";
import TrademarkCheck from "@/components/TrademarkCheck/TrademarkCheck";

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

  const {
    data: trademarkData,
    error: trademarkError,
    loading: trademarkLoading,
  } = useTrademark(confirmedSearchQuery);

  return (
    <div className="w-full flex px-5 py-20 flex-col min-h-screen gap-5 items-center bg-gray-950">
      <LandingInfo />
      <Search
        searchQuery={searchQuery}
        loading={domainLoading}
        selectedDomains={selectedDomains}
        handleUpdateSearchQuery={handleUpdateSearchQuery}
        handleUpdateSelectedDomains={handleUpdateSelectedDomains}
        handleConfirmSearchQuery={handleConfirmSearchQuery}
      />

      <div
        className={
          "w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4"
        }
      >
        <DomainList domainData={domainData} />

        {/* Socials TODO: move this into its own component */}
        <SocialResult search={confirmedSearchQuery} />

        <TrademarkCheck trademarkData={trademarkData} />
      </div>
    </div>
  );
}
