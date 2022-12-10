import React, { useContext, useEffect, useState } from "react";
//import { TextField } from "../Input";
import { CSSTransition } from "react-transition-group";
import { NavContainer, NavWrapper, NavItems, Item, Logo } from "./styles";

import { Link, NavLink, useLocation } from "react-router-dom";
import { Avatar, Spacer } from "../";
import { Flex } from "../";
import { Button } from "./../../components/Button";

interface NavInput {
  account?: string | null;
  connect: () => Promise<void>;
}

const Navigation = () => {
  return (
    <NavContainer>
      <NavWrapper>
        <Logo>
          <img src="images/logo.png" />
        </Logo>
        <NavItems>
          <Item to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </Item>
          <Item to="/escrow">P2P Escrow</Item>
          <Item to="/white">White Paper</Item>
          <Item to="/tele">Telegram</Item>
        </NavItems>
        <div>
          <Button className="primary ">Connect Wallet</Button>
        </div>
      </NavWrapper>
    </NavContainer>
  );
};

export default Navigation;
