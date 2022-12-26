import { useState, useEffect } from "react";
import axios from "axios";
import { ListI } from "@/types";

export const useTokenFetch = () => {
  const [loading, setStatus] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ListI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setStatus(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/lists?s=${query}`
      );
      const data = response.data.listings;
      setData(data);
      setStatus(false);
    };

    fetchData();
  }, []);

  return { loading, data };
};
