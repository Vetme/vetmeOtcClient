import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 97, 56, 137, 43114, 80001],
});

export const network = new NetworkConnector({
  urls: {
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    56: "https://bsc-dataseed.binance.org/",
  },
  defaultChainId: 97,
});
