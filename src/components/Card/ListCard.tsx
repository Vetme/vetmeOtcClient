import { ListContext, ListContextType } from "@/context/Listcontext";
import { tokens } from "@/data";
import { TokenI } from "@/types";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Divider, Flex, IconWrapper, Spacer, Text, TokenBadge } from "..";
import { Button } from "../Button";
import { Send, Swap } from "../Icons";
import { TokenSelect } from "../Modal";
import { hooks } from "@/connector/metaMask";

const SwapContainer = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  width: 508px;
  max-width: 100%;
  margin-bottom: 114px;
  margin: auto;
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
  padding: 28px 50px;

  @media (max-width: 640px) {
    padding: 20px 25px;
  }
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
    height: 58px;
  }
`;
const Input = styled.input`
  height: 100%;
  border: none;
  outline: none;
  flex: 1;
  font-weight: 700;
  font-size: 40px;
  width: 30%;
  color: #8c8c8c;

  @media (max-width: 640px) {
    font-size: 30px;
  }
`;

const IconWrap = styled.div``;

const ListCard = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [give, setGive] = useState<TokenI | undefined>(undefined);
  const [get, setGet] = useState<TokenI | undefined>(undefined);
  const [action, setAction] = useState<"giving" | "getting">("giving");
  const { setForm, form } = useContext(ListContext) as ListContextType;
  const { useAccount, useIsActive } = hooks;
  const account = useAccount();

  const navigate = useNavigate();

  const handleSelect = (action: "giving" | "getting") => {
    setAction(action);
    setOpen(true);
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
    const value = e.target.value;
    const name = e.target.name;

    setForm((initialState: any) => ({
      ...initialState,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    if (!get || !give) return;
    setForm((initialState: any) => ({
      ...initialState,
      token_in_metadata: get,
      token_out_metadata: give,
      receiving_wallet: account,
      signatory: account,
    }));

    localStorage.setItem(
      "list_data",
      JSON.stringify({
        ...form,
        token_in_metadata: get,
        token_out_metadata: give,
        receiving_wallet: account,
        signatory: account,
      })
    );

    navigate("/list");
  };

  return (
    <>
      <SwapContainer>
        <Header>
          <Text uppercase weight="700" size="16px">
            List
          </Text>
        </Header>
        <Body>
          <InputCon>
            <label htmlFor="">You give</label>
            <InputBox>
              <Input
                onChange={handleChange}
                name="amount_out"
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
            </InputBox>
          </InputCon>

          <Spacer height={31} />

          <IconWrapper style={{ textAlign: "center" }} height={10} width={10}>
            <Swap />
          </IconWrapper>

          <Spacer height={6} />

          <InputCon>
            <label htmlFor="">You get</label>
            <InputBox>
              <Input
                onChange={handleChange}
                name="amount_in"
                value={form.amount_in}
                type="number"
                step={0.1}
              />
              <div>
                <TokenBadge
                  token={get || tokens[2]}
                  hasCaret={true}
                  handleClick={() => handleSelect("getting")}
                />
              </div>
            </InputBox>
          </InputCon>
          <Spacer height={30} />

          <Button
            disabled={!isValid()}
            className="primary block m-sm"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Body>
      </SwapContainer>
      <TokenSelect
        handleSelected={(token: TokenI) => handleSelected(token)}
        show={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

export default ListCard;
