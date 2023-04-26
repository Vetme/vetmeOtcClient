import { useEffect, useState, useMemo } from "react";
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
  IconM,
  DropDownCon,
  Notify,
  Count,
  MMenuR,
  ChainWrapper,
  ListItem,
} from "./styles";

import { useLocation, useNavigate } from "react-router-dom";
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
import { ConnectorNames, SupportBlockchain, SupportedChainIds } from "@/types";
import {
  ArrowRight,
  Decor,
  LogoSVG,
  Wallet,
  Logout,
  Bell,
  AngleDown,
} from "../Icons";
import { BASE_URL } from "@/helpers/apiHelper";
import { chains } from "@/data";
import { InputChainId } from "@moralisweb3/common-evm-utils";
import { parseError } from "@/utils";
// import { hooks, metaMask } from "@/connector/metaMask";

interface NavInput {
  account?: string | null;
  connect: (arg: ConnectorNames) => Promise<void>;
  disconnect: () => void;
  nCount: number;
  chainId: number | undefined;
  library: any;
}

const Navigation = ({
  connect,
  account,
  chainId,
  disconnect,
  nCount,
  library,
}: NavInput) => {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [cMenu, setCMenu] = useState<boolean>(false);
  const [activeChain, setChain] = useState<
    SupportedChainIds | number | undefined
  >(1);
  const location = useLocation();
  const navigate = useNavigate();
  const allChains = useMemo(() => chains, []);
  let prevScroll = 0;

  const connectWallet = (connector: ConnectorNames) => {
    setShow(false);
    connect(connector);
  };
  const handleDisconnect = () => {
    disconnect();
    setMenu(false);
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

  window.addEventListener("scroll", checkScroll);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [location]);

  useEffect(() => {
    storeUser();
  }, [account]);

  useEffect(() => {
    setChain(chainId || 1);
  }, [chainId]);

  const storeUser = async () => {
    if (!account && account === undefined) return;
    await axios.post(`${BASE_URL}/users`, { account });
  };

  const handleSetChain = (chain: any) => {
    account ? switchNetwork(chain.chainIdHEx) : setChain(chain.chainId);
    localStorage.setItem("chain", JSON.stringify(chain.name.toLowerCase()));
    navigate(`/${chain.name.toLowerCase()}`);
    setCMenu(false);
  };

  const switchNetwork = async (chainHex: any) => {
    try {
      await library?.provider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainHex }],
      });
    } catch (switchError: any) {
      parseError(switchError?.message);
    }
  };

  const currentChain = () => {
    const c = allChains.find((chain) => chain.chainId == activeChain);
    return c ? c.name : "UnSupported";
  };

  return (
    <>
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
              <Item to="p2p">
                <span>P2P Escrow</span>
              </Item>
              {/* <Item to="swap">
                <span>Swap</span>
              </Item> */}
              <a
                className="item"
                download
                target="_blank"
                href="https://vetmeblock.com/assets/whitepaper.pdf"
              >
                <span>White Paper</span>
              </a>
              <Item to="/how-to">How to</Item>
            </NavItems>
            <Action>
              <ChainWrapper>
                <Button
                  onClick={() => setCMenu((prev) => !prev)}
                  className="secondary"
                >
                  {currentChain()}
                  <AngleDown />
                </Button>

                <DropDownCon className={cMenu ? "active" : ""}>
                  {allChains.map((chain, i) => (
                    <ListItem key={i} onClick={() => handleSetChain(chain)}>
                      <div className="icon">
                        <img src={chain.logoUrl} />
                      </div>
                      {chain.name}
                    </ListItem>
                  ))}
                </DropDownCon>
              </ChainWrapper>
              <Spacer width={8} />
              {account ? (
                <Flex align="center">
                  <Button
                    onClick={() => setMenu((prev) => !prev)}
                    className="secondary"
                  >
                    <Wallet />
                    {truncate(account || "", 9)}
                  </Button>
                  <Notify>
                    <Bell />
                    {nCount > 0 && <Count>{nCount}</Count>}
                  </Notify>
                </Flex>
              ) : (
                <Button className="primary " onClick={() => setShow(true)}>
                  Connect Wallet
                </Button>
              )}
              <DropDownCon className={menu ? "active" : ""}>
                <MMenuItem style={{ textAlign: "start" }} to="/dashboard">
                  My Trades
                </MMenuItem>
                <Button className="primary " onClick={handleDisconnect}>
                  <Logout />
                  Disconnect
                </Button>
              </DropDownCon>
            </Action>
            <MMenuR>
              <Notify>
                <Bell />
                {nCount > 0 && <Count>{nCount}</Count>}
              </Notify>
              <Bar
                className={open ? "opened" : ""}
                onClick={() => setOpen(!open)}
              >
                <div></div>
              </Bar>
            </MMenuR>
            <MobileMenu className={open ? "added" : ""}>
              <IconM>
                <Decor />
              </IconM>
              <MMenuInner>
                <MMenuItem to="/">Home</MMenuItem>
                <MMenuItem to="p2p">P2P Escrow</MMenuItem>
                {/* <MMenuItem to="swap">Swap</MMenuItem> */}
                {/* <MMenuItem to="test-tokens">Test Tokens</MMenuItem> */}
                <MMenuItem
                  target="_blank"
                  to="https://vetmeblock.com/assets/whitepaper.pdf"
                >
                  White Paper
                </MMenuItem>
                <MMenuItem to="/how-to">How to</MMenuItem>

                <Spacer height={32} />
                <Center>
                  {account ? (
                    <Flex align="center">
                      <Button
                        onClick={() => navigate("/dashboard")}
                        className="secondary "
                      >
                        <Wallet /> {truncate(account || "", 9)}{" "}
                      </Button>
                    </Flex>
                  ) : (
                    <Button className="primary" onClick={() => setShow(true)}>
                      Connect Wallet
                    </Button>
                  )}
                </Center>
                <Spacer height={12} />

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
        {open && <Overlay />}
      </NavContainer>
      <Connect
        show={show}
        connect={(connector) => connectWallet(connector)}
        handleClose={() => setShow(false)}
      />
    </>
  );
};

export default Navigation;
