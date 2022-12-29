import { Blockchain } from "@/types";
import { readOnlyProvider } from "@/utils/ethersService";
import { Web3Provider } from "@ethersproject/providers";
import { Contract, ContractInterface } from "ethers";
import EscrowOtcAbi from "../contracts/escrowOtcApi.json";
import ERC20Abi from "../contracts/erc20Abi.json";
import { get_blockchain_from_chainId, select_rpc_url } from "./rpc";
import { Erc20 } from "@/types/Erc20";
import { listSign, toBigNumber } from "@/utils";
import { utils } from "ethers";
import BigNumber from "bignumber.js";

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
  account: string
) => {
  const chain: Blockchain = get_blockchain_from_chainId(chainId);
  const contract = ERC20Contract(contractAddress, chain, provider);

  const allowance = await contract.allowance(
    account,
    import.meta.env.VITE_CONTRACT_ADDRESS
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
      import.meta.env.VITE_CONTRACT_ADDRESS,
      toBigNumber(amount)
    );
    const { events } = await trxn.wait();

    return Promise.resolve(events);
  } catch (error) {
    return Promise.reject();
  }
};

const generateOrder = (signature: string | undefined, value: any) => {
  return {
    order: { ...value, orderId: utils.keccak256(signature as string) },
    signature,
  };
};

export const matchTokenOrder = async (
  provider: any,
  chainId: number,
  sellerSignature: string | undefined,
  buyerSignature: string,
  value: any,
  account: string,
  nonce: number
) => {
  try {
    const chain: Blockchain = get_blockchain_from_chainId(chainId);
    const sellerValue = {
      signatory: value.signatory,
      receivingWallet: value.receiving_wallet,
      tokenIn: value.token_in,
      tokenOut: value.token_out,
      amountOut: BigNumber(value.amount_out).times(1e18).toString(10),
      amountIn: BigNumber(value.amount_in).times(1e18).toString(10),
      deadline: value.deadline,
      nonce: value.nonce,
    };

    const buyerValue = {
      signatory: account,
      receivingWallet: account,
      tokenIn: value.token_out,
      tokenOut: value.token_in,
      amountOut: BigNumber(value.amount_in).times(1e18).toString(10),
      amountIn: BigNumber(value.amount_out).times(1e18).toString(10),
      deadline: value.deadline,
      nonce: value.nonce,
    };

    const buy = generateOrder(buyerSignature, buyerValue);
    const sell = generateOrder(sellerSignature, sellerValue);

    const contract = EscrowOtcContract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      chain,
      provider
    );
    const signer = contract.connect(provider?.getSigner());
    const trxn = await signer.matchOrder(
      sell.order,
      sell.signature,
      buy.order,
      buy.signature,
      {
        gasLimit: 100000,
      }
    );

    const { events } = await trxn.wait();
    alert();
    return Promise.resolve(events);
  } catch (error) {
    console.log({ line153: error });
    return Promise.reject(error);
  }
};
