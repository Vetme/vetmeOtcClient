import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 97, 56, 137, 43113, 43114, 80001],
});

export const network = new NetworkConnector({
  urls: {
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    56: "https://bsc-dataseed.binance.org/",
    5: "https://goerli.infura.io/v3/ae69348d48e148e79799e35958268f01",
  },
  defaultChainId: 97,
});
