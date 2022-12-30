import {
  Center,
  Container,
  Flex,
  OnlyDesktop,
  OnlyMobile,
  Spacer,
  Text,
  Wrapper,
} from "@/components";
import { Button } from "@/components/Button";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { utils } from "ethers";
import { toast } from "react-toastify";

import {
  TradeWrapper,
  LeftContent,
  RightContent,
  TradeInner,
  TradeItem,
  SwitchTab,
  Tab,
  LTop,
  Footer,
  BtnWrapper,
  Stepper,
  Step,
  RTop,
} from "./styles";
import { ListContext, ListContextType } from "@/context/Listcontext";
import { truncate } from "@/helpers";
import {
  EscrowOtcContract,
  ERC20Contract,
  getTokenAllowance,
  approveToken,
  getTotalSupply,
} from "@/helpers/contract";
import { Blockchain } from "@/types";
import { get_blockchain_from_chainId } from "@/helpers/rpc";
import { toBN, toDefaultDecimal, toHumanReadable } from "@/utils/BigNumber";
import { from } from "@apollo/client";
import CustomButton from "@/components/Button/CustomButton";
import { fromBigNumber, parseSuccess } from "@/utils";
import { Copy } from "@/components/Icons";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { getAccountPath } from "ethers/lib/utils";
import Api from "@/helpers/apiHelper";

const Trans = () => {
  const [status, setStatus] = useState<number>(1);
  const [approving, setApproving] = useState<boolean>(false);
  const [allowance, setAllowance] = useState<string | number>("");
  const navigate = useNavigate();

  const { setForm, form, saveList, loading, clearLocal, privateLink } =
    useContext(ListContext) as ListContextType;
  // const { useAccount, useIsActive, useChainId, useProvider } = hooks;
  const context = useWeb3React<Web3Provider>();
  const { library, chainId, account } = context;
  // const account = useAccount() as string;
  // const chainId = useChainId();
  // const provider = useProvider();

  //1=> Transaction Opened
  //2=> Approved
  //3=> Listed

  const listToken = async () => {
    await saveList();
  };

  const setPrivacy = (value: boolean) => {
    setForm((prev: any) => ({
      ...prev,
      is_private: value,
      receiving_wallet: account,
      signatory: account,
    }));
  };
  useEffect(() => {
    getAllowance();
  }, [account, form]);

  useEffect(() => {
    getAccount();
  }, [account]);

  const getAccount = async () => {
    const {
      data: { account: raccount },
    } = await Api.getAccount(account);
    if (raccount) {
      setForm((prev: any) => ({
        ...prev,
        nonce: raccount.nonce,
      }));
    }
  };

  const getAllowance = async () => {
    const allowance = await getTokenAllowance(
      form?.token_out_metadata.address,
      library,
      chainId,
      account
    );
    setAllowance(fromBigNumber(allowance.toString()));
    if (fromBigNumber(allowance.toString()) >= form.amount_out) {
      setStatus(2);
    }
  };

  const approve = async () => {
    try {
      setApproving(true);
      const totalSupply = await getTotalSupply(
        form?.token_out_metadata?.address,
        library,
        chainId
      );
      const approval = await approveToken(
        form?.token_out_metadata?.address,
        library,
        chainId,
        totalSupply
      );

      setStatus(2);
      setAllowance(form.amount_out);
      parseSuccess(
        `${form?.amount_out} ${form?.token_out_metadata.symbol} approved`
      );
    } catch (err) {
      if (err === undefined) return;

      toast.error("Opps, something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setApproving(false);
    }
  };

  const handleCancel = () => {
    clearLocal();
    navigate("/");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(privateLink);
    parseSuccess("Copied");
  };

  return (
    <Container>
      <OnlyMobile>
        <Center>
          <SwitchTab
            align="center"
            className={form.is_private ? "invisible" : "visible"}
          >
            <Tab onClick={() => setPrivacy(true)}>Private</Tab>
            <Tab onClick={() => setPrivacy(false)}>Public</Tab>
          </SwitchTab>
        </Center>
        <Spacer height={40} />
      </OnlyMobile>
      <TradeWrapper>
        <Center>
          <Text as="h2" size="24px" weight="700">
            List Transaction Queue
          </Text>
        </Center>
        <Spacer height={20} />
        <TradeItem style={{ textAlign: "center" }}>
          <Text weight="700" size="24px">
            {truncate(account || "", 9, "***")}
          </Text>
          <Text weight="500" size="16px">
            Wallet Id
          </Text>
        </TradeItem>
        <Spacer height={28} />
        <TradeInner justify="space-between">
          <LeftContent direction="column" justify="space-between">
            <LTop>
              <TradeItem>
                <Text weight="500" size="16px">
                  You give
                </Text>
                <Text weight="700" size="24px">
                  {form.amount_out} {form.token_out_metadata.symbol}
                </Text>
                <Text weight="500" size="16px">
                  (Escrow fee : 1%)
                </Text>
              </TradeItem>
            </LTop>
          </LeftContent>
          <OnlyDesktop>
            <SwitchTab
              align="center"
              className={form.is_private ? "invisible" : "visible"}
            >
              <Tab onClick={() => setPrivacy(true)}>Private</Tab>
              <Tab onClick={() => setPrivacy(false)}>Public</Tab>
            </SwitchTab>
          </OnlyDesktop>
          <RightContent
            direction="column"
            justify="space-between"
            align="flex-end"
          >
            <RTop>
              <TradeItem>
                <Text weight="500" size="16px">
                  You get
                </Text>
                <Text weight="700" size="24px">
                  {form.amount_in} {form.token_in_metadata.symbol}
                </Text>
                <Text weight="500" size="16px">
                  (Escrow fee : 1%)
                </Text>
              </TradeItem>
            </RTop>
          </RightContent>
        </TradeInner>
        <Spacer height={20} />
        {buildStepper(status)}
        <Spacer height={20} />

        <Center style={{ flexDirection: "column" }}>
          <OnlyDesktop>
            <Spacer height={52} />
            <TradeItem>
              <Text weight="700" size="24px">
                NB: <span style={{ color: "#4473EB" }}>Escrow</span> Fee Applies
              </Text>
            </TradeItem>
          </OnlyDesktop>

          {privateLink ? (
            <>
              <Spacer height={24} />
              <Flex>
                <Text as="div" weight="700">
                  {" "}
                  <span>Private link: {privateLink}</span>
                </Text>
                <Spacer width={5} />
                <Wrapper style={{ cursor: "pointer" }} onClick={copyLink}>
                  <Copy />
                </Wrapper>
              </Flex>
              <Spacer height={20}></Spacer>
            </>
          ) : (
            <>
              <Spacer height={24} />
              <OnlyMobile>
                <Flex>
                  {Number(allowance) < form.amount_out ? (
                    <CustomButton
                      loading={loading || approving}
                      disabled={loading || approving}
                      classNames="primary m-sm"
                      onClick={() => approve()}
                      text="Approve"
                    />
                  ) : (
                    // <Button className="primary md" onClick={() => listToken()}>
                    //   List Token
                    // </Button>
                    <CustomButton
                      classNames="primary m-sm"
                      text="List Token"
                      onClick={() => listToken()}
                      loading={loading || approving}
                      disabled={loading || approving}
                    />
                  )}
                  <Spacer width={41} />
                  <Button
                    className="primary-accent m-sm"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </Flex>
              </OnlyMobile>
              <OnlyDesktop>
                <Flex>
                  {Number(allowance) < form.amount_out ? (
                    <CustomButton
                      loading={loading || approving}
                      disabled={loading || approving}
                      classNames="primary md"
                      onClick={() => approve()}
                      text="Approve"
                    />
                  ) : (
                    // <Button className="primary md" onClick={() => listToken()}>
                    //   List Token
                    // </Button>
                    <CustomButton
                      classNames="primary md"
                      text="List Token"
                      onClick={() => listToken()}
                      loading={loading || approving}
                      disabled={loading || approving}
                    />
                  )}

                  <Spacer width={41} />
                  <Button className="primary-accent md" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Flex>
              </OnlyDesktop>
            </>
          )}
        </Center>
        <Spacer height={35} />

        <Footer>
          <Center style={{ flexDirection: "column" }}>
            <BtnWrapper>
              <Button className="block success m-sm">
                Send Token to Escrow
              </Button>
            </BtnWrapper>
            <Spacer height={16} />
            <Text size="16px" weight="500">
              Your money is safe in our Escrow
            </Text>
          </Center>
        </Footer>
      </TradeWrapper>
      <Spacer height={20} />
      <OnlyMobile>
        <Center>
          <Text weight="700" size="24px">
            NB: <span style={{ color: "#4473EB" }}>Escrow</span> Fee Applies
          </Text>
        </Center>
      </OnlyMobile>
    </Container>
  );
};

const buildStepper = (status: number) => (
  <Stepper status={status}>
    <Step
      className={status >= 1 ? "active" : ""}
      rightMsg={status == 1 ? "Transaction  Opened" : ""}
    ></Step>
    <Step
      className={status >= 2 ? "active" : ""}
      rightMsg={status == 2 ? "Approved" : ""}
    ></Step>
    <Step
      className={status >= 3 ? "active" : ""}
      rightMsg={status == 3 ? "Coin Listed" : ""}
    ></Step>
  </Stepper>
);

export default Trans;
