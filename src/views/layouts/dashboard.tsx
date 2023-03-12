import SideBar from "@/components/Navigation/SideBar";
import { DashBody } from "@/components/Navigation/styles";
import { Dashboard } from "@/styles";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, BodyWrapper } from "../../components";

const DashboardLayout = () => {
  useEffect(() => {}, []);

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
