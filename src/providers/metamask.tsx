import React, { useEffect, useState } from "react";
import { injected } from "@/connector/injected";
import { useWeb3React } from "@web3-react/core";
import { Loading, Loading2 } from "@/components/Icons";
import { Text, MetaLoading, Spacer } from "@/components";

function MetamaskProvider({ children }: { children: any }) {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true);
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected);
        }
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [activateNetwork, networkActive, networkError]);
  if (loaded) {
    return children;
  }
  return (
    <MetaLoading>
      <div>
        <Text color="#170728">Connecting your Web3 provider</Text>
        <Spacer height={20} />
        <Loading2 />
      </div>
    </MetaLoading>
  );
}

export default MetamaskProvider;
