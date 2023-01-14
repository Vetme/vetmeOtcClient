import { useEffect, useState } from "react";
import axios from "axios";

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

import { useLocation } from "react-router-dom";
import { Center } from "../";
import { Button } from "@/components/Button";
import { Connect } from "../Modal";
import { truncate } from "@/helpers";
import { ConnectorNames } from "@/types";
// import { hooks, metaMask } from "@/connector/metaMask";

interface NavInput {
  account?: string | null;
  connect: (arg: ConnectorNames) => Promise<void>;
}

const Navigation = ({ connect, account }: NavInput) => {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();

  const connectWallet = (connector: ConnectorNames) => {
    setShow(false);
    connect(connector);
  };

  // connectMetamask();
  // const connectMetamask = async () => {
  //   const mm = await metaMask.activate(5);
  // };

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    storeUser();
  }, [account]);

  const storeUser = async () => {
    if (!account && account === undefined) return;
    await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, { account });
  };

  return (
    <NavContainer>
      <div className="container">
        <NavWrapper>
          <Logo to="/">
            <img src="/images/logo.png" />
          </Logo>
          <NavItems>
            <Item
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
            >
              Home
            </Item>
            <Item to="test-tokens">Test Token</Item>
            <Item to="p2p">P2P Escrow</Item>
            <a href="https://t.me/vetmeportal" target="_blank" className="item">
              Telegram
            </a>
            <a
              className="item"
              download
              href="https://vetmeblock.com/vetme.pdf"
            >
              White Paper
            </a>
          </NavItems>
          <Action>
            {account ? (
              <Button className="success ">
                {" "}
                {truncate(account || "", 9)}{" "}
              </Button>
            ) : (
              <Button className="primary " onClick={() => setShow(true)}>
                Connect Wallet
              </Button>
            )}
          </Action>
          <Bar className={open ? "opened" : ""} onClick={() => setOpen(!open)}>
            <div></div>
          </Bar>
          <MobileMenu className={open ? "added" : ""}>
            <MMenuInner>
              <MMenuItem to="/">Home</MMenuItem>
              <MMenuItem to="p2p">P2P Escrow</MMenuItem>
              <MMenuItem to="test-tokens">Test Tokens</MMenuItem>
              <MMenuItem to="white-paper">White Paper</MMenuItem>
              <a
                className="mitem"
                target="_blank"
                href="https://t.me/vetmeportal"
              >
                Telegram
              </a>
              <Center>
                {account ? (
                  <Button className="success sm" onClick={() => setShow(true)}>
                    Connected
                  </Button>
                ) : (
                  <Button className="primary sm" onClick={() => setShow(true)}>
                    Connect Wallet
                  </Button>
                )}
              </Center>
            </MMenuInner>
          </MobileMenu>
        </NavWrapper>
      </div>
      <Connect
        show={show}
        connect={(connector) => connectWallet(connector)}
        handleClose={() => setShow(false)}
      />
    </NavContainer>
  );
};

export default Navigation;
