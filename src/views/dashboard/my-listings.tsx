import { Flex, Spacer } from "@/components";
import { SwapGrid } from "@/components/Card";
import { AscDesc, FilterCircle, LSearch } from "@/components/Icons";
import { ListModal, Message, Settings } from "@/components/Modal";
import { useTokenFetch } from "@/hooks/customHooks";
import { useState, useMemo } from "react";
import { GridWrapper, InputWrapper, SearchContainer } from "../home/styles";
import {
  ListingInner,
  ListingTabs,
  MyListingWrapper,
  TabItems,
  SearchCon,
  ListingBody,
} from "./styles";

function MyListings() {
  const [active, setActive] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const { loading, data, setQuery, query } = useTokenFetch();
  const tabs = useMemo(
    () => ["All Trades", "Successful trades", "Failed trade", "Counter Offers"],
    []
  );

  const onChangeHandler = async (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <MyListingWrapper>
      <Flex align="flex-end" gap={10}>
        <ListingTabs>
          {tabs.map((tab, i) => (
            <TabItems onClick={() => setActive(i)} key={i}>
              {tab}
              {i == active && (
                <span className={active == 0 ? "" : "space"}>{tab}</span>
              )}
            </TabItems>
          ))}
        </ListingTabs>
        <SearchCon>
          <InputWrapper>
            <LSearch />
            <input
              placeholder="SEARCH"
              value={query}
              onChange={(e) => onChangeHandler(e)}
            />
            <FilterCircle />
            <Spacer width={8} />
            <AscDesc />
          </InputWrapper>
        </SearchCon>
      </Flex>
      <ListingInner>
        <ListingBody>
          <GridWrapper>
            {loading ? (
              <span>loading...</span>
            ) : (
              data.map((list: any, i: number) => (
                <SwapGrid list={list} key={i} state="auth" />
              ))
            )}
          </GridWrapper>
        </ListingBody>
      </ListingInner>

      {/* <Message
        msg="Your trade has been edited"
        headerText="Success"
        show={open}
        handleClose={() => setOpen(false)}
      /> */}
      {/* <ListModal show={open} handleClose={() => setOpen(false)} /> */}
      <Settings show={open} handleClose={() => setOpen(false)} />
    </MyListingWrapper>
  );
}

export default MyListings;
