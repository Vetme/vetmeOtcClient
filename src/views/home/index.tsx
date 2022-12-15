import { Container, Flex } from "@/components";
import { Button } from "@/components/Button";
import { ListCard, SwapGrid, MobileList } from "@/components/Card";
import { Filter, Grid, List, Search } from "@/components/Icons";
import { swaps } from "@/data";
import React from "react";
import { useState } from "react";
import classNames from "classnames";
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
  List as ListCon,
  Swap,
} from "./styles";

const HomePage = () => {
  const [display, setDisplay] = useState<"grid" | "list">("grid");
  const [mode, setMode] = useState<"list" | "swap">("list");

  return (
    <Container>
      <Wrapper>
        <HomeHeader>
          <LeftSide>
            <LayoutSwitch className={classNames({ hidden: mode == "list" })}>
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
              <SwitchItem2
                onClick={() => setMode("swap")}
                className={mode === "swap" ? "active" : ""}
              >
                Swap
              </SwitchItem2>
              <SwitchItem2
                onClick={() => setMode("list")}
                className={mode === "list" ? "active" : ""}
              >
                List
              </SwitchItem2>
            </ActionSwitch>
          </LeftSide>
          <SearchContainer className={classNames({ hidden: mode == "list" })}>
            <InputWrapper>
              <Search />
              <input />
              <Filter />
            </InputWrapper>
          </SearchContainer>
        </HomeHeader>

        <HomeBody>
          {mode == "swap" ? (
            <Swap>
              {display === "grid" ? (
                <GridWrapper>
                  {swaps.map((swap, i) => (
                    <SwapGrid key={i} />
                  ))}
                </GridWrapper>
              ) : (
                <>
                  <ListWrapper className="desktop">
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
                  <ListWrapper className="mobile">
                    <GridWrapper>
                      {swaps.map((swap, i) => (
                        <MobileList key={i} />
                      ))}
                    </GridWrapper>
                  </ListWrapper>
                </>
              )}
            </Swap>
          ) : (
            <ListCon>
              <ListCard />
            </ListCon>
          )}
        </HomeBody>
      </Wrapper>
    </Container>
  );
};

export default HomePage;
``;
