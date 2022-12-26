import React from "react";
import { Routes, Route } from "react-router-dom";

import { Page404, Home, Escrow, Trades, List, Chart } from "../views";
import MainLayout from "../views/layouts/main";

const AnimatedRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/list" element={<List />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="doc" element={<Escrow />} />
        <Route path="/trades/:id" element={<Trades />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default AnimatedRouter;
