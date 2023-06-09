import { Blockchain } from "@/types";
import { readOnlyProvider } from "@/utils/ethersService";
import { Web3Provider } from "@ethersproject/providers";
import { Contract, ContractInterface } from "ethers";
import EscrowOtcAbi from "../contracts/escrowOtcApi.json";
import ERC20Abi from "../contracts/erc20Abi.json";
import WethAbi from "../contracts/wethAbi.json";
import ERC20ClaimAbi from "../contracts/ERC20ClaimAbi.json";
import GoerliAbi from "../contracts/GoerliAbi.json";
import UniswapAbi from "../contracts/uniswapAbi.json";
import { get_blockchain_from_chainId, select_rpc_url } from "./rpc";
import { Erc20 } from "@/types/Erc20";
import { getDecimal, listSign, toBigNumber } from "@/utils";
import { utils } from "ethers";
import BigNumber from "bignumber.js";
import Moralis from "moralis";
import { pairs } from "@/data";
import axios from "axios";
import { getChainContract } from ".";

const getContract = (
  abi: ContractInterface,
  contract_address: string,
  chain: Blockchain,
  provider?: Web3Provider
): Contract => {
  const defaultProvider = readOnlyProvider(select_rpc_url(chain));
  return new Contract(contract_address, abi, provider ?? defaultProvider);
};

export const EscrowOtcContract = (
  contract_address: string,
  chain: Blockchain,
  provider?: Web3Provider
): any => {
  return getContract(
    EscrowOtcAbi,
    contract_address,
    chain,
    provider
  ) as unknown;
};

export const ERC20Contract = (
  contract_address: string,
  chain: Blockchain,
  provider?: Web3Provider
): Erc20 => {
  return getContract(
    ERC20Abi,
    contract_address,
    chain,
    provider
  ) as unknown as Erc20;
};

export const getTokenAllowance = async (
  contractAddress: string,
  provider: any,
  chainId: number | undefined,
  account: string | null | undefined
) => {
  const chain: Blockchain = get_blockchain_from_chainId(chainId);
  const contract = ERC20Contract(contractAddress, chain, provider);

  const allowance = await contract.allowance(
    account as string,
    getChainContract(chainId)
  );

  return allowance;
};

export const approveToken = async (
  contractAddress: string,
  provider: any,
  chainId: number | undefined,
  amount: any
) => {
  try {
    const chain: Blockchain = get_blockchain_from_chainId(chainId);
    const contract = ERC20Contract(contractAddress, chain, provider);

    const signer = contract.connect(provider?.getSigner());

    const trxn = await signer.approve(
      getChainContract(chainId),
      toBigNumber(amount)
    );
    const { events } = await trxn.wait();

    return Promise.resolve(events);
  } catch (error) {
    return Promise.reject();
  }
};

// orderId: utils.keccak256(signature as string)

const generateOrder = (signature: string | undefined, value: any) => {
  return {
    order: { ...value },
    signature,
  };
};

export const matchTokenOrder = async (
  provider: any,
  chainId: number | undefined,
  sellerSignature: string | undefined,
  buyerSignature: string | undefined,
  value: any,
  account: string | null | undefined
) => {
  try {
    const chain: Blockchain = get_blockchain_from_chainId(chainId);
    const tokenOut = value.token_out; // "0xe7ef051c6ea1026a70967e8f04da143c67fa4e1f";
    // let pair;

    // for (let i = 0; i < pairs.length; i++) {
    //   pair = await getPairToken(tokenOut, pairs[i].address);
    //   if (pair) {
    //     break;
    //   }

    //   if (i == pairs.length - 1) {
    //     throw new Error("Token Pairs not found");
    //   }
    // }

    // pair =
    // import.meta.env.VITE_WETH_ADDRESS ||
    // "0xd00ae08403B9bbb9124bB305C09058E32C39A48c";

    const sellerValue = {
      signatory: value.signatory,
      receivingWallet: value.receiving_wallet,
      tokenIn: value.token_in,
      tokenOut: value.token_out,
      amountOut: new BigNumber(value.amount_out)
        .shiftedBy(value.token_out_metadata.decimal_place)
        .toString(),
      amountIn: new BigNumber(value.amount_in)
        .shiftedBy(value.token_in_metadata.decimal_place)
        .toString(),
      deadline: value.deadline,
      nonce: value.nonce,
    };

    const buyerValue = {
      signatory: account,
      receivingWallet: account,
      tokenIn: value.token_out,
      tokenOut: value.token_in,
      amountOut: new BigNumber(value.aIn)
        .shiftedBy(value.token_in_metadata.decimal_place)
        .toString(),
      amountIn: new BigNumber(value.aOut)
        .shiftedBy(value.token_out_metadata.decimal_place)
        .toString(),
      deadline: value.deadline,
      nonce: value.nonce_friction,
    };

    const buy = generateOrder(buyerSignature, buyerValue);
    const sell = generateOrder(sellerSignature, sellerValue);

    const contract = EscrowOtcContract(
      getChainContract(chainId),
      chain,
      provider
    );

    const signer = contract.connect(provider?.getSigner());

    // console.log(gasLimit);

    // return Promise.reject("error");

    const trxn = await signer.matchSupportFraction(
      sell.order,
      sell.signature,
      buy.order,
      buy.signature
      // {
      //   gasLimit: 200000,
      // }
    );
    const transaction = await trxn.wait();
    return Promise.resolve(transaction);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTotalSupply = async (
  contractAddress: string,
  provider: any,
  chainId: number | undefined
) => {
  try {
    const chain: Blockchain = get_blockchain_from_chainId(chainId);
    const contract = ERC20Contract(contractAddress, chain, provider);
    const totalSupply = await contract.totalSupply();
    return totalSupply;
  } catch (error) {
    return Promise.reject();
  }
};

export const convertWeth = async (
  provider: any,
  chainId: number | undefined
) => {
  const chain: Blockchain = get_blockchain_from_chainId(chainId);

  const contract = getContract(
    WethAbi,
    import.meta.env.VITE_WETH_ADDRESS,
    chain,
    provider
  );
  const signer = contract.connect(provider?.getSigner());

  await signer.deposit({
    value: BigNumber(0.04).times(1e18).toString(10),
    gasLimit: 100000,
  });
};

export const claimToken = async (provider: any, address: any) => {
  const chain: Blockchain = get_blockchain_from_chainId(5);

  const contract = getContract(ERC20ClaimAbi, address, chain, provider);
  const signer = contract.connect(provider?.getSigner());
  const trxn = await signer.claim(
    address,
    BigNumber(100).times(1e18).toString(10)
  );

  const transaction = await trxn.wait();
};

export const claimGeorli = async (provider: any, address: any) => {
  const chain: Blockchain = get_blockchain_from_chainId(5);

  const contract = getContract(GoerliAbi, address, chain, provider);
  const signer = contract.connect(provider?.getSigner());
  const trxn = await signer.claimGoalie();

  const transaction = await trxn.wait();
};

Moralis.start({
  apiKey: "3WYBbAgRqvuDvm55bFeWbzkTmM6RG40Z7qtiL2ZQFnelRUSM6UqBUEjwsfLnZsQ7",
});
const getPairToken = async (tokenOut: string, nToken: string) => {
  try {
    const response = await Moralis.EvmApi.defi.getPairAddress({
      chain: 1,
      exchange: "uniswapv2",
      token0Address: nToken,
      token1Address: tokenOut,
    });

    return response.raw.pairAddress;
  } catch (e) {
    return false;
  }
};

const getPairTokenU = async (provider: any) => {
  const chain: Blockchain = get_blockchain_from_chainId(1);

  const uniswapFactoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
  const contract = getContract(
    UniswapAbi,
    uniswapFactoryAddress,
    chain,
    provider
  );

  const wethAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  const tokenPairAddress = await contract.getPair(
    wethAddress,
    "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9"
  );

  return tokenPairAddress;

  console.log(tokenPairAddress);
};
