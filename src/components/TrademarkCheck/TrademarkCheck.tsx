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

    return trademarkData.items.map((trademark) => (
      <div
        key={trademark.keyword}
        className="grid grid-cols-2 tracking-tighter justify-between"
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
    ));
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg p-5">
      <h1 className="font-bold tracking-tighter text-xl mb-5">Trademarks</h1>
      {renderTrademarks()}
    </div>
  );
}

export default TrademarkCheck;
