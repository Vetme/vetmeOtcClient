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
import { TradeWrapper } from "./styles";

const Trans = () => {
  const [status, setStatus] = useState<number>(5); //
  return (
    <Container>
      <TradeWrapper>
        <Center>
          <Text as="h2" size="24px" weight="700">
            Transaction Quese
          </Text>
        </Center>
        <Spacer height={20} />
      </TradeWrapper>
      <Spacer height={20} />
    </Container>
  );
};

export default Trans;
