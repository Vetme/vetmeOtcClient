import { Blockchain } from "@/types";
import { readOnlyProvider } from "@/utils/ethersService";
import { Web3Provider } from "@ethersproject/providers";
import { Contract, ContractInterface } from "ethers";
import EscrowOtcAbi from "../contracts/escrowOtcApi.json";
import ERC20Abi from "../contracts/erc20Abi.json";
import WethAbi from "../contracts/wethAbi.json";
import ERC20ClaimAbi from "../contracts/ERC20ClaimAbi.json";
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
  account: string | null | undefined
) => {
  const chain: Blockchain = get_blockchain_from_chainId(chainId);
  const contract = ERC20Contract(contractAddress, chain, provider);

  const allowance = await contract.allowance(
    account as string,
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
  chainId: number | undefined,
  sellerSignature: string | undefined,
  buyerSignature: string,
  value: any,
  account: string | null | undefined
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

    console.log({ buy, sell });

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
        gasLimit: 2000000,
      }
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
