import axios from "axios";
import { tokens as InitTokens, defaultToken as InitialTokens } from "@/data";
import { ethers } from "ethers";

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

export const getDefaultTokens = () => {
  return import.meta.env.VITE_APP_MODE === "testnet"
    ? InitTokens
    : InitialTokens;
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
  console.log(lTokens, "local");

  localStorage.setItem("localTokens", JSON.stringify(lTokens));
  return true;
};

export const isAddress = (value: string) => ethers.utils.isAddress(value);
