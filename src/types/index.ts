export declare type TokenI = {
  id?: string | number;
  address: string;
  symbol?: string;
  avatar?: string;
  name?: string;
};

type status = 1 | 2 | 3 | 4 | 5;

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
  amount_out: number | string;
  deadline: number;
  nonce?: number | string;
  is_active: boolean;
  is_private: boolean;
  status?: status;
};

export enum Blockchain {
  Avax = "avax",
  Bsc = "bsc",
  Eth = "eth",
  Polygon = "polygon",
  Rinkeby = "rinkeby",
  Goerli = "goerli",
}
