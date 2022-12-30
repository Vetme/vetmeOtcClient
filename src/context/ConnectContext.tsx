// context/todoContext.tsx
import React, { useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectorNames } from "@/types";
import { walletconnect } from "@/connector/walletConnect";
import { injected } from "@/connector/injected";
import { parseError } from "@/utils";

export type ConnectContextType = {
  connect: (arg: ConnectorNames) => void;
};

export const ConnectContext = React.createContext<ConnectContextType | null>(
  null
);

interface Props {
  children: React.ReactNode;
}

const ConnectProvider: React.FC<Props> = ({ children }) => {
  const { activate } = useWeb3React<Web3Provider>();

  const connect = async (connector: ConnectorNames) => {
    try {
      if (connector == "Injected") {
        await activate(injected);
      } else {
        await activate(walletconnect, (err) => {
          console.log(err);
        });
      }
    } catch (ex) {
      parseError(ex);
    }
  };

  return (
    <ConnectContext.Provider value={{ connect }}>
      {children}
    </ConnectContext.Provider>
  );
};

export default ConnectProvider;
