import React from "react";
import styled from "styled-components";
import { Spacer, Text } from "..";
import { Button } from "../Button";
import { CSSTransition } from "react-transition-group";
import { ConnectorNames } from "@/types";

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 99999;
  background: rgba(217, 217, 217, 0.44);
`;
const Inner = styled.div`
  width: 662px;
  max-width: 95%;
  background: #141414;
  border-radius: 40px;
  /* margin: auto; */
  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 30px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  width: 70%;
  margin: auto;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ConnectButton = styled.div`
  display: flex;
  cursor: pointer;
  background: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    padding: 10px 15px;
  }
`;

interface IConnect {
  handleClose: () => void;
  show: boolean;
  connect: (args: any) => void;
}

const Connect = ({ connect, handleClose, show }: IConnect) => {
  return (
    <>
      <CSSTransition in={show} timeout={400} classNames={"alert"} unmountOnExit>
        <Container onClick={handleClose}>
          <Inner onClick={(e) => e.stopPropagation()}>
            <Text as="h3" color="#fff">
              Connect Wallet
            </Text>
            <Spacer height={35} />
            <Text as="p" color="#fff">
              To make transactions on our platform all users have to connect
              their wallets. We provide security on all trades so be rest
              assured that your tokens would be well handled. We do this to
              provide the best service
            </Text>
            <Spacer height={35} />
            <ButtonWrap>
              <ConnectButton
                className="primary block m-sm"
                onClick={() => connect(ConnectorNames["Injected"])}
              >
                <img src="/images/icons/metamask.png" />
                Injected
              </ConnectButton>
              <ConnectButton
                className="primary block m-sm"
                onClick={() => connect(ConnectorNames["WalletConnect"])}
              >
                <img src="/images/icons/wallet-connect.png" />
                Wallet Connect
              </ConnectButton>
            </ButtonWrap>
          </Inner>
        </Container>
      </CSSTransition>
    </>
  );
};

export default Connect;
