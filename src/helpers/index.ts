import axios from "axios";
import {
  fuji_test_tokens,
  eth_tokens,
  goeily_tokens,
  bsc_tokens,
  polygon_tokens,
} from "@/data";
import { ethers } from "ethers";
import { Blockchain } from "@/types";

export const truncate = (
  fullStr: string,
  strLen: number,
  separator?: string,
  position: "center" | "start" | "end" = "center"
) => {
  if (fullStr.length <= strLen) return fullStr;
  separator = separator || "...";

  let sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  const result =
    position === "end"
      ? fullStr?.substr(0, frontChars) + separator
      : fullStr?.substr(0, frontChars) +
        separator +
        fullStr?.substr(fullStr?.length - backChars);

  return result;
};

export const formatExplorerUrl = (address: string) => {
  return `https://test.bscscan.com/address/${address}`;
};

export const getDefaultTokens = (chainId = 5) => {
  switch (chainId) {
    case 43113:
      return fuji_test_tokens;
    case 1:
      return eth_tokens;
    case 5:
      return goeily_tokens;
    case 56:
      return bsc_tokens;
    case 137:
      return polygon_tokens;
    default:
      return eth_tokens;
      break;
  }
};
export const getLocalTokens = () => {
  return JSON.parse(localStorage.getItem("localTokens") as string);
};

export const setLocalToken = (data: any) => {
  let lTokens = getLocalTokens();

  if (lTokens) {
    lTokens.push(data);
  } else {
    lTokens = [data];
  }
  localStorage.setItem("localTokens", JSON.stringify(lTokens));
  return true;
};

export const isAddress = (value: string) => ethers.utils.isAddress(value);

export const supportedChainsMainnet = [Blockchain.Bsc, Blockchain.Eth];
export const supportedTestnet = [Blockchain.AvaxFuji, Blockchain.Goerli];

export const getChainContract = (chainId: number | undefined) => {
  switch (chainId) {
    case 43113:
      return import.meta.env.VITE_CONTRACT_ADDRESS_FUJI;
    case 1:
      return import.meta.env.VITE_CONTRACT_ADDRESS_ETH_MAINNET;
    case 5:
      return import.meta.env.VITE_CONTRACT_ADDRESS_GOEILY_TESTNET;
    case 56:
      return import.meta.env.VITE_CONTRACT_ADDRESS_BSC_MAINNET;
    case 137:
      return import.meta.env.VITE_CONTRACT_POLYGON_MAINNET;
    default:
      import.meta.env.VITE_CONTRACT_ADDRESS_ETH_MAINNET;
      break;
  }
};

export const getDailyVolume = () => {
  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS_ETH_MAINNET;
  const API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

  // Get the current Unix timestamp (in seconds) and the Unix timestamp from 24 hours ago
  const now = Math.floor(Date.now() / 1000);
  const yesterday = now - 172800;
  // 86400;

  // Build the API endpoint URL for retrieving the contract's transactions for the last 24 hours
  const endpoint = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${CONTRACT_ADDRESS}&startblock=0&endblock=999999999&sort=desc&apikey=${API_KEY}&starttime=${yesterday}&endtime=${now}`;

  // Make a GET request to the API endpoint
  axios
    .get(endpoint)
    .then((response) => {
      // Extract the transaction data from the API response
      const transactions = response.data.result;

      console.log(transactions);

      // Calculate the total volume of transactions in the last 24 hours
      const totalVolume = transactions.reduce(
        (acc: any, tx: any) => acc + parseInt(tx.value),
        0
      );

      console.log(
        `The daily volume of ${CONTRACT_ADDRESS} transactions is ${totalVolume}`
      );
    })
    .catch((error) => {
      console.error("An error occurred:", error.message);
    });
};

export const computeUsdPrice = (usd: any, amount: number) => {
  return (usd * amount).toFixed(5);
};
