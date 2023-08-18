"use client";
import DomainSelector from "@/components/DomainSelector";
import LandingInfo from "@/components/LandingInfo";
import Search from "@/components/Search";
import useDomain from "@/hooks/useDomain";
import clsx from "clsx";
import { useEffect, useState } from "react";
import SocialResult from "@/components/SocialResult";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [domainExpiry, setDomainExpiry] = useState("");
  const [domainAvailable, setDomainAvailable] = useState(false);

  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

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
  } = useDomain(searchQuery);

  useEffect(() => {
    if (domainData === "Available") {
      setDomainAvailable(true);
    } else if (domainData) {
      const parsedData = Date.parse(domainData);
      const newDate = new Date(parsedData);
      setDomainExpiry(newDate.toDateString());
    }
  }, [domainData]);

  useEffect(() => {
    setDomainExpiry("");
    setDomainAvailable(false);
  }, [searchQuery]);

  return (
    <div className="w-full flex px-5 py-20 flex-col min-h-screen gap-5 items-center bg-gray-950">
      <LandingInfo />
      <Search
        searchQuery={searchQuery}
        handleUpdateSearchQuery={handleUpdateSearchQuery}
        loading={domainLoading}
      />
      {domainExpiry && (
        <p className={clsx(domainExpiry !== undefined ? "block" : "hidden")}>
          Sorry, this domain is registered and expires on {domainExpiry}
        </p>
      )}
      {domainAvailable && (
        <p className={clsx(domainExpiry !== undefined ? "block" : "hidden")}>
          Domain available!
        </p>
      )}
      <DomainSelector
        handleUpdateSelectedDomains={handleUpdateSelectedDomains}
        selectedDomains={selectedDomains}
        domains={[
          ".com",
          ".club",
          ".net",
          ".co.nz",
          ".org",
          ".net",
          ".edu",
          ".io",
          ".com.au",
          ".mil",
          ".info",
          ".biz",
          ".us",
          ".co",
          ".io",
          ".tv",
          ".me",
          ".uk",
          ".ca",
          ".au",
          ".de",
          ".jp",
          ".cn",
          ".ru",
          ".br",
          ".es",
          ".it",
          ".nl",
          ".se",
          ".ch",
          ".at",
          ".mx",
          ".za",
          ".in",
          ".kr",
          ".sg",
          ".ae",
          ".sa",
          ".hk",
          ".tw",
          ".no",
          ".dk",
          ".fi",
          ".pl",
          ".pt",
          ".ie",
          ".nz",
          ".tr",
          ".my",
          ".cl",
          ".co.uk",
          ".be",
          ".id",
        ]}
      />
      <div
        className={
          "w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4"
        }
      >
        {/* Domains TODO: move this into its own component */}
        <div className={"bg-gray-900 rounded-lg p-4"}>
          <h2 className={"text-center text-2xl font-semibold"}>Domains</h2>
        </div>
        {/* Socials TODO: move this into its own component */}
        <SocialResult />
        {/* SEO TODO: move this into its own component */}
        <div className={"bg-gray-900 rounded-lg p-4"}>
          <h2 className={"text-center text-2xl font-semibold"}>SEO</h2>
        </div>
      </div>
    </div>
  );
}
