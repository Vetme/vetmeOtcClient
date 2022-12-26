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
import { useTokenFetch } from "@/hooks/customHooks";
import { truncate } from "@/helpers";

const HomePage = () => {
  const [display, setDisplay] = useState<"grid" | "list">("grid");
  const [mode, setMode] = useState<"list" | "swap">("swap");
  const { loading, data } = useTokenFetch();

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
                  {loading ? (
                    <span>loading...</span>
                  ) : (
                    data.map((list: any, i: number) => (
                      <SwapGrid list={list} key={i} />
                    ))
                  )}
                </GridWrapper>
              ) : (
                <>
                  <ListWrapper className="desktop">
                    <ListHeader>
                      <HeaderItem>Wallet ID</HeaderItem>
                      <HeaderItem>Selling Rate</HeaderItem>
                      <HeaderItem>Available </HeaderItem>
                      <HeaderItem>Escrow Fee</HeaderItem>
                      <HeaderItem>Give</HeaderItem>
                      <HeaderItem>Get</HeaderItem>
                    </ListHeader>
                    <ListBody>
                      {loading ? (
                        <span>loading...</span>
                      ) : (
                        data.map((list: any, i: number) => (
                          <ListRow key={i + "grid"}>
                            <ListCol>
                              {truncate(list.receiving_wallet, 9, "***")}
                            </ListCol>
                            <ListCol>{list.amount_in.toFixed(2)}</ListCol>
                            <ListCol>{list.amount_out.toFixed(2)}</ListCol>
                            <ListCol>3%</ListCol>
                            <ListCol>
                              <Button className="primary-accent">VetMe</Button>
                            </ListCol>
                            <ListCol>
                              <Button className="primary">BTC</Button>
                            </ListCol>
                          </ListRow>
                        ))
                      )}
                    </ListBody>
                  </ListWrapper>
                  <ListWrapper className="mobile">
                    <GridWrapper>
                      {loading ? (
                        <span>loading...</span>
                      ) : (
                        data?.map((list: any, i: number) => (
                          <MobileList list={list} key={i + "mlist"} />
                        ))
                      )}
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
