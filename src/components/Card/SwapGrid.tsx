import { tokens } from "@/data";
import { truncate } from "@/helpers";
import { ListI } from "@/types";
import { formatDateTime, formatSecTime, getForever } from "@/utils";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { ActionBtn, Divider, Flex, Spacer, Text, TokenBadge } from "..";
import CustomButton from "../Button/CustomButton";
import { Send, Swap, VToken, VUser } from "../Icons";

const common = css`
  position: absolute;
  color: #453953;
`;

const SwapContainer = styled.div`
  width: 540px;
  max-width: 100%;
  margin-bottom: 27px;
  height: 234px;

  background-image: url(/images/bg/c1.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;

  &.completed {
    filter: blur(0.8px);
    /* background: #13871345; */
  }

  @media (max-width: 640px) {
    margin-bottom: 46px;
  }
`;
const Header = styled.div`
  /* background: rgba(125, 169, 255, 0.47);
  padding: 17px 50px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between; */
  position: relative;

  @media (max-width: 640px) {
    padding: 17px 20px;
  }
`;
const Body = styled.div`
  @media (max-width: 640px) {
    /* padding: 10px; */
  }
`;
const Details = styled.div``;
const Actions = styled.div`
  width: 179px;
  height: 54px;
  display: flex;
  align-self: end;
`;

const TopFRight = styled.div`
  ${common};
  right: 85px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const TopFLeft = styled.div`
  ${common};
  left: 90px;
`;
const BottomFLeft = styled.div`
  ${common};
  right: 70px;
  top: 0px;
`;

const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url(/images/bg/c2.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
  padding: 18px;
  position: relative;
`;

const DetailWrapperT = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 39px 18px 18px;
`;

const ActionWrapper = styled.button`
  background: #ffffff;
  border: 2px solid #7da9ff;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 25px;
  top: -20px;
  position: relative;
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
        <TopFLeft>
          <Text size="s3" uppercase>
            {list.token_out_metadata?.symbol}/{list.token_in_metadata?.symbol}
          </Text>
        </TopFLeft>
        <TopFRight>
          {!list.verified && <VUser />}
          <Text size="s3">{truncate(list.receiving_wallet, 9, "***")}</Text>
        </TopFRight>
      </Header>
      <Body>
        <DetailWrapperT>
          <Flex align="center">
            <TokenBadge
              token={list.token_out_metadata}
              handleClick={() => null}
            />
            <Spacer width={15} widthM={10} />
            <Text uppercase weight="800" sizeM="10px" size="s2" color="#848892">
              Give
            </Text>
          </Flex>
          <Swap />
          <Flex align="center">
            <Text uppercase weight="800" size="s2" sizeM="10px" color="#848892">
              Get
            </Text>
            <Spacer width={15} widthM={10} />
            <TokenBadge
              token={list.token_in_metadata}
              handleClick={() => null}
            />
          </Flex>
        </DetailWrapperT>
        <Price>
          <Text
            style={{ whiteSpace: "nowrap" }}
            uppercase
            size="s1"
            color=" #170728"
          >
            {Number(list.amount_out).toFixed(2)} &nbsp;
            {list.token_out_metadata?.symbol}
          </Text>

          <Text
            uppercase
            size="s1"
            color=" #170728"
            style={{ whiteSpace: "nowrap" }}
          >
            {Number(list.amount_in).toFixed(2)} &nbsp;
            {list.token_in_metadata?.symbol}
          </Text>
        </Price>

        <DetailWrapper>
          <BottomFLeft>
            <Text size="s3">Escrow Fee 3%</Text>
          </BottomFLeft>
          <Details>
            <Text size="s3" color="#5D5169 " uppercase>
              Published : {formatDateTime(list.createdAt)}
            </Text>
            <Text as="div" size="s3" color="#5D5169" uppercase>
              Gain relative to Chart Prices::{" "}
              <Text
                style={{ display: "inline-block" }}
                color={true ? "#12B347" : "#B31212"}
              >
                {" "}
                +10%{" "}
              </Text>
            </Text>
            {/* {Number(list.amount_in).toFixed(2)} &nbsp;
              {list.token_in_metadata?.symbol} */}

            <Text size="s3" color="#5D5169" uppercase>
              Expiry Time :{" "}
              {list.deadline == getForever
                ? "Forever"
                : formatSecTime(list.deadline)}
            </Text>
          </Details>
          <Actions>
            <ActionBtn
              className="sm"
              onClick={() => navigate(`trades/${list._id}`)}
            >
              Trade
            </ActionBtn>
          </Actions>
        </DetailWrapper>
      </Body>
    </SwapContainer>
  );
};

export default SwapGrid;
