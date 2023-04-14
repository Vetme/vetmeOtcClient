import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { ListI } from "@/types";
import { parseError } from "@/utils";
import { getDefaultTokens, getLocalTokens, isAddress } from "@/helpers";
import { BASE_URL } from "@/helpers/apiHelper";
import { chains } from "@/data";

function useThrottle<T>(value: T, interval = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [value, interval]);

  return throttledValue;
}

export const useListFetch = (curChain: string | undefined) => {
  const [loading, setStatus] = useState(true);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ListI[]>([]);

  const chain = chains.find((chain) => chain.name.toLowerCase() == curChain);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let source = CancelToken.source();
    source && source.cancel("Operation canceled due to new request");
    source = CancelToken.source();
    setStatus(true);
    axios
      .get(`${BASE_URL}/lists?s=${query}&chain=${chain ? chain.chainId : 1}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        const data = response.data.listings;
        setData(data);
      })
      .catch((error: any) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled error", error.message);
        } else {
          parseError(error);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setStatus(false);
        }, 1000);
      });

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [query, chain]);

  return { loading, data, query, setQuery };
};

export const useTokenFetch = (query: string, chainId = 1) => {
  const tokens = getDefaultTokens(chainId) as any[];
  const [results, setResults] = useState(tokens);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const throttledTerm = useThrottle(query, 100);

  let res = useMemo(() => {
    let rs = tokens.filter((token: any) =>
      Object.values(token).join("").toLowerCase().includes(query.toLowerCase())
    );
    setResults(rs);
  }, [throttledTerm]);

  console.log(chainId, "here");

  //https: api.coingecko.com/api/v3/coins/ethereum/contract/
  // ​/coins​/{id}​/contract​/{contract_address}​/market_chart​/

  if (results.length < 1) {
    if (isAddress(query)) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${chainId}/contract/${query}`
        )
        .then(({ data }) => {
          let rs = [
            {
              symbol: data.symbol,
              name: data.name,
              icon: data?.image?.small,
              address: data?.contract_address,
              decimal_place: data?.detail_platforms.ethereum.decimal_place,
            },
          ];

          setResults(rs);
        });
    }
  }

  // const localTokens = getLocalTokens();
  // results = localTokens ? [...localTokens].concat(results) : results;

  return {
    results,
    loading,
    error,
  };
};
