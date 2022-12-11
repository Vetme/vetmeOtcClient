import React from "react";
import styled from "styled-components";
import { Spacer, Text } from ".";

const Container = styled.div`
  background: #141414;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 6px 9px;
  color: #fff;
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
}

const TokenBadge = ({ symbol }: BadgeI) => {
  return (
    <Container>
      <ImgWrap>
        <img src="/images/btc.png" />
      </ImgWrap>
      <Spacer width={6} />
      <Text uppercase weight="700">
        {symbol}
      </Text>
    </Container>
  );
};

export default TokenBadge;
