import { ContainerSm, Flex } from "@/components";
import { ListCard, SwapGrid, MobileList } from "@/components/Card";
import {
  Filter,
  FilterCircle,
  Grid,
  Linear,
  List,
  ListGrid,
  LSearch,
  Search,
} from "@/components/Icons";
import { useState } from "react";
import CustomButton from "@/components/Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
import { useListFetch, useTokenFetch } from "@/hooks/customHooks";
import { truncate } from "@/helpers";
import { formatDateTime, formatSecTime, getForever } from "@/utils";
import { Message } from "@/components/Modal";

const HomePage = () => {
  const [display, setDisplay] = useState<"grid" | "list">("grid");
  const [mode, setMode] = useState<"list" | "swap">("swap");
  const [open, setOpen] = useState<boolean>(false);
  const { loading, data, setQuery, query } = useListFetch();
  const navigate = useNavigate();

  const onChangeHandler = async (e: any) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    // setTimeout(() => setOpen(true), 4000);
  }, []);

  return (
    <ContainerSm>
      <Wrapper>
        <HomeHeader>
          <LeftSide>
            <LayoutSwitch className={classNames({ hidden: mode == "list" })}>
              <SwitchItem
                onClick={() => setDisplay("grid")}
                className={display === "grid" ? "active" : ""}
              >
                <Linear />
              </SwitchItem>
              <SwitchItem
                onClick={() => setDisplay("list")}
                className={display === "list" ? "active list" : "list"}
              >
                <ListGrid />
              </SwitchItem>
            </LayoutSwitch>
          </LeftSide>
          <Flex justify="space-between" align="center" style={{ flex: 1 }}>
            <ActionSwitch>
              <SwitchItem2 onClick={() => navigate("/")} className="active">
                Swap
              </SwitchItem2>
              <SwitchItem2 onClick={() => navigate("/list/create")}>
                List
              </SwitchItem2>
            </ActionSwitch>
            <SearchContainer className={classNames({ hidden: mode == "list" })}>
              <InputWrapper>
                <LSearch />
                <input
                  placeholder="SEARCH"
                  value={query}
                  onChange={(e) => onChangeHandler(e)}
                />
                <FilterCircle />
              </InputWrapper>
            </SearchContainer>
          </Flex>
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
                      <SwapGrid list={list} key={i} state="guest" />
                    ))
                  )}
                </GridWrapper>
              ) : (
                <>
                  <ListWrapper className="desktop">
                    <ListHeader>
                      <HeaderItem>Wallet ID</HeaderItem>
                      <HeaderItem>Published </HeaderItem>
                      <HeaderItem>Expiry Time </HeaderItem>
                      <HeaderItem>Escrow Fee</HeaderItem>
                      <HeaderItem>Give</HeaderItem>
                      <HeaderItem>Get</HeaderItem>
                      <HeaderItem>Action</HeaderItem>
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
                            <ListCol>{formatDateTime(list.createdAt)}</ListCol>
                            <ListCol>
                              {list.deadline == getForever
                                ? "Forever"
                                : formatSecTime(list.deadline)}
                            </ListCol>
                            <ListCol>3%</ListCol>
                            <ListCol>
                              {Number(list.amount_out).toFixed(2)} &nbsp;
                              {list.token_out_metadata?.symbol}
                            </ListCol>
                            <ListCol>
                              {Number(list.amount_in).toFixed(2)} &nbsp;
                              {list.token_in_metadata?.symbol}
                            </ListCol>
                            <ListCol>
                              <CustomButton
                                onClick={() => navigate(`trades/${list._id}`)}
                                text="Trade"
                                classNames="primary"
                              />
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
        {/* // redirectUrl="test-tokens" */}
        {/* headerText="Test Tokens" */}
        <Message
          type="ld"
          show={open}
          handleClose={() => setOpen(false)}
          msg="Claim Free Test tokens to trade on the platform"
        />
      </Wrapper>
    </ContainerSm>
  );
};

export default HomePage;
``;
