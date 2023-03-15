import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Divider, Flex, IconWrapper, Spacer, Text, TokenBadge } from "..";
import { Button } from "../Button";
import { LSearch, Send, Swap } from "../Icons";
import { CSSTransition } from "react-transition-group";
import TokenCard from "./TokenCard";
// import { tokens as InitTokens, defaultToken as InitialTokens } from "@/data";
import { useQuery } from "@apollo/react-hooks";
import { DAI_QUERY, ETH_PRICE_QUERY, ETH_TOKEN_QUERY } from "@/apollo";
import { TokenI } from "@/types";
import { ActionSwitch, InputWrapper, SwitchItem2 } from "@/views/home/styles";
import { useTokenFetch } from "@/hooks/customHooks";
import { setLocalToken } from "@/helpers";

const SwapContainer = styled.div`
  width: 396px;
  max-width: 100%;
  margin-bottom: 114px;
  margin: auto;
  background-image: url(/images/bg/list-2.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  .header {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const Header = styled.div`
  background: rgba(125, 169, 255, 0.47);
  padding: 17px 50px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;
const Body = styled.div`
  padding: 16px;
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
    padding: 0px 20px;
  }

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
  font-size: 20px;
  width: 30%;
  color: #8c8c8c;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const IconWrap = styled.div``;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 99999;
  background: rgba(242, 255, 245, 0.7);
  backdrop-filter: blur(5px);
`;

const ResultCon = styled.div`
  background: #ffffff;
  border: 1px solid #2e203e;
  border-radius: 10px;
  max-height: 319px;
  overflow-y: auto;
  padding: 21px 16px;

  @media (max-width: 640px) {
    padding: 21px 16px;
  }
`;
const Tabs = styled(Flex)`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 20px;
`;
const Tab = styled(Text)`
  flex: 1;
  padding: 10px;
  text-align: center;
  position: relative;
  cursor: pointer;
  &.active {
    &:after {
      content: "";
      border-radius: 20px;
      background: rgba(125, 169, 255, 0.47);
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      /* height: 50px; */
      height: 100%;
    }
  }

  &:nth-child(2) {
    cursor: not-allowed;
  }
`;

const Msg = styled.div`
  padding: 10px;
`;

interface TokenSelect {
  handleClose: () => void;
  handleSelected: (arg: TokenI) => void;
  show: boolean;
}

const TokenSelect = ({ show, handleClose, handleSelected }: TokenSelect) => {
  // const [tokens, setTokens] = useState(getD);
  const [sTokens, setSTokens] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const { loading, error, results } = useTokenFetch(query);

  // const refinedData = data?.pairs.map((token: any) => {
  //   return {
  //     id: token.token1.id,
  //     name: token.token1.name,
  //     symbol: token.token1.symbol,
  //   };
  // });

  // console.log(refinedData);
  // const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
  //   variables: {
  //     tokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
  //   },
  // });

  // useEffect(() => {
  //   setSTokens([]);
  // let newToken = refinedData?.filter((token: any) =>
  //   Object.values(token).join("").toLowerCase().includes(query.toLowerCase())
  // );
  //   let newToken = tokens?.filter((token: any) =>
  //     Object.values(token).join("").toLowerCase().includes(query.toLowerCase())
  //   );
  //   setSTokens(newToken);
  // }, [query]);

  const handleSearch = (e: any) => {
    const val = e.target.value;
    setQuery(val);
  };

  const callback = (address: string) => {
    let token = results.find((token) => token.address === address);
    handleSelected(token);

    // setLocalToken(token);
  };

  return (
    <CSSTransition in={show} timeout={400} classNames={"fade"} unmountOnExit>
      <ModalWrapper onClick={handleClose}>
        <SwapContainer onClick={(e) => e.stopPropagation()}>
          <Text className="header" weight="400" size="s3" uppercase>
            Select an asset
          </Text>
          <Spacer height={20} />
          <Body>
            <ActionSwitch className="list">
              <SwitchItem2 className="active">Coin</SwitchItem2>
              <SwitchItem2>Nft</SwitchItem2>
            </ActionSwitch>
            <Spacer height={27} />
            <InputCon>
              <InputWrapper>
                <LSearch />
                <input
                  placeholder="Type a name or address"
                  value={query}
                  type="text"
                  onChange={handleSearch}
                />
              </InputWrapper>
            </InputCon>
            <Spacer height={27} />
            {results?.length ? (
              <ResultCon className="custom-scroll">
                {results?.map((token: any, i: number) => (
                  <TokenCard {...token} key={i} callback={callback} />
                ))}
              </ResultCon>
            ) : (
              <>
                <Msg>
                  <Text>Not Found</Text>
                </Msg>
              </>
            )}
          </Body>
        </SwapContainer>
      </ModalWrapper>
    </CSSTransition>
  );
};

export default TokenSelect;
