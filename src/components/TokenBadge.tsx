import { TokenI } from "@/types";
import React from "react";
import styled from "styled-components";
import { Spacer, Text } from ".";
import { Caret, Chart, DropDown } from "./Icons";

const Container = styled.div`
  background: #170728;
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding: 6px 9px;
  color: #fff;
  cursor: pointer;
  height: 32px;
`;
const ImgWrap = styled.div`
  height: 20px;
  width: 20px;
  background: #f6f6f7;
  flex-shrink: 0;
  border-radius: 50%;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: contain;
  }
`;

interface BadgeI {
  token: TokenI;
  icon?: string;
  hasCaret?: boolean;
  hasChart?: boolean;
  handleClick: () => void;
}

const TokenBadge = ({
  token,
  hasCaret = true,
  handleClick,
  hasChart = false,
}: BadgeI) => {
  return (
    <Container onClick={() => handleClick()}>
      <ImgWrap>
        <img src={token.icon} />
      </ImgWrap>
      <Spacer width={6} />
      <Text size="s2" uppercase weight="400">
        {token.symbol}
      </Text>
      <Spacer width={6} />
      {hasCaret && (hasChart ? <Chart /> : <DropDown />)}
    </Container>
  );
};

export default TokenBadge;
