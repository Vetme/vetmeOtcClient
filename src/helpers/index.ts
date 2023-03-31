import axios from "axios";
import {
  fuji_test_tokens,
  eth_tokens,
  goeily_tokens,
  bsc_tokens,
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
    default:
      goeily_tokens;
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
    default:
      import.meta.env.VITE_CONTRACT_ADDRESS_GOEILY_TESTNET;
      break;
  }
};
