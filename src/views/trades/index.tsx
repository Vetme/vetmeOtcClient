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
import React, { useState } from "react";
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

const Trans = () => {
  const [status, setStatus] = useState<number>(5); //
  //1=> Transaction Opened
  //2=> Token Sent
  //3=> Exchange Token Sent
  //4=> Withdraw
  //1=> Exchange Withdraw
  return (
    <Container>
      <TradeWrapper>
        <Center>
          <Text as="h2" size="24px" weight="700">
            Transaction Quese
          </Text>
        </Center>
        <Spacer height={20} />
        <TradeInner justify="space-between">
          <LeftContent direction="column" justify="space-between">
            <LTop>
              <TradeItem>
                <Text weight="700" size="24px">
                  hgk77s7fdskjh
                </Text>
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
                  0.34 BTC
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
              <Flex className="">
                <Button className="primary md">Send Token</Button>
                <Spacer width={41} />
                <Button className="primary-accent md">Cancel</Button>
              </Flex>
            </LBottom>
          </LeftContent>
          {buildStepper(status)}
          <RightContent
            direction="column"
            justify="space-between"
            align="flex-end"
          >
            <RTop>
              <TradeItem>
                <Text weight="700" size="24px">
                  hgk77s7fdskjh
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
                  0.34 ETH
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
            <Button className="primary  m-sm">Send Token</Button>
            <Button className="primary-accent  m-sm">Cancel</Button>
            <Button className="primary  m-sm">Chat User</Button>
          </div>
          <Spacer height={17} />
        </MobileFooter>
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
      leftMsg={status >= 1 ? "Transaction  Opened" : ""}
      rightMsg={status >= 1 ? "Transaction  Opened" : ""}
    ></Step>
    <Step
      className={status >= 2 ? "active" : ""}
      leftMsg={status >= 2 ? "Sent 0.3433 ETH To Escrow" : ""}
    ></Step>
    <Step
      className={status >= 3 ? "active" : ""}
      rightMsg={status >= 3 ? "Sent 0.6433 BTC To Escrow" : ""}
    ></Step>
    <Step
      className={status >= 4 ? "active" : ""}
      leftMsg={status >= 4 ? "Withdrawn  1.9890 BTC from Escrow" : ""}
    ></Step>
    <Step
      className={status == 5 ? "active" : ""}
      rightMsg={status == 5 ? "Withdrawn  1.9890 ETH from Escrow" : ""}
    ></Step>
  </Stepper>
);

export default Trans;
