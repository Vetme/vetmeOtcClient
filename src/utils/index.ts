import { toDefaultDecimal } from "./BigNumber";
import { getSigner } from "./ethersService";
import { CancelToken } from "axios";
import { utils } from "ethers";
import { toast } from "react-toastify";
import moment from "moment";
import { getChainContract } from "@/helpers";

export const tokenExpired = (token: string) => {
  if (token?.length) {
    const expiry = JSON.parse(window.atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  return true;
};

export const toBigNumber = (value: any) => utils.parseEther(value.toString());
export const fromBigNumber = (value: any) =>
  utils.formatUnits(value.toString(), 18);

const pendingRequests: any = {};

// export const makeCancellable = (headers: any, requestId: any) => {
//   if (!requestId) {
//     return headers;
//   }

//   if (pendingRequests[requestId]) {
//     // cancel an existing request
//     pendingRequests[requestId].cancel();
//   }
//   const source = CancelToken.source();
//   const newHeaders = {
//     ...headers,
//     cancelToken: source.token,
//   };
//   pendingRequests[requestId] = source;
//   return newHeaders;
// };

const types = {
  Order: [
    { name: "signatory", type: "address" },
    { name: "receivingWallet", type: "address" },
    { name: "tokenIn", type: "address" },
    { name: "tokenOut", type: "address" },
    { name: "amountOut", type: "uint256" },
    { name: "amountIn", type: "uint256" },
    { name: "deadline", type: "uint256" },
    { name: "nonce", type: "uint256" },
  ],
};

export const generateNonce = () =>
  toDefaultDecimal(Math.round(Math.random() * Date.now()) % 100000).toString(
    10
  );

export const listSign = async (signer: any, value: any, chainId = 1) => {
  const domain = {
    name: "VetMe Escrow",
    version: "1.0.1",
    chainId: chainId,
    verifyingContract: getChainContract(chainId),
  };

  //   const signer = getSigner(provider);

  const signature = await signer?._signTypedData(domain, types, value);
  return { signature };
};

export const parseError = (err: any) => {
  if (err.response && err.response.status == 400) {
    const errors = err.response.data.errors;
    const msg: any = Object.values(errors);
    toast.error(msg[0].msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  } else {
    toast.error(err || "Opps, something went wrong!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const parseSuccess = (msg: string) => {
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    hideProgressBar: true,
  });
};

export const getTradeLink = (id: string) => {
  return `${import.meta.env.VITE_CLIENT_URL}/trades/${id}`;
};

export const getDeadline = (time: number) =>
  Math.floor(new Date().getTime() / 1000.0) + time;

export const formatDateTime = (data: any) =>
  moment(data).format("MMM DD, YYYY (HH:mm:ss)");

export const formatSecTime = (data: any) =>
  moment(data * 1000).format("MMM DD, YYYY (HH:mm:ss)");

export const getForever = 25256820600;

export const getDecimal = (decimal: number | undefined) => {
  switch (decimal) {
    case 9:
      return 1e9;
    case 6:
      return 1e6;
    default:
      1e18;
      break;
  }
};
