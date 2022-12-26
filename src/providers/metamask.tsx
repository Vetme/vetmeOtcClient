import React, { useEffect, useState } from "react";
import { injected } from "@/connector/injected";
import { useWeb3React, Web3ReactHooks } from "@web3-react/core";
import { metaMask } from "@/connector/metaMask";

function MetamaskProvider({ children }: { children: any }) {
  const { isActive: networkActive } = useWeb3React();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true);
        if (isAuthorized && !networkActive) {
          // console.log(injected.getChainId(), "tfis is ");
          metaMask.activate(5);
        }
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [networkActive]);
  if (loaded) {
    return children;
  }
  return <>Loading...</>;
}

export default MetamaskProvider;
