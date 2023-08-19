import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { ConfirmedSearchQuery } from "@/app/interfaces";
import { SocialPlatform } from "@/app/interfaces/socialPlatforms";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/20/solid";

interface SocialResultProps {
  search?: ConfirmedSearchQuery;
}
function SocialResult({ search }: SocialResultProps) {
  const { data } = useSWR<Record<SocialPlatform, boolean>>(
    search?.query ? `socials-${search?.query}` : null,
    async () =>
      fetch(`/api/check-socials?q=${search?.query}`).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  return (
    <div className={"bg-gray-900 rounded-lg p-4 flex flex-col"}>
      <h2 className={"text-center text-2xl font-semibold"}>Socials</h2>
      {data && (
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([service, available]) => (
              <tr key={service}>
                <td>{service}</td>
                <td>
                  {available ? (
                    <CheckBadgeIcon className="w-5 h-5 text-accent" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-gray-700" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SocialResult;
