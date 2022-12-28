import {
  Center,
  Container,
  Flex,
  Spacer,
  Text,
  Wrapper,
  OnlyMobile,
} from "@/components";
import { Button } from "@/components/Button";
import React, { useState, useEffect } from "react";
import { hooks, metaMask } from "@/connector/metaMask";
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
  BtnWrapper,
  Stepper,
  Step,
  RBottom,
  RTop,
  MobileFooter,
} from "./styles";
import { useParams, useNavigate } from "react-router-dom";
import { List } from "@/components/Icons";
import { ListI } from "@/types";
import { truncate } from "@/helpers";
import {
  approveToken,
  getTokenAllowance,
  matchTokenOrder,
} from "@/helpers/contract";
import { fromBigNumber, generateNonce, listSign, toBigNumber } from "@/utils";
import CustomButton from "@/components/Button/CustomButton";
import BigNumber from "bignumber.js";

const Trans = () => {
  const [status, setStatus] = useState<number>(5); //
  const [loading, setLoading] = useState<boolean>(false); //
  const [approving, setApproving] = useState<boolean>(false);
  const [listing, setListing] = useState<ListI | undefined>(undefined); //
  const [allowance, setAllowance] = useState<string>("");
  let { id } = useParams();
  const { useAccount, useIsActive, useChainId, useProvider } = hooks;
  const account = useAccount() as string;
  const isActive = useIsActive();
  const provider = useProvider();
  const chainId = useChainId() as number;
  const navigate = useNavigate();

  //1=> Transaction Opened
  //2=> Token Sent
  //3=> Exchange Token Sent
  //4=> Withdraw
  //1=> Exchange Withdraw

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    getAllowance();
  }, [account, listing]);

  const fetchList = async () => {
    setLoading(true);
    const {
      data: { listing },
    } = await axios.get(`${import.meta.env.VITE_BASE_URL}/lists/${id}`);
    setLoading(false);
    setListing(listing);
    setStatus(listing.status);
  };

  const getAllowance = async () => {
    const allowance = await getTokenAllowance(
      listing?.token_in_metadata?.address,
      provider,
      chainId,
      account
    );
    setAllowance(fromBigNumber(allowance.toString()));
    if (fromBigNumber(allowance.toString()) >= listing?.amount_in) {
      setStatus(2);
    }
  };

  const approve = async () => {
    try {
      setApproving(true);
      const approval = await approveToken(
        listing?.token_in_metadata?.address,
        provider,
        chainId,
        listing?.amount_in
      );
      setStatus(2);
      setAllowance(listing?.amount_in);
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
      const nonce = generateNonce();
      let signatureData = {
        signatory: account,
        receivingWallet: account,
        tokenIn: listing?.token_out,
        tokenOut: listing?.token_in,
        amountOut: BigNumber(listing?.amount_in).times(1e18).toString(10),
        amountIn: BigNumber(listing?.amount_out).times(1e18).toString(10),
        deadline: listing?.deadline,
        nonce,
      };
      const signer = provider?.getSigner();
      const { signature } = await listSign(signer, signatureData);
      await matchTokenOrder(
        provider,
        chainId,
        listing?.signature,
        signature,
        listing,
        account,
        Number(nonce)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setApproving(false);
    }
  };

  return (
    <Container>
      <TradeWrapper>
        <Center>
          <Text as="h2" size="24px" weight="700">
            Transaction Queue
          </Text>
        </Center>
        <Spacer height={20} />
        {loading ? (
          <span>Loading</span>
        ) : (
          <>
            <TradeInner justify="space-between">
              <LeftContent direction="column" justify="space-between">
                <LTop>
                  <TradeItem>
                    {isActive ? (
                      <Text weight="700" size="24px">
                        {truncate(account || "", 9, "***")}
                      </Text>
                    ) : (
                      <Text color="#ff9800">Wallet not connected</Text>
                    )}

                    <Text weight="500" size="16px">
                      Wallet Id
                    </Text>
                  </TradeItem>
                  <Spacer height={26} />
                  <TradeItem>
                    <Text weight="500" size="16px">
                      You give
                    </Text>
                    <Text weight="700" size="24px">
                      {listing?.amount_in} {listing?.token_in_metadata.symbol}
                    </Text>
                    <Text weight="500" size="16px">
                      (Escrow fee : 1%)
                    </Text>
                  </TradeItem>
                </LTop>

                <LBottom>
                  <TradeItem>
                    <Text weight="700" size="24px">
                      NB: <span style={{ color: "#4473EB" }}>Escrow</span> Fee
                      Applies
                    </Text>
                  </TradeItem>
                  <Spacer height={24} />
                  {isActive ? (
                    <Flex className="">
                      {allowance < listing?.amount_in ? (
                        <CustomButton
                          classNames="primary md"
                          onClick={() => approve()}
                          text="Approve"
                          loading={loading || approving}
                          disabled={loading || approving}
                        />
                      ) : (
                        <CustomButton
                          classNames="primary md"
                          onClick={() => matchOrder()}
                          text="Swap"
                          loading={loading || approving}
                          disabled={loading || approving}
                        />
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
                    <></>
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
                    <Text weight="700" size="24px">
                      {truncate(listing?.receiving_wallet || "", 9, "***")}
                    </Text>
                    <Text weight="500" size="16px">
                      Wallet Id
                    </Text>
                  </TradeItem>
                  <Spacer height={26} />
                  <TradeItem>
                    <Text weight="500" size="16px">
                      You get
                    </Text>
                    <Text weight="700" size="24px">
                      {listing?.amount_out} {listing?.token_out_metadata.symbol}
                    </Text>
                    <Text weight="500" size="16px">
                      (Escrow fee : 1%)
                    </Text>
                  </TradeItem>
                </RTop>
                <RBottom>
                  <Button className="primary md">Chat User</Button>
                </RBottom>
              </RightContent>
            </TradeInner>
            <MobileFooter>
              <Spacer height={22} />
              <div className="inner">
                {isActive ? (
                  <>
                    {allowance < listing?.amount_in ? (
                      <CustomButton
                        classNames="primary m-sm"
                        onClick={() => approve()}
                        text="Approve"
                        loading={loading || approving}
                        disabled={loading || approving}
                      />
                    ) : (
                      <CustomButton
                        classNames="primary  m-sm"
                        onClick={() => matchOrder()}
                        text="Swap"
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
                  </>
                ) : (
                  <></>
                )}

                {/* <Button className="primary  m-sm">Chat User</Button> */}
              </div>
              <Spacer height={17} />
            </MobileFooter>
            <Footer>
              <Center style={{ flexDirection: "column" }}>
                <Spacer height={16} />
                <Text size="16px" weight="500">
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
          <Text weight="700" size="24px">
            NB: <span style={{ color: "#4473EB" }}>Escrow</span> Fee Applies
          </Text>
        </Center>
      </OnlyMobile>
    </Container>
  );
};

const buildStepper = (status: number, amount: any, token: string) => (
  <Stepper status={status}>
    <Step
      className={status >= 1 ? "active" : ""}
      leftMsg={status >= 1 ? "Transaction  Opened" : ""}
      rightMsg={status >= 1 ? "Transaction  Opened" : ""}
    ></Step>
    <Step
      className={status >= 2 ? "active" : ""}
      leftMsg={status >= 2 ? `Approved ${amount}${token}` : ""}
    ></Step>
    <Step
      className={status >= 3 ? "active" : ""}
      rightMsg={status >= 3 ? "Sent 0.6433 BTC To Escrow" : ""}
    ></Step>
    {/* <Step
      className={status >= 4 ? "active" : ""}
      leftMsg={status >= 4 ? "Withdrawn  1.9890 BTC from Escrow" : ""}
    ></Step>
    <Step
      className={status == 5 ? "active" : ""}
      rightMsg={status == 5 ? "Withdrawn  1.9890 ETH from Escrow" : ""}
    ></Step> */}
  </Stepper>
);

export default Trans;
