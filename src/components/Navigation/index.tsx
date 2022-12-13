import React, { useContext, useEffect, useState } from "react";
//import { TextField } from "../Input";
import { CSSTransition } from "react-transition-group";
import {
  NavContainer,
  NavWrapper,
  NavItems,
  Item,
  Logo,
  Action,
  Bar,
  MobileMenu,
  MMenuItem,
  MMenuInner,
} from "./styles";

import { Link, NavLink, useLocation } from "react-router-dom";
import { Avatar, Center, Spacer } from "../";
import { Flex } from "../";
import { Button } from "@/components/Button";
import { Connect } from "../Modal";

interface NavInput {
  account?: string | null;
  connect: () => Promise<void>;
}

const Navigation = () => {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();

  const connectWallet = () => {
    setShow(false);
    alert("Connected");
  };

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <NavContainer>
      <div className="container">
        <NavWrapper>
          <Logo to="/">
            <img src="images/logo.png" />
          </Logo>
          <NavItems>
            <Item
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </Item>
            <Item to="/escrow">P2P Escrow</Item>
            <Item to="/white">White Paper</Item>
            <Item to="/tele">Telegram</Item>
          </NavItems>
          <Action>
            <Button className="primary " onClick={() => setShow(true)}>
              Connect Wallet
            </Button>
          </Action>
          <Bar className={open ? "opened" : ""} onClick={() => setOpen(!open)}>
            <div></div>
          </Bar>
          <MobileMenu className={open ? "added" : ""}>
            <MMenuInner>
              <MMenuItem to="/">Home</MMenuItem>
              <MMenuItem>P2P Escrow</MMenuItem>
              <MMenuItem to="/white">White Paper</MMenuItem>
              <MMenuItem to="/telegram">Telegram</MMenuItem>
              <Center>
                <Button className="primary sm" onClick={() => setShow(true)}>
                  Connect Wallet
                </Button>
              </Center>
            </MMenuInner>
          </MobileMenu>
        </NavWrapper>
      </div>
      <Connect
        show={show}
        connect={() => connectWallet()}
        handleClose={() => setShow(false)}
      />
    </NavContainer>
  );
};

export default Navigation;
