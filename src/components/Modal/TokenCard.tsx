import React from "react";
import { Flex, Text } from "..";
import styled, { css } from "styled-components";

const Container = styled(Flex)`
  gap: 13px;
  margin: 15px 0px;
  cursor: pointer;
`;

const Avatar = styled.div`
  height: 37px;
  width: 37px;
  border-radius: 50%;
  background: #f4eeee;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 50%;
    /* width: 100%; */
  }
`;
const Details = styled.div``;

interface IToken {
  symbol: string;
  name?: string;
  avatar?: string;
  address: string;
  callback: (arg: string) => void;
}

const TokenCard = ({ symbol, name, avatar, address, callback }: IToken) => {
  return (
    <Container align="center" onClick={() => callback(address)}>
      <Avatar>
        <img src={avatar} />
      </Avatar>
      <Details>
        <Text size="s2" weight="700">
          {symbol}
        </Text>
        <Text size="s2" weight="500">
          {name}
        </Text>
      </Details>
    </Container>
  );
};

export default TokenCard;
