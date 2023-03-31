import axios from "axios";

export const BASE_URL =
  import.meta.env.MODE == "development"
    ? import.meta.env.VITE_BASE_URL_PROD
    : import.meta.env.VITE_BASE_URL;

export default {
  getAccount: (account: string | null | undefined) =>
    axios.get(`${BASE_URL}/users/${account}`),
  upDateListComp: (data: any) =>
    axios.patch(`${BASE_URL}/lists/completed/${data.id}`, data),
  updateList: (data: any) => axios.patch(`${BASE_URL}/lists/${data.id}`, data),
  counter: (data: any) => axios.post(`${BASE_URL}/lists/counter`, data),
  getTokenDetails: (address: any) =>
    axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`
    ),
  getCandlestickData: (id: string, days: string) =>
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${days}
`),
  removeList: (data: any) =>
    axios.delete(`${BASE_URL}/lists/${data.id}/${data.account}`),
  getMyListings: (account: string | null | undefined) =>
    axios.get(`${BASE_URL}/lists?account=${account}`),
  myCounters: (account: string | null | undefined) =>
    axios.get(`${BASE_URL}/lists/counter/${account}`),
};
