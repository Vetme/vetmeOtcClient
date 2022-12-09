import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, BodyWrapper } from "./../../components";
import TopBarProgress from "react-topbar-progress-indicator";
import Navigation from "./../../components/Navigation";
//import { useWeb3React } from "@web3-react/core";
//import { injected } from "connectors/injected";

const MainLayout = () => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  //   const { account, chainId, activate, deactivate, connector, library } =
  //     useWeb3React();

  //   async function connect() {
  //     try {
  //       await activate(injected);
  //     } catch (ex) {
  //       console.error(ex);
  //     }
  //   }

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
    // account, chainId;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);

  return (
    <div>
      <Navigation />
      {progress && <TopBarProgress />}

      <BodyWrapper>
        <Outlet />
      </BodyWrapper>

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
