import axios from "axios";

export const truncate = (
  fullStr: string,
  strLen: number,
  separator?: string
) => {
  if (fullStr.length <= strLen) return fullStr;
  separator = separator || "...";

  let sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr?.substr(0, frontChars) +
    separator +
    fullStr?.substr(fullStr?.length - backChars)
  );
};

export const formatExplorerUrl = (address: string) => {
  return `https://test.bscscan.com/address/${address}`;
};
