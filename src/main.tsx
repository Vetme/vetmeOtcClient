import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import MetamaskProvider from "@/providers/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
// import { hooks as metaMaskHooks, metaMask } from "@/connector/metaMask";
// import {
//   hooks as walletConnectHooks,
//   walletConnect,
// } from "@/connector/walletConnect";
import { MetaMask } from "@web3-react/metamask";
import { Web3Provider } from "@ethersproject/providers";
import ListProvider from "./context/Listcontext";
import { Buffer } from "buffer";
// import dotenv from "dotenv";

window.Buffer = window.Buffer || Buffer;

// dotenv.config();
// const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
//   [metaMask, metaMaskHooks],
//   [walletConnect, walletConnectHooks],
// ];

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

setTimeout(() => {
  return ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  ).render(
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetamaskProvider>
          <BrowserRouter>
            <ListProvider>
              <App />
            </ListProvider>
          </BrowserRouter>
        </MetamaskProvider>
      </Web3ReactProvider>
    </React.StrictMode>
  );
}, 5000);
