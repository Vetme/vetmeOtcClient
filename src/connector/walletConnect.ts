// import { initializeConnector } from "@web3-react/core";
// import { WalletConnect } from "@web3-react/walletconnect";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
//   (actions) =>
//     new WalletConnect({
//       actions,
//       options: {
//         rpc: {
//           5: "https://goerli.infura.io/v3/ae69348d48e148e79799e35958268f01",
//         },
//       },
//     })
// );
const RPC_URLS: { [chainId: number]: string } = {
  5: "https://goerli.infura.io/v3/ae69348d48e148e79799e35958268f01",
};

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: 5,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});
