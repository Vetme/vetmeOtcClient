import {
  Center,
  Container,
  ContainerSm,
  Flex,
  OnlyDesktop,
  OnlyMobile,
  Spacer,
  Text,
  Wrapper,
} from "@/components";
import { Button } from "@/components/Button";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Stepper,
  Step,
  RTop,
} from "./styles";
import { ListContext, ListContextType } from "@/context/Listcontext";
import { truncate } from "@/helpers";
import {
  getTokenAllowance,
  approveToken,
  getTotalSupply,
} from "@/helpers/contract";
import CustomButton from "@/components/Button/CustomButton";
import { fromBigNumber, parseSuccess } from "@/utils";
import { BrandBlock, Copy, PCircle, StepHLine } from "@/components/Icons";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Api from "@/helpers/apiHelper";
import { Message, Share } from "@/components/Modal";
import { ActionSwitch, SwitchItem2 } from "../home/styles";

const Trans = () => {
  const [status, setStatus] = useState<number>(1);
  const [approving, setApproving] = useState<boolean>(false);
  const [allowance, setAllowance] = useState<string | number>("");
  const [open, setOpen] = useState<boolean>(false); //
  const [openS, setOpenS] = useState<boolean>(false); //
  const navigate = useNavigate();

  const { setForm, form, saveList, loading, clearLocal, privateLink } =
    useContext(ListContext) as ListContextType;
  const context = useWeb3React<Web3Provider>();
  const { library, chainId, account } = context;

  const listToken = async () => {
    try {
      await saveList();
      setStatus(3);
    } catch (err) {}
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
    if (Math.floor(+fromBigNumber(allowance.toString())) >= form.amount_out) {
      if (status == 3) return;
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
    <ContainerSm>
      <OnlyMobile>
        <Center>
          <ActionSwitch style={{ margin: "auto" }}>
            <SwitchItem2
              className={form.is_private ? "active" : ""}
              onClick={() => setPrivacy(true)}
            >
              Private
            </SwitchItem2>
            <SwitchItem2
              onClick={() => setPrivacy(false)}
              className={form.is_private ? "" : "active"}
            >
              Public
            </SwitchItem2>
          </ActionSwitch>
        </Center>
        <Spacer height={40} />
      </OnlyMobile>
      <TradeWrapper>
        <Text className="header" as="h2" size="s3" uppercase>
          List Transaction Queue
        </Text>
        <Spacer height={20} />
        <TradeItem style={{ textAlign: "center" }}>
          <Text color="#fff" size="s3">
            {truncate(account || "", 9, "***")}
          </Text>
          <Text color="#fff" size="s1">
            Wallet Id
          </Text>
        </TradeItem>
        <Spacer height={28} />
        <TradeInner justify="space-between">
          <LeftContent direction="column" justify="space-between">
            <LTop>
              <TradeItem>
                <Text color="#fff" size="s3">
                  You give
                </Text>
                <Text color="#fff" size="s1">
                  {form.amount_out} {form.token_out_metadata.symbol}
                </Text>
                <Spacer height={8} />
                <Text size="tiny" color=" #E8E6EA">
                  (Escrow fee : 1%)
                </Text>
              </TradeItem>
            </LTop>
          </LeftContent>
          <OnlyDesktop>
            <ActionSwitch style={{ margin: "auto" }}>
              <SwitchItem2
                className={form.is_private ? "active" : ""}
                onClick={() => setPrivacy(true)}
              >
                Private
              </SwitchItem2>
              <SwitchItem2
                onClick={() => setPrivacy(false)}
                className={form.is_private ? "" : "active"}
              >
                Public
              </SwitchItem2>
            </ActionSwitch>
          </OnlyDesktop>
          <RightContent
            direction="column"
            justify="space-between"
            align="flex-end"
          >
            <RTop>
              <TradeItem>
                <Text color="#fff" size="s3">
                  You get
                </Text>
                <Text color="#fff" size="s1">
                  {form.amount_in} {form.token_in_metadata.symbol}
                </Text>
                <Spacer height={8} />
                <Text size="tiny" color=" #E8E6EA">
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
              <Text as="div" color="#E8E6EA" size="s1" uppercase>
                NB:{" "}
                <div
                  onClick={() => setOpen(true)}
                  style={{
                    textDecoration: "underline",
                    display: "inline-block",
                  }}
                >
                  Escrow
                </div>{" "}
                Fee Applies
              </Text>
            </TradeItem>
          </OnlyDesktop>

          {privateLink ? (
            <>
              <Spacer height={24} />
              <Flex>
                <Text as="div" size="s1" color="#E8E6EA" uppercase>
                  {" "}
                  <span>
                    Private link:{" "}
                    {truncate(privateLink || "", 50, "...", "end")}
                  </span>
                </Text>
                <Spacer width={5} />
                <Wrapper style={{ cursor: "pointer" }} onClick={copyLink}>
                  <Copy />
                </Wrapper>
              </Flex>
              <Spacer height={20}></Spacer>

              <Button className="primary m-sm" onClick={handleCancel}>
                Ok
              </Button>
            </>
          ) : (
            <>
              <Spacer height={24} />
              <OnlyMobile>
                {status < 3 ? (
                  <Flex>
                    {Number(allowance) < form.amount_out ? (
                      <CustomButton
                        loading={loading || approving}
                        disabled={loading || approving}
                        classNames="secondary"
                        onClick={() => approve()}
                        text="Approve"
                      />
                    ) : (
                      // <Button className="primary md" onClick={() => listToken()}>
                      //   List Token
                      // </Button>
                      <CustomButton
                        classNames="secondary"
                        text="List Token"
                        onClick={() => listToken()}
                        loading={loading || approving}
                        disabled={loading || approving}
                      />
                    )}
                    <Spacer width={41} />
                    <Button className="" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Flex>
                ) : (
                  <Flex>
                    <CustomButton
                      classNames="secondary semi-rounded lg"
                      onClick={() => alert()}
                      text="Share your Offer"
                    />
                    <Spacer width={8} />
                    <Button
                      onClick={() => navigate(`/trades/${form._id}`)}
                      className="semi-rounded lg"
                    >
                      View Listed Coin
                    </Button>
                  </Flex>
                )}
              </OnlyMobile>
              <OnlyDesktop>
                {status < 3 ? (
                  <Flex>
                    {Number(allowance) < form.amount_out ? (
                      <CustomButton
                        loading={loading || approving}
                        disabled={loading || approving}
                        classNames="secondary"
                        onClick={() => approve()}
                        text="Approve"
                      />
                    ) : (
                      // <Button className="primary md" onClick={() => listToken()}>
                      //   List Token
                      // </Button>
                      <CustomButton
                        classNames="secondary"
                        text="List Token"
                        onClick={() => listToken()}
                        loading={loading || approving}
                        disabled={loading || approving}
                      />
                    )}

                    <Spacer width={41} />
                    <Button className="" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Flex>
                ) : (
                  <Flex>
                    <CustomButton
                      classNames="secondary semi-rounded lg"
                      onClick={() => alert()}
                      text="Share your Offer"
                    />
                    <Spacer width={8} />
                    <Button
                      onClick={() => navigate(`/trades/${form._id}`)}
                      className="semi-rounded lg"
                    >
                      View Listed Coin
                    </Button>
                  </Flex>
                )}
              </OnlyDesktop>
            </>
          )}
        </Center>
        <Spacer height={35} />
        <Spacer height={24} />
        <Footer>
          <Flex align="end" justify="center">
            <BrandBlock />
            <Spacer width={24} />
            <Text
              style={{ top: "-12px", position: "relative" }}
              size="s1"
              uppercase
              color="#FFFFFF"
            >
              Thanks for trading with us
            </Text>
          </Flex>
          <Spacer height={47} />
          <Center style={{ flexDirection: "column" }}>
            <Text size="s2" weight="300" color="#E8E6EA">
              Your money is safe in our Escrow
            </Text>
          </Center>
        </Footer>
      </TradeWrapper>
      <Spacer height={20} />
      <OnlyMobile>
        <Center>
          <Text as="div" color="#E8E6EA" size="s1" uppercase>
            NB:{" "}
            <div
              onClick={() => setOpen(true)}
              style={{
                textDecoration: "underline",
                display: "inline-block",
              }}
            >
              Escrow
            </div>{" "}
            Fee Applies
          </Text>
        </Center>
      </OnlyMobile>

      <Message
        show={open}
        handleClose={() => setOpen(false)}
        msg="Escrow Fee is a trading fee we charge to guarantee you a secured transaction. We charge from both parties to safe guard token transactions. Our fee’s are not more than 3% per trade. If trades are cancelled at any point in the transaction queue, we would refund all payments inclusive of the Escrow Fee. We provide this feature on all token and coin transactions on our platform. If you have anymore questions please reach us on our email support@vetme.com or via our telegram platform. Thanks for trading with us."
      />

      <Share
        show={openS}
        handleClose={() => setOpenS(false)}
        headerText="Share offer via"
      />
    </ContainerSm>
  );
};

const buildStepper = (status: number) => (
  <Stepper status={status}>
    <Step
      className={status >= 1 ? "active" : ""}
      rightMsg={status == 1 ? "Transaction  Opened" : ""}
    >
      <PCircle color={status >= 1 ? "#BEFECD" : ""} />
    </Step>
    <Flex align="center" style={{ width: "162px" }}>
      <StepHLine color={status >= 2 ? "#BEFECD" : ""} />
    </Flex>
    <Step
      className={status >= 2 ? "active" : ""}
      rightMsg={status == 2 ? "Approved" : ""}
    >
      <PCircle color={status >= 2 ? "#BEFECD" : ""} />
    </Step>
    <Flex align="center" style={{ width: "162px" }}>
      <StepHLine color={status >= 3 ? "#BEFECD" : ""} />
    </Flex>
    <Step
      className={status >= 3 ? "active" : ""}
      rightMsg={status == 3 ? "Coin Listed" : ""}
    >
      <PCircle color={status >= 3 ? "#BEFECD" : ""} />
    </Step>
  </Stepper>
);

export default Trans;
