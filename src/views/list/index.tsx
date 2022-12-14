import { Center, Container, Flex, Spacer, Text, Wrapper } from "@/components";
import { Button } from "@/components/Button";
import React, { useState } from "react";
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

const Trans = () => {
  const [status, setStatus] = useState<number>(2);
  const [visibility, setVisibility] = useState<boolean>(false);
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
            List Transaction Queue
          </Text>
        </Center>
        <Spacer height={20} />
        <TradeItem>
          <Text weight="700" size="24px">
            hgk77s7fdskjh
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
                  0.34 BTC
                </Text>
                <Text weight="500" size="16px">
                  (Escrow fee : 1%)
                </Text>
              </TradeItem>
            </LTop>
          </LeftContent>
          <SwitchTab
            align="center"
            className={visibility ? "visible" : "invisible"}
          >
            <Tab onClick={() => setVisibility(false)}>Private</Tab>
            <Tab onClick={() => setVisibility(true)}>Public</Tab>
          </SwitchTab>
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
                  0.34 ETH
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
        <Spacer height={72} />

        <Center style={{ flexDirection: "column" }}>
          <TradeItem>
            <Text weight="700" size="24px">
              NB: <span style={{ color: "#4473EB" }}>Escrow</span> Fee Applies
            </Text>
          </TradeItem>
          <Spacer height={24} />
          <Flex>
            <Button className="primary md">Send Token</Button>
            <Spacer width={41} />
            <Button className="primary-accent md">Cancel</Button>
          </Flex>
        </Center>
        <Spacer height={35} />

        <Footer>
          <Center style={{ flexDirection: "column" }}>
            <BtnWrapper>
              <Button className="block success">Send Token to Escrow</Button>
            </BtnWrapper>
            <Spacer height={16} />
            <Text size="16px" weight="500">
              Your money is safe in our Escrow
            </Text>
          </Center>
        </Footer>
      </TradeWrapper>
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
      rightMsg={status == 2 ? "Send money" : ""}
    ></Step>
    <Step
      className={status >= 3 ? "active" : ""}
      rightMsg={status == 3 ? "Coin Listed" : ""}
    ></Step>
  </Stepper>
);

export default Trans;
