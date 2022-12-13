import React from "react";
import styled, { css } from "styled-components";
import { Divider, Flex, IconWrapper, Spacer, Text, TokenBadge } from "..";
import { Button } from "../Button";
import { Send, Swap } from "../Icons";

const SwapContainer = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  width: 508px;
  max-width: 100%;
  margin-bottom: 114px;
  margin: auto;
`;
const Header = styled.div`
  background: rgba(125, 169, 255, 0.47);
  padding: 17px 50px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
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
    height: 58px;
  }
`;
const Input = styled.input`
  height: 100%;
  border: none;
  outline: none;
  flex: 1;
  font-weight: 700;
  font-size: 40px;
  width: 30%;
  color: #8c8c8c;

  @media (max-width: 640px) {
    font-size: 30px;
  }
`;

const IconWrap = styled.div``;

const ListCard = () => {
  return (
    <SwapContainer>
      <Header>
        <Text uppercase weight="700" size="16px">
          List
        </Text>
      </Header>
      <Body>
        <InputCon>
          <label htmlFor="">You give</label>
          <InputBox>
            <Input type="number" step={0.1} />
            <div>
              <TokenBadge symbol="ETH" hasCaret={true} />
            </div>
          </InputBox>
        </InputCon>

        <Spacer height={31} />

        <IconWrapper style={{ textAlign: "center" }} height={10} width={10}>
          <Swap />
        </IconWrapper>

        <Spacer height={6} />

        <InputCon>
          <label htmlFor="">You get</label>
          <InputBox>
            <Input type="number" step={0.1} />
            <div>
              <TokenBadge symbol="ETH" hasCaret={true} />
            </div>
          </InputBox>
        </InputCon>
        <Spacer height={30} />

        <Button className="primary block m-sm">Continue</Button>
      </Body>
    </SwapContainer>
  );
};

export default ListCard;
