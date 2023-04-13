import React from "react";
import { Widget } from "@kyberswap/widgets";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Flex, KWidgetWrapper } from "@/components";

const theme: any = {
  primary: "#170728",
  secondary: "rgba(255,255,255,0.12)",
  dialog: "#170728",
  borderRadius: "20px",
  buttonRadius: "24px",
  stroke: "#5d5169",
  interactive: "#BEFECD",
  accent: "#28E0B9",
  success: "189470",
  warning: "FF9901",
  error: "FF537B",
  text: "#fff",
  subtext: "#fff",
  fontFamily: "Work Sans",
};
const MY_TOKEN_LIST = [
  {
    name: "KNC",
    address: "0x1C954E8fe737F99f68Fa1CCda3e51ebDB291948C",
    symbol: "KNC",
    decimals: 18,
    chainId: 1,
    logoURI: "https://s2.coinmarketcap.com/static/img/coins/64x64/9444.png",
  },
  {
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    symbol: "USDT",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
  },
  {
    name: "USD Coin",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
    decimals: 6,
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    name: "VetMe",
    symbol: "VetMe",
    address: "0xe7ef051c6ea1026a70967e8f04da143c67fa4e1f",
    chainId: 1,
    logoURI: "/images/coins/vetme.webp",
    decimals: 9,
  },
];

const defaultTokenOut = {
  1: "0xe7ef051c6ea1026a70967e8f04da143c67fa4e1f",
};
const Kybar = () => {
  const context = useWeb3React<Web3Provider>();
  const { library, chainId, account } = context;
  return (
    <KWidgetWrapper>
      <Flex justify="center">
        <Widget
          client="yourCompanyNameHere"
          theme={theme}
          tokenList={MY_TOKEN_LIST}
          provider={library}
          defaultTokenOut={defaultTokenOut[1]}
        />
      </Flex>
    </KWidgetWrapper>
  );
};

export default Kybar;
