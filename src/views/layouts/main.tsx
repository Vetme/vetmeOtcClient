import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, BodyWrapper } from "./../../components";
import TopBarProgress from "react-topbar-progress-indicator";
import Navigation from "./../../components/Navigation";
import { injected } from "@/connector/injected";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectorNames } from "@/types";
import { walletconnect } from "@/connector/walletConnect";
import ConnectProvider from "@/context/ConnectContext";

const MainLayout = () => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();
  const [activatingConnector, setActivatingConnector] = useState<any>();
  const { account, connector, activate, chainId } =
    useWeb3React<Web3Provider>();
  const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
    [ConnectorNames.WalletConnect]: walletconnect,
  };

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  async function connect(connector: ConnectorNames) {
    try {
      if (connector == "Injected") {
        await activate(injected);
      } else {
        await activate(walletconnect, (err) => {
          console.log(err);
        });
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  return (
    <div>
      <ConnectProvider>
        <Navigation {...{ account }} connect={(arg) => connect(arg)} />
        {progress && <TopBarProgress />}

        <BodyWrapper>
          <Outlet />
        </BodyWrapper>
      </ConnectProvider>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
