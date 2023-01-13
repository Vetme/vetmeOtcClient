import { tokens } from "@/data";
import { truncate } from "@/helpers";
import { ListI } from "@/types";
import { formatDateTime, formatSecTime, getForever } from "@/utils";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Divider, Flex, Spacer, Text, TokenBadge } from "..";
import CustomButton from "../Button/CustomButton";
import { Send, Swap } from "../Icons";

const SwapContainer = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  width: 508px;
  max-width: 100%;
  margin-bottom: 114px;

  &.completed {
    filter: blur(0.8px);
    background: #13871345;
  }

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

const SwapGrid = ({ list }: { list: ListI }) => {
  const navigate = useNavigate();
  function translateY(
    arg0: number
  ): import("csstype").Property.Transform | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <SwapContainer>
      <Header>
        <Text weight="700" size="16px">
          {list.token_out_metadata?.symbol}/{list.token_in_metadata?.symbol}
        </Text>
        <Text weight="700" size="16px">
          {truncate(list.receiving_wallet, 9, "***")}
        </Text>
      </Header>
      <Body>
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <TokenBadge
              token={list.token_out_metadata}
              handleClick={() => null}
            />
            <Spacer width={15} />
            <Text uppercase weight="800" size="12px" color="#848892">
              Give
            </Text>
          </Flex>
          <Swap />
          <Flex align="center">
            <Text uppercase weight="800" size="12px" color="#848892">
              Get
            </Text>
            <Spacer width={15} />
            <TokenBadge
              token={list.token_in_metadata}
              handleClick={() => null}
            />
          </Flex>
        </Flex>
        <Spacer height={10} />
        <Flex justify="space-between">
          <Text uppercase weight="800" size="12px" color="#848892">
            {Number(list.amount_out).toFixed(2)} &nbsp;
            {list.token_out_metadata?.symbol}
          </Text>
          <div style={{ marginTop: "20px" }}>
            <Text size="12px" color="#848892">
              Escrow Fee: 3%
            </Text>
          </div>
          <Text uppercase weight="800" size="12px" color="#848892">
            {Number(list.amount_in).toFixed(2)} &nbsp;
            {list.token_in_metadata?.symbol}
          </Text>
        </Flex>
        <Spacer height={10} />
        <Divider />
        <Spacer height={21} />
        <Flex justify="space-between" align="center">
          <Details>
            <Text size="12px" color="#848892">
              Amount : {Number(list.amount_in).toFixed(2)} &nbsp;
              {list.token_in_metadata?.symbol}
            </Text>
            <Text size="12px" color="#848892">
              Published : {formatDateTime(list.createdAt)}
            </Text>
            <Text size="12px" color="#848892">
              Expiry Time :{" "}
              {list.deadline == getForever
                ? "Forever"
                : formatSecTime(list.deadline)}
            </Text>
          </Details>
          <Actions>
            <CustomButton
              onClick={() => navigate(`trades/${list._id}`)}
              text="Trade"
              classNames="primary"
            />
          </Actions>
        </Flex>
      </Body>
    </SwapContainer>
  );
};

export default SwapGrid;
