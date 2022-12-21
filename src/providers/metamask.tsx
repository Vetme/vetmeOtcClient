import React, { useEffect, useState } from "react";
import { injected } from "@/connector/injected";
import { useWeb3React } from "@web3-react/core";
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
          //   activateNetwork(injected);
          metaMask.activate(1);
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
