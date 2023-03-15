import SideBar from "@/components/Navigation/SideBar";
import { DashBody } from "@/components/Navigation/styles";
import { Dashboard } from "@/styles";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, BodyWrapper } from "../../components";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const { account } = useWeb3React<Web3Provider>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) navigate("/");
  }, []);

  return (
    <div className="container">
      <Dashboard>
        <SideBar />
        <DashBody>
          <Outlet />
        </DashBody>
      </Dashboard>
    </div>
  );
};

export default DashboardLayout;
