import { Container, Flex } from "@/components";
import { Button } from "@/components/Button";
import { SwapGrid } from "@/components/Card";
import { Filter, Grid, List, Search } from "@/components/Icons";
import { swaps } from "@/data";
import React from "react";
import { useState } from "react";
import {
  Wrapper,
  ActionSwitch,
  HomeHeader,
  LayoutSwitch,
  SearchContainer,
  SwitchItem,
  SwitchItem2,
  InputWrapper,
  LeftSide,
  HomeBody,
  GridWrapper,
  ListWrapper,
  ListHeader,
  HeaderItem,
  ListBody,
  ListRow,
  ListCol,
} from "./styles";

const HomePage = () => {
  const [display, setDisplay] = useState<"grid" | "list">("grid");

  return (
    <Container>
      <Wrapper>
        <HomeHeader>
          <LeftSide>
            <LayoutSwitch>
              <SwitchItem
                onClick={() => setDisplay("grid")}
                className={display === "grid" ? "active" : ""}
              >
                <Grid />
              </SwitchItem>
              <SwitchItem
                onClick={() => setDisplay("list")}
                className={display === "list" ? "active list" : "list"}
              >
                <List />
              </SwitchItem>
            </LayoutSwitch>
            <ActionSwitch>
              <SwitchItem2 className="active">Swap</SwitchItem2>
              <SwitchItem2>List</SwitchItem2>
            </ActionSwitch>
          </LeftSide>
          <SearchContainer>
            <InputWrapper>
              <Search />
              <input />
              <Filter />
            </InputWrapper>
          </SearchContainer>
        </HomeHeader>

        <HomeBody>
          {display === "grid" ? (
            <GridWrapper>
              {swaps.map((swap, i) => (
                <SwapGrid key={i} />
              ))}
            </GridWrapper>
          ) : (
            <ListWrapper>
              <ListHeader>
                <HeaderItem>Wallet ID</HeaderItem>
                <HeaderItem>Selling Rate</HeaderItem>
                <HeaderItem>Available </HeaderItem>
                <HeaderItem>Limit</HeaderItem>
                <HeaderItem>Give</HeaderItem>
                <HeaderItem>Get</HeaderItem>
              </ListHeader>
              <ListBody>
                <ListRow>
                  <ListCol>751***khgafk</ListCol>
                  <ListCol>$1.00</ListCol>
                  <ListCol>$4000</ListCol>
                  <ListCol>$20</ListCol>
                  <ListCol>
                    <Button className="primary-accent">VetMe</Button>
                  </ListCol>
                  <ListCol>
                    <Button className="primary">Buy BTC</Button>
                  </ListCol>
                </ListRow>
                <ListRow>
                  <ListCol>751***khgafk</ListCol>
                  <ListCol>$1.00</ListCol>
                  <ListCol>$4000</ListCol>
                  <ListCol>$20</ListCol>
                  <ListCol>
                    <Button className="primary-accent">VetMe</Button>
                  </ListCol>
                  <ListCol>
                    <Button className="primary">Buy BTC</Button>
                  </ListCol>
                </ListRow>
                <ListRow>
                  <ListCol>751***khgafk</ListCol>
                  <ListCol>$1.00</ListCol>
                  <ListCol>$4000</ListCol>
                  <ListCol>$20</ListCol>
                  <ListCol>
                    <Button className="primary-accent">VetMe</Button>
                  </ListCol>
                  <ListCol>
                    <Button className="primary">Buy BTC</Button>
                  </ListCol>
                </ListRow>
              </ListBody>
            </ListWrapper>
          )}
        </HomeBody>
      </Wrapper>
    </Container>
  );
};

export default HomePage;
``;
