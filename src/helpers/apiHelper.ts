import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default {
  getAccount: (account: string | null | undefined) =>
    axios.get(`${BASE_URL}/users/${account}`),
  upDateList: (data: any) => axios.patch(`${BASE_URL}/lists/${data.id}`, data),
  getTokenDetails: (address: any) =>
    axios.get(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`
    ),
  getCandlestickData: (id: string, days: string) =>
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${days}
`),
};
