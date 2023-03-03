import { tokens } from "@/data";
import { truncate } from "@/helpers";
import { ListI } from "@/types";
import React from "react";
import styled, { css } from "styled-components";
import { Divider, Flex, Spacer, Text, TokenBadge, Wrapper } from "..";
import { Button } from "../Button";
import { Send, Swap } from "../Icons";

const Container = styled.div`
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  width: 508px;
  max-width: 100%;
  padding: 25px;

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
const ActionWrapper = styled.div`
  text-align: center;
`;

const SwapGrid = ({ list }: { list: ListI }) => {
  return (
    <Container>
      <Flex justify="space-between">
        <Flex direction="column">
          <Wrapper>
            <Text weight="700">Wallet ID</Text>
            <Text weight="700">
              {" "}
              {truncate(list.receiving_wallet, 9, "***")}
            </Text>
          </Wrapper>
          <Spacer height={33} />
          <Wrapper>
            <Text as="div" size="s2">
              <Text style={{ display: "inline" }} weight="700">
                Limit
              </Text>{" "}
              <span>: $20</span>
            </Text>
            <Text size="s2">
              <Text style={{ display: "inline" }} weight="700">
                Selling Rate
              </Text>{" "}
              : {Number(list.amount_in).toFixed(2)}
            </Text>
            <Text size="s2">
              <Text style={{ display: "inline" }} weight="700">
                Escrow Fee
              </Text>{" "}
              : 3%
            </Text>
          </Wrapper>
        </Flex>
        <ActionWrapper>
          <Flex align="end" gap={10}>
            <Text weight="700">Give</Text>
            <Button className="primary-accent m-sm">
              {list.token_out_metadata.symbol}
            </Button>
          </Flex>
          <Spacer height={16} />
          <Swap />
          <Spacer height={16} />

          <Flex align="end" gap={10}>
            <Text weight="700">Get</Text>
            <Button className="primary-accent m-sm">
              {list.token_in_metadata.symbol}
            </Button>
          </Flex>
        </ActionWrapper>
      </Flex>
    </Container>
  );
};

export default SwapGrid;
