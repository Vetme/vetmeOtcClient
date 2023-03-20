import { ListContext, ListContextType } from "@/context/Listcontext";
import { tokens } from "@/data";
import { ListI, TokenI } from "@/types";
import React, { useState, useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  ActionBtn,
  Center,
  Divider,
  Flex,
  IconWrapper,
  Input,
  InputBox,
  InputCon,
  InputInner,
  Spacer,
  Text,
  TokenBadge,
} from "..";
import { Button } from "../Button";
import { Send, Swap, Add, ArrowRight } from "../Icons";
import { Connect as ConnectModal, Settings, TokenSelect } from "../Modal";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectContext, ConnectContextType } from "@/context/ConnectContext";
import Toggle from "../Toggle";
import { parseError } from "@/utils";

// import { hooks, metaMask } from "@/connector/metaMask";
const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 99999;
  background: rgba(242, 255, 245, 0.7);
`;
const SwapContainer = styled.div`
  width: 431px;
  max-width: 100%;
  /* margin-bottom: 114px; */
  /* background: #ffffff; */
  margin: auto;
  background-image: url(/images/bg/counter-offer.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  position: relative;

  .header {
    position: absolute;
    left: 64px;

    @media (max-width: 640px) {
      left: 48px;
      font-size: 12px;
    }
  }

  @media (max-width: 640px) {
    width: 90%;
    background-image: url(/images/bg/counter-offer.png);
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 100% 100%;
    border-radius: 10px;
  }
`;

const Body = styled.div`
  padding-top: 52px;

  @media (max-width: 640px) {
    /* padding: 20px 25px; */
  }
`;

const Inner = styled.div`
  left: 50%;
  top: 50%;
  width: fit-content;
  position: relative;
  transform: translate(-50%, -50%);
  /* padding: 50px 16px; */

  @media (max-width: 640px) {
    left: 50%;
    top: 10%;
    transform: translate(-50%, 0%);
    position: relative;
  }
`;

const Close = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  right: 0px;
  top: 0px;
  background: #170728;
  border: 1px solid #453953;
  border-radius: 12px;
  display: grid;
  place-content: center;
  cursor: pointer;
  z-index: 99;

  @media (max-width: 640px) {
    width: 50px;
    height: 50px;
    top: 15px;
    right: 18px;
  }
`;

const DetailsWrapper = styled.div`
  padding: 56px 16px 16px;
`;

const InputWrapper = styled.div`
  width: 100%;
  background-image: url(/images/bg/counter-divide.png);
  background-repeat: no-repeat;
  background-position: top;
  padding: 24px 16px 16px;
`;

interface ICounter {
  handleClose: () => void;
  show: boolean;
  firstOffer: ListI;
}

const ListCard = ({ handleClose, show, firstOffer }: ICounter) => {
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  const isValid = () => {
    // return form.amount_in !== (0 || "") && form.amount_out !== (0 || "");
  };

  const handleChange = (e: any) => {
    let value = e.target.value;
    const name = e.target.name;

    setForm((initialState: any) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    alert();
    // navigate("/list");
  };

  return (
    <>
      <CSSTransition
        in={show}
        timeout={400}
        classNames={"alert-up"}
        unmountOnExit
      >
        <Container onClick={handleClose}>
          <Inner onClick={(e) => e.stopPropagation()}>
            <Close onClick={handleClose}>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.79355 9.4998L2.42959 3.13584L3.1367 2.42873L9.50066 8.79269L15.8644 2.42893L16.5715 3.13604L10.2078 9.4998L16.5717 15.8638L15.8646 16.5709L9.50066 10.2069L3.1365 16.5711L2.42939 15.864L8.79355 9.4998Z"
                  fill="white"
                />
              </svg>
            </Close>
            <SwapContainer>
              <Text
                className="header"
                uppercase
                weight="400"
                size="s3"
                color="#453953"
              >
                Counter Offer
              </Text>
              <Body>
                <DetailsWrapper>
                  <Text
                    as="h4"
                    size="h4"
                    sizeM="h4"
                    color="#170728"
                    weight="450"
                  >
                    First Offer
                  </Text>
                  <Spacer height={24} />

                  <Flex gap={33} align="center">
                    <TokenBadge
                      token={firstOffer.token_in_metadata}
                      hasCaret={false}
                      handleClick={() => null}
                    />
                    <Text size="s1" sizeM="s1" color="#170728">
                      400 vetme
                    </Text>
                  </Flex>
                  <Spacer height={16} />
                  <Flex gap={33} align="center">
                    <TokenBadge
                      token={firstOffer.token_out_metadata}
                      hasCaret={false}
                      handleClick={() => null}
                    />
                    <Text size="s1" sizeM="s1" color="#170728">
                      400 vetme
                    </Text>
                  </Flex>
                </DetailsWrapper>
                <Spacer height={28} />

                <InputWrapper>
                  <Text
                    as="h4"
                    size="h4"
                    sizeM="h4"
                    color="#170728"
                    weight="450"
                  >
                    Counter Offer
                  </Text>
                  <Spacer height={24} />

                  <InputCon>
                    <InputBox>
                      <InputInner>
                        <Input
                          onChange={handleChange}
                          name="amount_out"
                          placeholder="0.0"
                          type="number"
                          value={firstOffer.token_in}
                          step={0.1}
                        />
                        <div>
                          <TokenBadge
                            token={firstOffer.token_in_metadata}
                            hasCaret={false}
                            handleClick={() => null}
                          />
                        </div>
                      </InputInner>
                    </InputBox>
                  </InputCon>
                  <Spacer height={31} />
                  <InputCon>
                    <InputBox>
                      <InputInner>
                        <Input
                          onChange={handleChange}
                          name="amount_in"
                          value={firstOffer.token_out}
                          type="number"
                          step={0.1}
                          placeholder="0.0"
                        />
                        <div>
                          <TokenBadge
                            token={firstOffer.token_out_metadata}
                            hasCaret={false}
                            handleClick={() => null}
                          />
                        </div>
                      </InputInner>
                    </InputBox>
                  </InputCon>

                  <Spacer height={20} />
                  {/* disabled={!isValid()} */}
                  <Center>
                    <ActionBtn onClick={handleContinue}>Send offer</ActionBtn>
                  </Center>
                </InputWrapper>
              </Body>
            </SwapContainer>
          </Inner>
        </Container>
      </CSSTransition>
    </>
  );
};

export default ListCard;
