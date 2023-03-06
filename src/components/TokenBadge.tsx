import { TokenI } from "@/types";
import React from "react";
import styled from "styled-components";
import { Spacer, Text } from ".";
import { Caret } from "./Icons";

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
  height: 16px;
  /* width: 16px; */
  flex-shrink: 0;
  border-radius: 50%;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
`;

interface BadgeI {
  token: TokenI;
  icon?: string;
  hasCaret?: boolean;
  handleClick: () => void;
}

const TokenBadge = ({ token, hasCaret, handleClick }: BadgeI) => {
  return (
    <Container onClick={() => handleClick()}>
      <ImgWrap>
        <img src={token.avatar} />
      </ImgWrap>
      <Spacer width={6} />
      <Text size="s2" uppercase weight="400">
        {token.symbol}
      </Text>
      <Spacer width={6} />
      {/* {hasCaret && ( */}
      <div>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.5406 7.68966V1H5.45939V7.68966L8.35032 5.04788L9 5.64157L5.32484 9H4.67516L1 5.64157L1.64968 5.04788L4.5406 7.68966Z"
            fill="white"
          />
        </svg>
      </div>
      {/* )} */}
    </Container>
  );
};

export default TokenBadge;
