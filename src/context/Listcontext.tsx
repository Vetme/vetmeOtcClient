// context/todoContext.tsx
import { ListI } from "@/types";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  generateNonce,
  getTradeLink,
  listSign,
  parseError,
  parseSuccess,
  toBigNumber,
} from "@/utils";
import { hooks } from "@/connector/metaMask";

export type ListContextType = {
  saveList: () => void;
  clearLocal: () => void;
  form: ListI;
  setForm: any;
  loading: boolean;
  privateLink: string;
};

export const ListContext = React.createContext<ListContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const initList: ListI = {
  receiving_wallet: "",
  signatory: "",
  token_in: "",
  token_out: "",
  signature: "",
  amount_in: "",
  amount_out: "",
  is_private: false,
  deadline: "",
  token_in_metadata: null,
  token_out_metadata: null,
  nonce: 0,
  is_active: false,
};

const ListProvider: React.FC<Props> = ({ children }) => {
  const list_data = JSON.parse(localStorage.getItem("list_data") as string);
  const [form, setForm] = React.useState<ListI>(list_data || initList);
  const [privateLink, setPrivateLink] = React.useState<string>("");
  const { useProvider } = hooks;

  const provider = useProvider();

  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const saveList = async () => {
    try {
      setLoading(true);
      let data = { ...form };
      data.token_in = data.token_in_metadata.address;
      data.token_out = data.token_out_metadata.address;
      data.nonce = generateNonce();
      let signatureData = {
        signatory: form.signatory,
        receivingWallet: form.receiving_wallet,
        tokenIn: data.token_in,
        tokenOut: data.token_out,
        amountOut: toBigNumber(data.amount_out),
        amountIn: toBigNumber(data.amount_in),
        deadline: 0,
        nonce: data.nonce,
      };
      const signer = provider?.getSigner();
      const { signature } = await listSign(signer, signatureData);
      data.signature = signature;
      //   data.signature = "signature";
      const {
        data: { list },
      } = await axios.post(`${import.meta.env.VITE_BASE_URL}/lists`, data);
      if (list.is_private) {
        const link = getTradeLink(list._id);
        setPrivateLink(link);
      } else {
        setLoading(false);
        setForm(initList);
        clearLocal();
        navigate("/");
      }
      parseSuccess("Your Token has been Listed");
    } catch (error: any) {
      setLoading(false);
      if (error.message.includes("user rejected signing")) return;
      parseError(error);
    }
  };

  const clearLocal = () => {
    localStorage.removeItem("list_data");
    setPrivateLink("");
    setForm(initList);
  };

  return (
    <ListContext.Provider
      value={{ form, setForm, saveList, loading, clearLocal, privateLink }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;
