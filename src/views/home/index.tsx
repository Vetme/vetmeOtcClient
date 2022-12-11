import { Container, Flex } from "@/components";
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
            <div>
              <h1>List View</h1>
            </div>
          )}
        </HomeBody>
      </Wrapper>
    </Container>
  );
};

export default HomePage;
``;
