import { providers } from "ethers";

export const readOnlyProvider = (rpc: string) =>
  new providers.JsonRpcProvider(rpc);

export const provider = (pvdr: any) => new providers.Web3Provider(pvdr);

export const getSigner = (pvdr: any) => {
  const _provider = provider(pvdr);
  return _provider.getSigner();
};
