import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  IconM,
} from "./styles";

import { useLocation } from "react-router-dom";
import {
  Center,
  Flex,
  Text,
  CustomLink,
  Spacer,
  ActionBtn,
  Overlay,
  BodyTab,
} from "../";
import { Button } from "@/components/Button";
import { Connect } from "../Modal";
import { truncate } from "@/helpers";
import { ConnectorNames } from "@/types";
import { ArrowRight, Decor, LogoSVG } from "../Icons";
// import { hooks, metaMask } from "@/connector/metaMask";

interface NavInput {
  account?: string | null;
  connect: (arg: ConnectorNames) => Promise<void>;
}

const Navigation = ({ connect, account }: NavInput) => {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [direction, setDirection] = useState<number>(0);
  const [prevDirection, setPrevDirection] = useState<number>(0);
  let prevScroll = 0;
  // const [prevScroll, setPrevScroll] = useState<number>(
  //   window.scrollY || document.documentElement.scrollTop
  // );

  const connectWallet = (connector: ConnectorNames) => {
    setShow(false);
    connect(connector);
  };
  var header = document.getElementById("nav");
  const checkScroll = () => {
    let curScroll = window.pageYOffset;

    if (curScroll <= 0) {
      header?.classList.remove("scroll-up");
    }

    if (curScroll > prevScroll && !header?.classList.contains("scroll-down")) {
      header?.classList.remove("scroll-up");
      header?.classList.add("scroll-down");
    }

    if (curScroll < prevScroll && header?.classList.contains("scroll-down")) {
      header?.classList.remove("scroll-down");
      header?.classList.add("scroll-up");
    }
    prevScroll = curScroll;
  };

  // const toggleHeader = (direction: number, curScroll: number) => {
  //   var header = document.getElementById("nav");
  //   if (direction === 1) {
  //     header?.classList.add("hide");
  //     setPrevDirection(direction);
  //   } else if (direction === 1) {
  //     header?.classList.remove("hide");
  //     setPrevDirection(direction);
  //   }
  // };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

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
    <NavContainer id="nav">
      <div className="container">
        <NavWrapper>
          <Logo to="/">
            <LogoSVG />
          </Logo>
          <NavItems>
            <Item
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
            >
              <span>Home</span>
            </Item>
            <Item to="test-tokens">
              <span>Test Token</span>
            </Item>
            <Item to="p2p">
              <span>P2P Escrow</span>
            </Item>
            <a href="https://t.me/vetmeportal" target="_blank" className="item">
              <span>Telegram</span>
            </a>
            <a
              className="item"
              download
              href="https://vetmeblock.com/vetme.pdf"
            >
              <span>White Paper</span>
            </a>
          </NavItems>
          <Action>
            {account ? (
              <Button
                onClick={() => navigate("/dashboard")}
                className="success "
              >
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
            <IconM>
              <Decor />
            </IconM>
            <MMenuInner>
              <MMenuItem to="/">Home</MMenuItem>
              <MMenuItem to="p2p">P2P Escrow</MMenuItem>
              <MMenuItem to="test-tokens">Test Tokens</MMenuItem>
              <MMenuItem to="white-paper">White Paper</MMenuItem>

              <CustomLink href="https://t.me/vetmeportal" target="_blank">
                <Flex align="center" style={{ display: "inline-flex" }}>
                  {" "}
                  <span>{"{"}</span>
                  <Text size="s1" sizeM="s1" uppercase>
                    Telegram
                  </Text>
                  <span>{"}"}</span>
                </Flex>
              </CustomLink>

              <Spacer height={32} />
              {/* <Center>
                {account ? (
                  <Button className="success sm" onClick={() => setShow(true)}>
                    Connected
                  </Button>
                ) : (
                  <Button className="primary sm" onClick={() => setShow(true)}>
                    Connect Wallet
                  </Button>
                )}
              </Center> */}
              <Center>
                <ActionBtn>
                  Visit App{" "}
                  <div>
                    <ArrowRight />
                  </div>
                </ActionBtn>
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
      {open && <Overlay />}
    </NavContainer>
  );
};

export default Navigation;
