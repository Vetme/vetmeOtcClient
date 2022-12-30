import { useState, useEffect } from "react";
import axios from "axios";
import { ListI } from "@/types";
import { parseError } from "@/utils";

export const useTokenFetch = () => {
  const [loading, setStatus] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ListI[]>([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    source && source.cancel("Operation canceled due to new request");
    source = CancelToken.source();
    setStatus(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/lists?s=${query}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        const data = response.data.listings;
        setData(data);
        setStatus(false);
      })
      .catch((error: any) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled error", error.message);
        } else {
          parseError(error);
        }
      })
      .finally(() => {
        setStatus(false);
      });

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [query]);

  return { loading, data, query, setQuery };
};
