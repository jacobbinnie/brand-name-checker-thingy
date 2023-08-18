"use client";
import LandingInfo from "@/components/LandingInfo";
import Search from "@/components/Search";
import useDomain from "@/hooks/useDomain";
import clsx from "clsx";
import {useEffect, useState} from "react";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [domainExpiry, setDomainExpiry] = useState("");
    const [domainAvailable, setDomainAvailable] = useState(false);

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
            <LandingInfo/>
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
            <div className={"w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4"}>
                {/* Domains TODO: move this into its own component */}
                <div className={"bg-gray-900 rounded-lg p-4"}>
                    <h2 className={'text-center text-2xl font-semibold'}>Domains</h2>
                </div>
                {/* Socials TODO: move this into its own component */}
                <div className={"bg-gray-900 rounded-lg p-4 flex flex-col "}>
                    <h2 className={'text-center text-2xl font-semibold'}>Socials</h2>
                </div>
                {/* SEO TODO: move this into its own component */}
                <div className={"bg-gray-900 rounded-lg p-4"}>
                    <h2 className={'text-center text-2xl font-semibold'}>SEO</h2>
                </div>
            </div>
        </div>
    );
}
