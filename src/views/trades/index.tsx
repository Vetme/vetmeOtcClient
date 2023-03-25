import {
  Center,
  Container,
  Flex,
  Spacer,
  Text,
  OnlyMobile,
  ContainerSm,
} from "@/components";
import { Button } from "@/components/Button";
import { useState, useEffect, useContext } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import { toast } from "react-toastify";
import axios from "axios";

import {
  TradeWrapper,
  LeftContent,
  RightContent,
  TradeInner,
  TradeItem,
  LBottom,
  LTop,
  Footer,
  Stepper,
  Step,
  RBottom,
  RTop,
  MobileFooter,
  StepLineCon,
} from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { ListI } from "@/types";
import { truncate } from "@/helpers";
import {
  approveToken,
  getTokenAllowance,
  matchTokenOrder,
  convertWeth,
  getTotalSupply,
} from "@/helpers/contract";
import { fromBigNumber, listSign, parseError, parseSuccess } from "@/utils";
import CustomButton from "@/components/Button/CustomButton";
import BigNumber from "bignumber.js";
import Api from "@/helpers/apiHelper";
import { Message, Connect as ConnectModal } from "@/components/Modal";
import { BrandBlock, PCircle, StepLine } from "@/components/Icons";
import { ConnectContext, ConnectContextType } from "@/context/ConnectContext";

const Trans = () => {
  const [status, setStatus] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [approving, setApproving] = useState<boolean>(false);
  const [listing, setListing] = useState<ListI | undefined>(undefined);
  const [allowance, setAllowance] = useState<string>("");
  const [amount, setAmount] = useState<any>(listing?.amount_out_balance);
  const [error, setError] = useState<any>("");
  const { connect } = useContext(ConnectContext) as ConnectContextType;
  const [show, setShow] = useState<boolean>(false);

  let { id } = useParams();
  const navigate = useNavigate();

  const { account, chainId, library } = useWeb3React<Web3Provider>();

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (account && listing) getAllowance();
  }, [account, listing]);

  const fetchList = async () => {
    try {
      setLoading(true);
      const {
        data: { listing },
      } = await axios.get(`${import.meta.env.VITE_BASE_URL}/lists/${id}`);
      setLoading(false);
      setListing(listing);
      setStatus(listing.status);
      setAmount(listing.amount_out_balance);
    } catch (e) {
      console.log({ error84: e });
    }
  };

  const getAllowance = async () => {
    const allowance = await getTokenAllowance(
      listing?.token_in_metadata?.address,
      library,
      chainId,
      account
    );
    setAllowance(fromBigNumber(allowance.toString()));
    if (fromBigNumber(allowance.toString()) >= listing?.amount_in) {
      let status: any = Number(listing?.status) < 2 ? 2 : listing?.status;
      setStatus(status);
    }
  };

  const approve = async () => {
    try {
      setApproving(true);
      const totalSupply = await getTotalSupply(
        listing?.token_in_metadata?.address,
        library,
        chainId
      );
      const approval = await approveToken(
        listing?.token_in_metadata?.address,
        library,
        chainId,
        totalSupply.toString()
      );
      setStatus(2);
      setAllowance(listing?.amount_in);
      parseSuccess(
        `${listing?.amount_in} ${listing?.token_in_metadata.symbol} approved`
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

  const matchOrder = async () => {
    try {
      setApproving(true);
      let signatureData = {
        signatory: account,
        receivingWallet: account,
        tokenIn: listing?.token_out,
        tokenOut: listing?.token_in,
        amountOut: BigNumber(listing?.amount_in).times(1e18).toString(10),
        amountIn: BigNumber(listing?.amount_out as number)
          .times(1e18)
          .toString(10),
        deadline: listing?.deadline,
        nonce: listing?.nonce,
      };
      const signer = library?.getSigner();
      const { signature } = await listSign(signer, signatureData);
      const response = await matchTokenOrder(
        library,
        chainId,
        listing?.signature,
        signature,
        listing,
        account
      );

      const data = {
        buyerSignature: signature,
        sellerSignature: listing?.signature,
        id: listing?._id,
        account,
        transactionHash: response.transactionHash,
        amount: amount,
      };

      await Api.upDateListComp(data);
      setStatus(3);
      parseSuccess("Swap Successful");
    } catch (err: any) {
      parseError(err.reason || err.message);
    } finally {
      setApproving(false);
    }
  };

  const handleConvertWeth = async () => {
    await convertWeth(library, chainId);
  };

  const handleChange = (e: any) => {
    setError("");
    const val = e.target.value;
    console.log(listing?.amount_out_balance, val);
    if (val > listing?.amount_out_balance) {
      setError("Amount exceeds available");
    }
    setAmount(val);
  };

  const amountComputed =
    (listing?.amount_in * amount) / listing?.amount_out_balance;

  return (
    <ContainerSm>
      <TradeWrapper>
        <Text
          className="header"
          as="h2"
          uppercase
          size="s3"
          color="#453953;"
          weight="700"
        >
          Transaction Queue
        </Text>
        <Spacer height={20} />
        {loading ? (
          <span>Loading</span>
        ) : (
          <>
            <TradeInner justify="space-between">
              <LeftContent direction="column" justify="space-between">
                <LTop>
                  <TradeItem>
                    {account ? (
                      <Text color="#fff" size="s1">
                        {truncate(account || "", 9, "***")}
                      </Text>
                    ) : (
                      <Text color="#fff" size="s1">
                        Wallet not connected
                      </Text>
                    )}

                    <Text
                      weight="500"
                      size="tiny"
                      color="#E8E6EA;
"
                    >
                      Wallet Id
                    </Text>
                  </TradeItem>
                  <Spacer height={26} />
                  <TradeItem>
                    <Text size="s3" color="#E8E6EA" uppercase>
                      You give
                    </Text>
                    <Text size="s1" color="#fff">
                      {/* {listing?.amount_in} {listing?.token_in_metadata.symbol} */}
                      {amountComputed} {listing?.token_in_metadata.symbol}
                    </Text>
                    <Text size="s2" color="#E8E6EA">
                      (Escrow fee : 1%)
                    </Text>
                  </TradeItem>
                </LTop>

                <Spacer height={70} />

                <LBottom>
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
                  <Spacer height={24} />
                  <span className="error">{error}</span>
                  {account && status < 3 ? (
                    <Flex className="">
                      {Number(allowance) < listing?.amount_in ? (
                        <CustomButton
                          classNames=""
                          onClick={() => approve()}
                          text="Approve"
                          loading={loading || approving}
                          disabled={loading || approving}
                        />
                      ) : (
                        <Flex gap={8}>
                          {listing?.is_friction && (
                            <input
                              className={!!error ? "error s-input" : "s-input"}
                              step="0.5"
                              value={amount}
                              name="value"
                              onChange={handleChange}
                              placeholder="0.0"
                              type="number"
                            />
                          )}
                          <CustomButton
                            classNames="secondary"
                            onClick={() => matchOrder()}
                            text="Swap"
                            loading={loading || approving}
                            disabled={loading || approving || !!error}
                          />
                        </Flex>
                      )}
                      {/* <Spacer width={41} />
                      <Button
                        className="primary-accent md"
                        onClick={() => navigate("/")}
                      >
                        Cancel
                      </Button> */}
                    </Flex>
                  ) : (
                    !account && (
                      <Button
                        className="secondary"
                        onClick={() => setShow(true)}
                      >
                        Connect
                      </Button>
                    )
                  )}
                </LBottom>
              </LeftContent>
              {buildStepper(
                status,
                listing?.amount_in,
                listing?.token_in_metadata?.symbol
              )}
              <RightContent
                direction="column"
                justify="space-between"
                align="flex-end"
              >
                <RTop>
                  <TradeItem>
                    <Text color="#fff" size="s1">
                      {truncate(listing?.receiving_wallet || "", 9, "***")}
                    </Text>
                    <Text color=" #E8E6EA" size="tiny">
                      Wallet Id
                    </Text>
                  </TradeItem>
                  <Spacer height={26} />
                  <TradeItem>
                    <Text size="s3" color=" #E8E6EA" uppercase>
                      You get
                    </Text>
                    <Text color="#fff" size="s1">
                      {listing?.amount_out} {listing?.token_out_metadata.symbol}
                    </Text>
                    <Text color="#E8E6EA" size="tiny">
                      (Escrow fee : 1%)
                    </Text>
                  </TradeItem>
                </RTop>
                <Spacer height={113} />
                <RBottom>
                  <Button className="secondary" onClick={handleConvertWeth}>
                    Give me WETH for ETH
                  </Button>
                </RBottom>
              </RightContent>
            </TradeInner>
            <MobileFooter>
              <div className="inner">
                {account && status < 3 ? (
                  <>
                    {Number(allowance) < listing?.amount_in ? (
                      <CustomButton
                        classNames="secondary"
                        onClick={() => approve()}
                        text="Approve"
                        loading={loading || approving}
                        disabled={loading || approving}
                      />
                    ) : (
                      <Flex gap={8}>
                        {listing?.is_friction && (
                          <input
                            className={!!error ? "error s-input" : "s-input"}
                            step="0.5"
                            value={amount}
                            name="value"
                            onChange={handleChange}
                            placeholder="0.0"
                            type="number"
                          />
                        )}
                        <CustomButton
                          classNames="secondary"
                          onClick={() => matchOrder()}
                          text="Swap"
                          loading={loading || approving}
                          disabled={loading || approving}
                        />
                      </Flex>
                    )}

                    <Spacer width={41} />
                    <Button className="" onClick={() => navigate("/")}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  !account && (
                    <Button className="secondary" onClick={() => setShow(true)}>
                      Connect
                    </Button>
                  )
                )}

                {/* <Button className="primary  m-sm">Chat User</Button> */}
              </div>
            </MobileFooter>
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
          </>
        )}
      </TradeWrapper>
      <Spacer height={20} />
      <OnlyMobile>
        <Center>
          <Text as="div" weight="700" size="s1">
            NB:{" "}
            <div
              onClick={() => setOpen(true)}
              style={{
                display: "inline-block",
                cursor: "pointer",
                textDecoration: "underline",
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
        headerText="Escrow Fee"
        type="info"
        msg="Escrow Fee is a trading fee we charge to guarantee you a secured transaction. We charge from both parties to safe guard token transactions. Our fee’s are not more than 3% per trade. If trades are cancelled at any point in the transaction queue, we would refund all payments inclusive of the Escrow Fee. We provide this feature on all token and coin transactions on our platform. If you have anymore questions please reach us on our email support@vetme.com or via our telegram platform. Thanks for trading with us."
      />

      <ConnectModal
        show={show}
        connect={(connector) => {
          setShow(false);
          connect(connector);
        }}
        handleClose={() => setShow(false)}
      />
    </ContainerSm>
  );
};

const buildStepper = (status: number, amount: any, token: string) => (
  <Stepper status={status}>
    <Step
      className={status >= 1 ? "active" : ""}
      leftMsg={status >= 1 ? "Transaction  Opened" : ""}
      rightMsg={status >= 1 ? "Transaction  Opened" : ""}
    >
      <PCircle color={status >= 1 ? "#BEFECD" : ""} />
    </Step>
    <StepLineCon>
      <StepLine color={status >= 2 ? "#BEFECD" : ""} />
      <StepLine color={status >= 2 ? "#BEFECD" : ""} />
      <StepLine color={status >= 2 ? "#BEFECD" : ""} />
    </StepLineCon>
    <Step
      className={status >= 2 ? "active" : ""}
      leftMsg={status >= 2 ? `Approved ${amount}${token}` : ""}
    >
      <PCircle color={status >= 2 ? "#BEFECD" : ""} />
    </Step>
    <StepLineCon>
      <StepLine color={status >= 3 ? "#BEFECD" : ""} />
      <StepLine color={status >= 3 ? "#BEFECD" : ""} />
      <StepLine color={status >= 3 ? "#BEFECD" : ""} />
    </StepLineCon>
    <Step
      className={status >= 3 ? "active" : ""}
      leftMsg={status >= 3 ? "Deal Completed" : ""}
    >
      <PCircle color={status >= 3 ? "#BEFECD" : ""} />
    </Step>
  </Stepper>
);

export default Trans;
