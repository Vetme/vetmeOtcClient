import { tokens } from "@/data";
import React from "react";
import styled, { css } from "styled-components";
import { Divider, Flex, Spacer, Text, TokenBadge } from "..";
import { Send, Swap } from "../Icons";

interface SwapI {
  from?: string;
  to?: string;
  available?: number;
  limit?: number;
  fee?: number;
}

const SwapContainer = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  width: 508px;
  max-width: 100%;
  margin-bottom: 114px;

  @media (max-width: 640px) {
    margin-bottom: 46px;
  }
`;
const Header = styled.div`
  background: rgba(125, 169, 255, 0.47);
  padding: 17px 50px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Body = styled.div`
  padding: 28px 50px;
`;
const Details = styled.div``;
const Actions = styled.div``;
const ActionWrapper = styled.button`
  background: #ffffff;
  border: 2px solid #7da9ff;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

const SwapGrid = ({}: SwapI) => {
  return (
    <SwapContainer>
      <Header>
        <Text weight="700" size="16px">
          VET/BTC
        </Text>
        <Text weight="700" size="16px">
          762****kjhfks
        </Text>
      </Header>
      <Body>
        <Flex justify="space-between" align="center">
          <TokenBadge token={tokens[1]} handleClick={() => null} />
          <Swap />
          <TokenBadge token={tokens[2]} handleClick={() => null} />
        </Flex>
        <Spacer height={20} />
        <Text size="12px" color="#848892">
          Available : $3200
        </Text>
        <Spacer height={10} />
        <Divider />
        <Spacer height={21} />
        <Flex justify="space-between" align="center">
          <Details>
            <Text size="12px" color="#848892">
              Limit : $20
            </Text>
            <Text size="12px" color="#848892">
              Selling Rate : 1.0
            </Text>
            <Text size="12px" color="#848892">
              Escrow Fee : 3%
            </Text>
          </Details>
          <Actions>
            <ActionWrapper>
              <Send />
            </ActionWrapper>
          </Actions>
        </Flex>
      </Body>
    </SwapContainer>
  );
};

export default SwapGrid;
