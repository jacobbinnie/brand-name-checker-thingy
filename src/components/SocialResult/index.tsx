import useSWR from "swr";
import { useEffect, useState } from "react";

interface SocialResultProps {
  searchTerm: string;
}
function SocialResult({ searchTerm }: SocialResultProps) {
  const { data } = useSWR<{ available: boolean }>(
    searchTerm ? `socials-${searchTerm}` : null,
    async () =>
      fetch(`/api/check-socials?q=${searchTerm}`).then((res) => res.json()),
  );

  return (
    <div className={"bg-gray-900 rounded-lg p-4 flex flex-col"}>
      <h2 className={"text-center text-2xl font-semibold"}>Socials</h2>
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Instagram</td>
            <td>{data?.available ? "yes" : "no"}</td>
          </tr>
          <tr>
            <td>Facebook</td>
            <td></td>
          </tr>
          <tr>
            <td>Twitter</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SocialResult;
