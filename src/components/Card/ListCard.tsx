import { ListContext, ListContextType } from "@/context/Listcontext";
// import { tokens } from "@/data";
import { TokenI } from "@/types";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  Send,
  Swap,
  Add,
  ArrowRight,
  Settings as SettingsIcon,
  Settings2 as SettingsIcon2,
} from "../Icons";
import { Connect as ConnectModal, Settings, TokenSelect } from "../Modal";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ConnectContext, ConnectContextType } from "@/context/ConnectContext";
import Toggle from "../Toggle";
import { parseError } from "@/utils";
import { getChainContract, getDefaultTokens, computeUsdPrice } from "@/helpers";

// import { hooks, metaMask } from "@/connector/metaMask";

const SwapContainer = styled.div`
  width: 396px;
  max-width: 100%;
  margin-bottom: 114px;
  background: #ffffff;
  margin: auto;
  background-image: url(/images/bg/list.png);
  /* background-image: url("data:image/svg+xml,%3Csvg width='396' height='443' viewBox='0 0 396 443' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M395.5 11.9725C395.5 8.76484 394.518 5.87986 392.955 3.80786C391.392 1.73612 389.269 0.500028 386.966 0.500028L256.835 0.49999C251.812 0.499988 247.371 3.75944 245.864 8.55075L242.738 18.4944C241.624 22.0358 238.341 24.4449 234.629 24.4449L157.534 24.4449C153.822 24.4449 150.539 22.0358 149.426 18.4944L146.299 8.55073C144.793 3.75943 140.351 0.499978 135.329 0.499978L9.03424 0.499972C6.73087 0.499971 4.60849 1.73606 3.0452 3.8078C1.48172 5.87979 0.50003 8.76478 0.500029 11.9724L0.499993 431.028C0.499993 434.235 1.48168 437.12 3.04516 439.192C4.60845 441.264 6.73083 442.5 9.0342 442.5L198 442.5L386.966 442.5C389.269 442.5 391.391 441.264 392.955 439.192C394.518 437.12 395.5 434.235 395.5 431.028L395.5 11.9725Z' fill='white' stroke='%23453953'/%3E%3C/svg%3E"); */
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

const Body = styled.div`
  padding: 40px 16px 16px;

  @media (max-width: 640px) {
    /* padding: 20px 25px; */
  }
`;

const IconWrap = styled.div``;
const SwapCon = styled.div`
  margin-left: 38px;
`;

const UsdVal = styled.span`
  overflow-wrap: anywhere;
  font-size: 12px;
  color: #acacac;
  position: absolute;
  bottom: -23px;
  left: 25px;
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
  const [openS, setOpenS] = useState<boolean>(false);
  const [give, setGive] = useState<TokenI | undefined>(undefined);
  const [get, setGet] = useState<TokenI | undefined>(undefined);
  const [action, setAction] = useState<"giving" | "getting">("giving");
  const { setForm, form } = useContext(ListContext) as ListContextType;
  const [show, setShow] = useState<boolean>(false);
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const { account, chainId } = useWeb3React<Web3Provider>();
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
    const tokens = getDefaultTokens(chainId);
    // return tokens && tokens.find((token: any) => token?.address === address);
  };

  const handleChange = (e: any) => {
    let value = e.target.value;
    const name = e.target.name;

    if (name == "amount_in" || "amount_out") {
      value = value.replace(/,/g, ".");
      const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group
      if (
        value === "" ||
        inputRegex.test(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      ) {
      } else {
        return;
      }
    }

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
    const tokens: any[] = getDefaultTokens(chainId);

    const dGive =
      tokens && tokens.find((token: any) => token.symbol === "WETH");
    const dGet =
      tokens && tokens.find((token: any) => token.symbol === "VETME");

    setGive(dGive);
    setGet(dGet);
  }, [chainId]);

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
                  inputMode="decimal"
                  autoComplete="off"
                  autoCorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={79}
                  spellCheck="false"
                />
                <AnimatePresence>
                  {give && form.amount_out > 0 && (
                    <UsdVal
                      key={form.amount_out}
                      as={motion.span}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      exit={{ opacity: 0 }}
                    >
                      ~${computeUsdPrice(give.usd, form.amount_out)}
                    </UsdVal>
                  )}
                </AnimatePresence>
                <div>
                  <TokenBadge
                    token={give}
                    hasCaret={true}
                    handleClick={() => handleSelect("giving")}
                  />
                </div>
              </InputInner>
            </InputBox>
          </InputCon>

          <Spacer height={31} />

          <Flex align="center" justify="space-between">
            <div />
            <SwapCon>
              <Swap />
            </SwapCon>
            <div onClick={() => setOpenS(true)}>
              <SettingsIcon2 />
            </div>
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
                  inputMode="decimal"
                  autoComplete="off"
                  autoCorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={79}
                  spellCheck="false"
                />
                <AnimatePresence>
                  {get && form.amount_in > 0 && (
                    <UsdVal
                      key={form.amount_in}
                      as={motion.span}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    >
                      ~${computeUsdPrice(get.usd, form.amount_in)}
                    </UsdVal>
                  )}
                </AnimatePresence>
                <div>
                  <TokenBadge
                    token={get}
                    hasCaret={true}
                    handleClick={() => handleSelect("getting")}
                  />
                </div>
              </InputInner>
            </InputBox>
          </InputCon>
          <Spacer height={20} />

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
        chainId={chainId}
      />

      <Settings show={openS} handleClose={() => setOpenS(false)} />

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
