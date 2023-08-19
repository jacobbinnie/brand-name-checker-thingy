import {
  BulkDomainSearchResponse,
  ConfirmedSearchQuery,
} from "@/app/interfaces";
import { handleConstructUrlString } from "@/utils";
import { useState, useEffect } from "react";

const useDomain = (confirmedSearchQuery: ConfirmedSearchQuery | undefined) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<BulkDomainSearchResponse>();
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (confirmedSearchQuery && confirmedSearchQuery.query.length > 2) {
      if (timerId) {
        clearTimeout(timerId);
      }

      const urlString = handleConstructUrlString(
        confirmedSearchQuery.query,
        confirmedSearchQuery.selectedDomains
      );

      const newTimer = setTimeout(() => {
        fetch(`/api/check-domain?q=${urlString}`)
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

  return { error, loading, data, setData };
};

export default useDomain;
