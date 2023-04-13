import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  Page404,
  Home,
  Escrow,
  Trades,
  List,
  Chart,
  Claim,
  CreateList,
  MyListings,
  Profile,
  History,
  P2p,
  HowTo,
  KybarSwap,
} from "../views";
import MainLayout from "../views/layouts/main";
import Dashboard from "../views/layouts/dashboard";

const AnimatedRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/list/create" element={<CreateList />} />
        <Route path="/list" element={<List />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/p2p" element={<P2p />} />
        <Route path="/how-to" element={<HowTo />} />
        <Route path="/swap" element={<KybarSwap />} />
        <Route path="/test-tokens" element={<Claim />} />
        <Route path="doc" element={<Escrow />} />
        <Route path="/trades/:id" element={<Trades />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<MyListings />} />
          <Route path="/dashboard/my-listings" element={<MyListings />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/history" element={<History />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default AnimatedRouter;
