import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Divider, Flex, IconWrapper, Spacer, Text, TokenBadge } from "..";
import { Button } from "../Button";
import { Send, Swap } from "../Icons";
import { CSSTransition } from "react-transition-group";
import TokenCard from "./TokenCard";
import { tokens as InitTokens } from "@/data";

const SwapContainer = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  width: 508px;
  max-width: 100%;
  margin-bottom: 114px;
  /* margin: auto; */
  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, -50%);
`;
const Header = styled.div`
  background: rgba(125, 169, 255, 0.47);
  padding: 17px 50px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    padding: 10px 24px;
  }
`;
const Body = styled.div`
  padding: 28px 50px;

  @media (max-width: 640px) {
    padding: 20px 25px;
  }
`;
const InputCon = styled.div`
  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    color: #848892;
  }
`;
const InputBox = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 20px;
  height: 80px;
  align-items: center;
  padding: 0px 26px;

  @media (max-width: 640px) {
    padding: 0px 20px;
  }

  @media (max-width: 640px) {
    height: 58px;
  }
`;
const Input = styled.input`
  height: 100%;
  border: none;
  outline: none;
  flex: 1;
  font-weight: 700;
  font-size: 20px;
  width: 30%;
  color: #8c8c8c;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const IconWrap = styled.div``;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 99999;
  background: rgba(217, 217, 217, 0.44);
`;

const ResultCon = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 20px;
  padding: 32px 21px;
  max-height: 210px;
  overflow-y: auto;

  @media (max-width: 640px) {
    padding: 10px 21px;
  }
`;
const Tabs = styled(Flex)`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 20px;
`;
const Tab = styled(Text)`
  flex: 1;
  padding: 10px;
  text-align: center;
  position: relative;
  cursor: pointer;
  &.active {
    &:after {
      content: "";
      border-radius: 20px;
      background: rgba(125, 169, 255, 0.47);
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      /* height: 50px; */
      height: 100%;
    }
  }

  &:nth-child(2) {
    cursor: not-allowed;
  }
`;

const Msg = styled.div`
  padding: 10px;
`;

interface TokenSelect {
  handleClose: () => void;
  handleSelected: (arg: string) => void;
  show: boolean;
}

const TokenSelect = ({ show, handleClose, handleSelected }: TokenSelect) => {
  const [tokens, setTokens] = useState(InitTokens);
  const [sTokens, setSTokens] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setSTokens([]);
    let newToken = tokens.filter((token) =>
      Object.values(token).join("").toLowerCase().includes(query.toLowerCase())
    );
    setSTokens(newToken);
  }, [query]);

  const handleSearch = (e: any) => {
    const val = e.target.value;
    setQuery(val);
  };

  const callback = (val: string) => {
    handleSelected(val);
  };

  return (
    <CSSTransition in={show} timeout={400} classNames={"fade"} unmountOnExit>
      <ModalWrapper onClick={handleClose}>
        <SwapContainer onClick={(e) => e.stopPropagation()}>
          <Header>
            <Text weight="700" size="16px">
              Select an asset
            </Text>
          </Header>
          <Body>
            <Tabs>
              <Tab className="active">Coin</Tab>
              <Tab title="Not yet available">Nft</Tab>
            </Tabs>

            <Spacer height={27} />

            <InputCon>
              <InputBox>
                <Input
                  onChange={handleSearch}
                  type="text"
                  placeholder="Search name or place address"
                />
              </InputBox>
            </InputCon>
            <Spacer height={27} />

            {sTokens.length ? (
              <ResultCon>
                {sTokens.map((token: any, i) => (
                  <TokenCard {...token} key={i} callback={callback} />
                ))}
              </ResultCon>
            ) : (
              <>
                <Msg>
                  <Text>Not Found</Text>
                </Msg>
              </>
            )}
          </Body>
        </SwapContainer>
      </ModalWrapper>
    </CSSTransition>
  );
};

export default TokenSelect;
