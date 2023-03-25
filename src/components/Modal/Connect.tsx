import React from "react";
import styled from "styled-components";
import { Spacer, Text } from "..";
import { Button } from "../Button";
import { CSSTransition } from "react-transition-group";
import { ConnectorNames } from "@/types";
import { AncIcon } from "../Icons";

const Container = styled.div`
  position: fixed;
  /* top: 0px; */
  /* left: 0px; */
  inset: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 99999;
  background: rgba(242, 255, 245, 0.7);
`;
const Inner = styled.div`
  width: 396px;
  max-width: 95%;
  /* border-radius: 40px; */
  background-repeat: no-repeat;
  background-image: url(/images/bg/wallet-connect.png);
  background-size: 100% 100%;

  /* background-position: top center; */
  /* margin: auto; */
  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, -50%);
  /* text-align: center; */
  padding: 30px;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
  margin: auto;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ConnectButton = styled(Button)`
  display: flex;
  cursor: pointer;
  /* background: #fff; */
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
const Close = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  right: 0px;
  top: -2px;
  background: #170728;
  border: 1px solid #453953;
  border-radius: 12px;
  display: grid;
  place-content: center;
  cursor: pointer;
`;

const Anc = styled.div`
  position: absolute;
  left: 90px;
  top: 0px;

  @media (max-width: 640px) {
    left: 80px;
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
            <Close onClick={handleClose}>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.79355 9.4998L2.42959 3.13584L3.1367 2.42873L9.50066 8.79269L15.8644 2.42893L16.5715 3.13604L10.2078 9.4998L16.5717 15.8638L15.8646 16.5709L9.50066 10.2069L3.1365 16.5711L2.42939 15.864L8.79355 9.4998Z"
                  fill="white"
                />
              </svg>
            </Close>
            <Anc>
              <AncIcon />
            </Anc>
            <Spacer height={24} />
            <Text as="h3" size="h3" sizeM="h3" weight="375" color="#170728">
              Connect Wallet
            </Text>
            <Spacer height={28} />
            <Text as="p" size="normal" weight="300" color="#5D5169">
              To make transactions on our platform all users have to connect
              their wallets. We provide security on all trades so be rest
              assured that your tokens would be well handled. We do this to
              provide the best service
            </Text>
            <Spacer height={35} />
            <ButtonWrap>
              <ConnectButton
                className="primary"
                onClick={() => connect(ConnectorNames["Injected"])}
              >
                <img src="/images/icons/metamask.png" />
                Injected
              </ConnectButton>
              <ConnectButton
                className="primary"
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
