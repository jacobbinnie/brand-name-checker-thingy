import { BulkDomainSearchResponse } from "@/app/interfaces";
import { useState, useEffect } from "react";

const useDomain = (searchQuery: string | undefined) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<BulkDomainSearchResponse>();
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (searchQuery && searchQuery.length > 2) {
      if (timerId) {
        clearTimeout(timerId);
      }

      const newTimer = setTimeout(() => {
        fetch(`/api/check-domain?q=${searchQuery}`)
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
  }, [searchQuery]);

  return { error, loading, data, setData };
};

export default useDomain;
