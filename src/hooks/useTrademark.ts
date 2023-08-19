import {
  BulkDomainSearchResponse,
  ConfirmedSearchQuery,
  TrademarkSchema,
} from "@/app/interfaces";
import { useState, useEffect } from "react";

const useTrademark = (
  confirmedSearchQuery: ConfirmedSearchQuery | undefined
) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<TrademarkSchema>();
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (confirmedSearchQuery && confirmedSearchQuery.query.length > 2) {
      if (timerId) {
        clearTimeout(timerId);
      }

      const newTimer = setTimeout(() => {
        fetch(`/api/check-trademark?q=${confirmedSearchQuery.query}`)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              setData(data);
            } else {
              setData(undefined);
            }
          })
          .catch(() => {
            setError("An error occurred while fetching data.");
          })
          .finally(() => {
            setLoading(false);
          });
      }, 1000); // 1 second delay

      setTimerId(newTimer);
    } else {
      setLoading(false);
      setData(undefined);
    }

    // Clear the timer when the component unmounts or when searchQuery changes
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [confirmedSearchQuery]);

  return { error, loading, data };
};

export default useTrademark;
