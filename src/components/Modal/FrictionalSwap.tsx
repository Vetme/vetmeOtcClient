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
import { parseError } from "@/utils";
import apiHelper from "@/helpers/apiHelper";
import Message from "./Message";

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
  /* background-size: 100% 100%; */
  position: relative;

  .header {
    position: absolute;
    left: 58px;

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

const ADown = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid #170728;
  margin: 20px auto;
  display: grid;
  place-content: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  /* background-image: url(/images/bg/counter-divide.png); */
  background-repeat: no-repeat;
  background-position: top;
  padding: 16px 16px 16px;

  @media (max-width: 640px) {
    background-size: 100%;
  }
`;

interface FrictionI {
  handleClose: () => void;
  show: boolean;
  trade: ListI;
  amount: any;
  handleSwap: (arg1: any) => void;
}

const init = {
  amount_in: "",
  amount_out: "",
};

const FrictionalSwap = ({
  handleClose,
  show,
  trade,
  amount,
  handleSwap,
}: FrictionI) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    amount_in: trade?.amount_out_balance,
    amount_out: (trade?.amount_in * amount) / (trade?.amount_out as number),
  });

  const isValid = () => {
    // return form.amount_in !== (0 || "") && form.amount_out !== (0 || "");
  };

  const handleChangeGive = (e: any) => {
    let value = e.target.value;
    const amountComputed = (value * trade.amount_out) / trade.amount_in;

    setForm((prevState: any) => ({
      ...prevState,
      amount_out: value,
      amount_in: amountComputed,
    }));
  };

  const handleChangeGet = (e: any) => {
    let value = e.target.value;
    const amountComputed = (value * trade.amount_in) / trade.amount_out;

    setForm((prevState: any) => ({
      ...prevState,
      amount_out: amountComputed,
      amount_in: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      handleClose();
      handleSwap(form);
    } catch (error) {
      parseError("Opps, something went wrong");
    } finally {
      setLoading(false);
    }

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
              <Body>
                <InputWrapper>
                  <Text
                    className=""
                    uppercase
                    weight="400"
                    size="s3"
                    color="#453953"
                  >
                    Asks{" "}
                    <strong>
                      {trade?.amount_in} {trade?.token_in_metadata.symbol}
                    </strong>{" "}
                    for{" "}
                    <strong>
                      {trade?.amount_out} {trade?.token_out_metadata.symbol}
                    </strong>
                  </Text>

                  <Text
                    className=""
                    uppercase
                    weight="400"
                    size="s3"
                    color="#453953"
                  >
                    Amount Remaining{" "}
                    <strong>
                      {trade?.amount_out_balance}{" "}
                      {trade?.token_out_metadata.symbol}
                    </strong>{" "}
                  </Text>
                  <Spacer />
                  <InputCon>
                    <InputBox>
                      <label htmlFor="">You give</label>
                      <InputInner>
                        <Input
                          onChange={handleChangeGive}
                          name="amount_our"
                          placeholder="0.0"
                          type="number"
                          value={form.amount_out}
                          step={0.1}
                          disabled={!trade?.is_friction}
                          className={!trade?.is_friction ? "disabled" : ""}
                        />
                        <div>
                          <TokenBadge
                            token={trade?.token_in_metadata}
                            hasCaret={false}
                            handleClick={() => null}
                          />
                        </div>
                      </InputInner>
                    </InputBox>
                  </InputCon>

                  <ADown>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </ADown>
                  <InputCon>
                    <InputBox>
                      <label htmlFor="">You get</label>
                      <InputInner>
                        <Input
                          onChange={handleChangeGet}
                          name="amount_in"
                          value={form.amount_in}
                          type="number"
                          step={0.1}
                          placeholder="0.0"
                          disabled={!trade?.is_friction}
                          className={!trade?.is_friction ? "disabled" : ""}
                        />
                        <div>
                          <TokenBadge
                            token={trade?.token_out_metadata}
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
                    <ActionBtn disabled={loading} onClick={handleSubmit}>
                      Swap
                    </ActionBtn>
                  </Center>
                </InputWrapper>
              </Body>
            </SwapContainer>
          </Inner>
        </Container>
      </CSSTransition>

      <Message
        show={open}
        handleClose={() => setOpen(false)}
        msg="Your offer has been sent successfully"
        headerText="Success"
      />
    </>
  );
};

export default FrictionalSwap;
