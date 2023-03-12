import { ListContext, ListContextType } from "@/context/Listcontext";
import { tokens } from "@/data";
import { TokenI } from "@/types";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  ActionBtn,
  Center,
  Divider,
  Flex,
  IconWrapper,
  Spacer,
  Text,
  TokenBadge,
} from "..";
import { Button } from "../Button";
import { Send, Swap, Add, ArrowRight } from "../Icons";
import { Connect as ConnectModal, TokenSelect } from "../Modal";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectContext, ConnectContextType } from "@/context/ConnectContext";
import Toggle from "../Toggle";
import { parseError } from "@/utils";

// import { hooks, metaMask } from "@/connector/metaMask";

const SwapContainer = styled.div`
  width: 396px;
  max-width: 100%;
  margin-bottom: 114px;
  background: #ffffff;
  margin: auto;
  background-image: url(/images/bg/list.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  position: relative;

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
`;
const Body = styled.div`
  padding: 16px;

  @media (max-width: 640px) {
    padding: 20px 25px;
  }
`;
const InputCon = styled.div`
  label {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #453953;
    text-transform: uppercase;
  }
`;
const InputBox = styled.div`
  display: flex;
  background-image: url(/images/bg/input.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  height: 75px;
  align-items: center;
  position: relative;

  label {
    position: absolute;
    top: 0px;
    left: 38px;
  }

  @media (max-width: 640px) {
    height: 58px;
  }
`;
const Input = styled.input`
  height: 50px;
  position: relative;
  border: none;
  outline: none;
  flex: 1;
  font-weight: 700;
  font-weight: 400;
  font-size: 18px;
  width: 30%;
  color: #170728;
  margin-left: 38px;

  @media (max-width: 640px) {
    font-size: 30px;
  }
`;

const InputInner = styled.div`
  display: flex;
  top: 11.5px;
  align-items: center;
  position: relative;
  padding-right: 10px;
`;

const IconWrap = styled.div``;
const SwapCon = styled.div`
  margin-left: 38px;
`;

const DurationInput = styled.div`
  flex: 1;
  input {
    /* background: #ffffff; */
    border: 1px solid rgb(23 7 40);
    border-radius: 20px;
    padding: 10px;
    outline: none;
  }
`;

const ListCard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [give, setGive] = useState<TokenI | undefined>(undefined);
  const [get, setGet] = useState<TokenI | undefined>(undefined);
  const [action, setAction] = useState<"giving" | "getting">("giving");
  const { setForm, form } = useContext(ListContext) as ListContextType;
  const [show, setShow] = useState<boolean>(false);
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const { account } = useWeb3React<Web3Provider>();
  const { connect } = useContext(ConnectContext) as ConnectContextType;

  const navigate = useNavigate();

  const handleSelect = (action: "giving" | "getting") => {
    setAction(action);
    setOpen(true);
  };

  const handleDChange = () => {
    setHasDeadline((prev) => !prev);
  };

  const handleSelected = (token: TokenI) => {
    setOpen(false);
    if (action == "getting") {
      setGet(token);
    }
    if (action == "giving") {
      setGive(token);
    }
  };

  const isValid = () => {
    return form.amount_in !== (0 || "") && form.amount_out !== (0 || "");
  };

  const getByAddress = (address: string) => {
    return tokens.find((token) => token.address === address);
  };

  const handleChange = (e: any) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name == "deadline") {
      const date = new Date(value);
      const seconds = Math.floor(date.getTime() / 1000);
      value = seconds;
    }

    setForm((initialState: any) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    if (!get || !give) {
      parseError("Input field is required");
      return;
    }
    setForm((initialState: any) => ({
      ...initialState,
      token_in_metadata: get,
      token_out_metadata: give,
      receiving_wallet: account,
      signatory: account,
      forever: hasDeadline ? false : true,
    }));

    localStorage.setItem(
      "list_data",
      JSON.stringify({
        ...form,
        token_in_metadata: get,
        token_out_metadata: give,
        receiving_wallet: account,
        signatory: account,
        forever: hasDeadline ? false : true,
      })
    );

    navigate("/list");
  };

  useEffect(() => {
    const dGive = tokens.find((token) => token.symbol === "WETH");
    const dGet = tokens.find((token) => token.symbol === "VETME");

    setGive(dGive);
    setGet(dGet);
  }, []);

  return (
    <>
      <SwapContainer>
        <Text
          className="header"
          uppercase
          weight="400"
          size="s3"
          color="#453953"
        >
          List
        </Text>
        <Body>
          <InputCon>
            <InputBox>
              <label htmlFor="">You give</label>
              <InputInner>
                <Input
                  onChange={handleChange}
                  name="amount_out"
                  placeholder="0.0"
                  type="number"
                  value={form.amount_out}
                  step={0.1}
                />
                <div>
                  <TokenBadge
                    token={give || tokens[1]}
                    hasCaret={true}
                    handleClick={() => handleSelect("giving")}
                  />
                </div>
              </InputInner>
            </InputBox>
          </InputCon>

          <Spacer height={31} />

          <Flex justify="space-between">
            <div />
            <SwapCon>
              <Swap />
            </SwapCon>
            <Add />
          </Flex>

          <Spacer height={6} />

          <InputCon>
            <InputBox>
              <label htmlFor="">You get</label>
              <InputInner>
                <Input
                  onChange={handleChange}
                  name="amount_in"
                  value={form.amount_in}
                  type="number"
                  step={0.1}
                  placeholder="0.0"
                />
                <div>
                  <TokenBadge
                    token={get || tokens[2]}
                    hasCaret={true}
                    handleClick={() => handleSelect("getting")}
                  />
                </div>
              </InputInner>
            </InputBox>
          </InputCon>
          <Spacer height={15} />

          <InputCon>
            <label htmlFor="">Time of Contract</label>
            <Flex align="center" style={{ height: "50px" }}>
              <DurationInput>
                {hasDeadline ? (
                  <input
                    type="datetime-local"
                    name="deadline"
                    onChange={handleChange}
                  />
                ) : (
                  <Text weight="700">Off (Set as Forever)</Text>
                )}
              </DurationInput>
              <Toggle
                checked={hasDeadline}
                onChange={handleDChange}
                offstyle="btn-off"
                onstyle="btn-on"
              />
            </Flex>
          </InputCon>
          <Spacer height={30} />

          {account ? (
            <Center>
              <ActionBtn disabled={!isValid()} onClick={handleContinue}>
                Continue{" "}
                <div>
                  <ArrowRight />
                </div>
              </ActionBtn>
            </Center>
          ) : (
            <Button
              className="primary block m-sm"
              onClick={() => setShow(true)}
            >
              Connect Your wallet
            </Button>
          )}
        </Body>
      </SwapContainer>
      <TokenSelect
        handleSelected={(token: TokenI) => handleSelected(token)}
        show={open}
        handleClose={() => setOpen(false)}
      />

      <ConnectModal
        show={show}
        connect={(connector) => {
          setShow(false);
          connect(connector);
        }}
        handleClose={() => setShow(false)}
      />
    </>
  );
};

export default ListCard;
