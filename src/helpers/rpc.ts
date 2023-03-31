import { Blockchain } from "@/types";
// import dotenv from "dotenv";
// dotenv.config();

// const {  INFURA_API, ALCHEMY_RPC_API_KEY } = process.env;

// export const alchemyRPCs = {
//   goerli: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_RPC_API_KEY}`,
//   eth: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_RPC_API_KEY}`,
//   polygon: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_RPC_API_KEY}`,
// };

export const ankrRPCs = {
  avax: `https://rpc.ankr.com/avalanche-c`,
  rinkeby: `https://rpc.ankr.com/eth_rinkeby`,
  goerli: `https://rpc.ankr.com/eth_goerli`,
  eth: `https://rpc.ankr.com/eth`,
  bsc: `https://rpc.ankr.com/bsc`,
  polygon: `https://rpc.ankr.com/polygon`,
};

export const defaultRPCs = {
  rinkeby: `https://rpc.ankr.com/eth_rinkeby`,
  goerli: `https://rpc.ankr.com/eth_goerli`,
  eth: `https://rpc.ankr.com/eth`,
  bsc: "https://bsc-dataseed.binance.org/",
  polygon: "https://polygon-rpc.com/",
  avax: "https://api.avax.network/ext/bc/C/rpc",
  avaxfuji: "https://rpc.ankr.com/avalanche_fuji",
};

export function select_rpc_url(chain: Blockchain) {
  return defaultRPCs[chain];
}

export const get_blockchain_from_chainId = (chain: number | undefined) => {
  switch (chain) {
    case 43114:
      return Blockchain.Avax;
    case 43113:
      return Blockchain.AvaxFuji;
    case 137:
      return Blockchain.Polygon;
    case 1:
      return Blockchain.Eth;
    case 56:
      return Blockchain.Bsc;
    case 4:
      return Blockchain.Rinkeby;
    case 5:
      return Blockchain.Goerli;
    default:
      return Blockchain.Rinkeby;
  }
};
