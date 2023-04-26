export declare type TokenI = {
  id?: string | number;
  address: string;
  symbol?: string;
  icon?: string;
  name?: string;
  usd?: number;
};

type statusT = 1 | 2 | 3 | 4 | 5;

export type ListI = {
  _id?: any;
  token_in_metadata: any;
  token_out_metadata: any;
  signatory: string;
  receiving_wallet: string;
  signature: string;
  token_in: string;
  token_out: string;
  amount_in: number | string | any;
  amount_out: number | string | any;
  deadline: number;
  nonce?: number | string;
  is_active: boolean;
  is_private: boolean;
  status?: statusT;
  forever?: boolean;
  createdAt?: any;
  verified?: boolean;
  from_token_verified?: boolean;
  to_token_verified?: boolean;
  is_friction?: boolean;
  amount_out_balance?: any;
  nonce_friction?: any;
  chain?: number;
};

export enum Blockchain {
  Avax = "avax",
  AvaxFuji = "avaxfuji",
  Bsc = "bsc",
  Eth = "eth",
  Polygon = "polygon",
  Rinkeby = "rinkeby",
  Goerli = "goerli",
}

export enum SupportBlockchain {
  Bsc = "Bsc",
  Eth = "Eth",
  Polygon = "Polygon",
}

export enum ConnectorNames {
  Injected = "Injected",
  WalletConnect = "WalletConnect",
}

export type SupportedChainIds = 1 | 56 | 137 | 5;
