import React from "react";
import styled from "styled-components";
import { Spacer, Text } from ".";
import { Caret } from "./Icons";

const Container = styled.div`
  background: #141414;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 6px 9px;
  color: #fff;
  cursor: pointer;
`;
const ImgWrap = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;

interface BadgeI {
  symbol: string;
  icon?: string;
  hasCaret?: boolean;
}

const TokenBadge = ({ symbol, hasCaret }: BadgeI) => {
  return (
    <Container>
      <ImgWrap>
        <img src="/images/btc.png" />
      </ImgWrap>
      <Spacer width={6} />
      <Text uppercase weight="700">
        {symbol}
      </Text>
      <Spacer width={6} />
      {hasCaret && (
        <div>
          <Caret />
        </div>
      )}
    </Container>
  );
};

export default TokenBadge;
