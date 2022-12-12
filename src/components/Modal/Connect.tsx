import React from "react";
import styled from "styled-components";
import { Spacer, Text } from "..";
import { Button } from "../Button";
import { CSSTransition } from "react-transition-group";

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
  max-width: 100%;
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
  width: 50%;
  margin: auto;
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
              <Button className="primary block" onClick={connect}>
                Connect Wallet
              </Button>
            </ButtonWrap>
          </Inner>
        </Container>
      </CSSTransition>
    </>
  );
};

export default Connect;
