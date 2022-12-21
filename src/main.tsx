import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import MetamaskProvider from "@/providers/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
import { hooks as metaMaskHooks, metaMask } from "@/connector/metaMask";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "@/connector/walletConnect";
import { MetaMask } from "@web3-react/metamask";
import { Web3Provider } from "@ethersproject/providers";

const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
];

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <MetamaskProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MetamaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);
