import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { Add, ArrowRight, LoadingIll, Swap } from "../Icons";
import { text } from "stream/consumers";
import { ListCard } from "../Card";
import { useState } from "react";
import BigNumber from "bignumber.js";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

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
import Toggle from "../Toggle";
import apiHelper from "@/helpers/apiHelper";
import { listSign, parseError, parseSuccess } from "@/utils";

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
const Inner = styled.div`
  left: 50%;
  top: 50%;
  width: fit-content;
  position: relative;
  transform: translate(-50%, -50%);
  /* padding: 50px 16px; */
`;

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

interface IListEdit {
  handleClose: () => void;
  show: boolean;
  list: any;
}

const ListModal = ({ show, handleClose, list }: IListEdit) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    amount_in: list.amount_in,
    amount_out: list.amount_out,
  });
  const { account, library } = useWeb3React<Web3Provider>();

  const handleChange = (e: any) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUpdate = async () => {
    let data: any = form;

    let signatureData = {
      signatory: account,
      receivingWallet: list.receiving_wallet,
      tokenIn: list.token_in,
      tokenOut: list.token_out,
      amountOut: BigNumber(form.amount_out).times(1e18).toString(10),
      amountIn: BigNumber(form.amount_in).times(1e18).toString(10),
      deadline: list.deadline,
      nonce: list.nonce,
    };

    const signer = library?.getSigner();
    const { signature } = await listSign(signer, signatureData);
    data.signature = signature;
    data.id = list._id;

    try {
      await apiHelper.updateList(data);

      list.amount_in = data.amount_in;
      list.amount_out = data.amount_out;
      parseSuccess("List updated");
      handleClose();
    } catch (error) {
      parseError(error || "Unable to update, please try again");
    }
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
                          token={list.token_out_metadata}
                          hasCaret={false}
                          handleClick={() => null}
                        />
                      </div>
                    </InputInner>
                  </InputBox>
                </InputCon>

                <Spacer height={31} />

                <Flex justify="center">
                  {/* <div /> */}
                  <SwapCon>
                    <Swap />
                  </SwapCon>
                  {/* <div> */}
                  {/* onClick={() => setOpenS(true)} */}
                  {/* <Add /> */}
                  {/* </div> */}
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
                          token={list.token_in_metadata}
                          hasCaret={false}
                          handleClick={() => null}
                        />
                      </div>
                    </InputInner>
                  </InputBox>
                </InputCon>
                <Spacer height={15} />

                {/* <InputCon>
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
                </InputCon> */}
                <Spacer height={30} />

                <Center>
                  <ActionBtn onClick={handleUpdate}>
                    Update{" "}
                    {/* <div>
                      <ArrowRight />
                    </div> */}
                  </ActionBtn>
                </Center>
              </Body>
            </SwapContainer>

            {/* <Settings show={openS} handleClose={() => setOpenS(false)} /> */}
          </Inner>
        </Container>
      </CSSTransition>
    </>
  );
};

export default ListModal;
