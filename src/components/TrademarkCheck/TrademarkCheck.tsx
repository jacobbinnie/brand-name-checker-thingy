import React from "react";
import { TrademarkSchema } from "@/app/interfaces";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface TrademarkCheckProps {
  trademarkData: TrademarkSchema | undefined;
}

function TrademarkCheck({ trademarkData }: TrademarkCheckProps) {
  const renderTrademarks = () => {
    if (!trademarkData) {
      return null;
    }

    const uniqueTrademarks = [""]; // Array to store unique trademarks

    return trademarkData.items.map((trademark) => {
      // Check if the trademark's keyword is already in the uniqueTrademarks array
      if (!uniqueTrademarks.includes(trademark.keyword)) {
        uniqueTrademarks.push(trademark.keyword); // Add the keyword to the uniqueTrademarks array
        return (
          <div
            key={trademark.keyword}
            className="grid grid-cols-2 tracking-tighter justify-between text-tertiary"
          >
            <p>{trademark.keyword}</p>
            <div className="flex justify-end gap-5">
              <p
                className={clsx(
                  trademark.status_definition === "REGISTERED"
                    ? "text-tertiary"
                    : "text-gray-700",
                  "text-right"
                )}
              >
                {trademark.status_label}
              </p>
              {trademark.status_definition !== "REGISTERED" ? (
                <CheckBadgeIcon className="w-5 h-5 text-accent" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-gray-700" />
              )}
            </div>
          </div>
        );
      }

      return null; // Skip rendering if the keyword is not unique
    });
  };

  return (
    <div className={"bg-gray-800 rounded-lg p-4 flex flex-col"}>
      <div className={"flex items-center justify-center gap-2 pb-2"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-accent"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
          />
        </svg>

        <h2 className={"text-center text-2xl font-semibold text-tertiary"}>
          Trademarks
        </h2>
      </div>

      {renderTrademarks()}
    </div>
  );
}

export default TrademarkCheck;
