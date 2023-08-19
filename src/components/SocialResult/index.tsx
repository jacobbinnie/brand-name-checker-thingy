import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { ConfirmedSearchQuery } from "@/app/interfaces";
import { SocialPlatform } from "@/app/interfaces/socialPlatforms";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";

interface SocialResultProps {
  search?: ConfirmedSearchQuery;
}

const importantSocials = [
  SocialPlatform.github,
  SocialPlatform.instagram,
  SocialPlatform.facebook,
  SocialPlatform.shopify,
];

const capitialiseString = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

function SocialResult({ search }: SocialResultProps) {
  const { data } = useSWR<Record<SocialPlatform, boolean>>(
    search ? `socials-${search?.query}` : null,
    async () => (await axios(`/api/check-socials?q=${search?.query}`)).data,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  );

  return (
    <div className={"bg-gray-800 rounded-lg p-4 flex flex-col"}>
      <h2 className={"text-center text-2xl font-semibold"}>Socials</h2>
      <p
        className={"text-center text-gray-300 font-semibold"}
      >{`@${search?.query}`}</p>
      {data && (
        <table>
          <tbody>
            {Object.entries(data)
              .filter((d) => importantSocials.includes(d[0] as SocialPlatform))
              .map(([service, available]) => (
                <tr key={service}>
                  <td>{capitialiseString(service)}</td>
                  <td className={"flex justify-center"}>
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
