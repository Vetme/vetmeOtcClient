import { Flex, Spacer, Text } from "@/components";
import { CounterGrid, SwapGrid } from "@/components/Card";
import { AscDesc, FilterCircle, LSearch } from "@/components/Icons";
import { ListModal, Message, Settings } from "@/components/Modal";
import { useListFetch } from "@/hooks/customHooks";
import { useState, useMemo, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { GridWrapper, InputWrapper, SearchContainer } from "../home/styles";
import {
  ListingInner,
  ListingTabs,
  MyListingWrapper,
  TabItems,
  SearchCon,
  ListingBody,
} from "./styles";
import apiHelper from "@/helpers/apiHelper";
import { ListI } from "@/types";
import { parseError, parseSuccess } from "@/utils";

function MyListings() {
  const [active, setActive] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const { account } = useWeb3React<Web3Provider>();
  const [listings, setListings] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [counters, setCounters] = useState<any[]>([]);

  // const { loading, data, setQuery, query } = useListFetch();
  const tabs = useMemo(
    () => ["All Trades", "Successful trades", "Failed trade", "Counter Offers"],
    []
  );

  const onChangeHandler = async (e: any) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    getMyListings();
  }, []);

  useEffect(() => {
    notifyViewed();
  }, [active]);

  const notifyViewed = async () => {
    if (active == 3) {
      await apiHelper.markAsViewed(account);
    }
  };

  const getMyListings = async () => {
    setLoading(true);
    try {
      const {
        data: { listings },
      } = await apiHelper.getMyListings(account);

      const {
        data: { counters },
      } = await apiHelper.myCounters(account);

      setListings(listings);
      setCounters(counters);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleActive = (i: number) => {
    const copies = listings;
    if (i == 1) {
      const s = copies.filter((list) => list.status == 3);
      setFiltered(s);
    } else if (i == 2) {
      const s = copies.filter((list) => list.status == 6);
      setFiltered(s);
    } else if (i == 3) {
    } else {
    }

    setActive(i);
  };

  const handleRemove = async (list: ListI) => {
    const confirm_it = confirm("Are you sure ?");
    if (!confirm_it) return;

    try {
      await apiHelper.removeList({ id: list._id, account: account });
      setListings((prev) => prev.filter((data) => data._id !== list._id));
      setFiltered((prev) => prev.filter((data) => data._id !== list._id));
      parseSuccess("List Deleted");
    } catch (error) {
      parseError("Unable to delete");
    }
  };

  return (
    <MyListingWrapper>
      <Flex directionM="column-reverse" align="flex-end" gap={15}>
        <ListingTabs className="custom-scroll">
          {tabs.map((tab, i) => (
            <TabItems onClick={() => handleActive(i)} key={i}>
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
          {active == 0 && (
            <GridWrapper>
              {loading ? (
                <span>loading...</span>
              ) : listings.length < 1 ? (
                <>
                  <Text>No Listing</Text>
                </>
              ) : (
                listings.map((list: any, i: number) => (
                  <SwapGrid
                    list={list}
                    key={i}
                    state="auth"
                    account={account}
                    confirmFriction={() => null}
                    handleRemove={handleRemove}
                  />
                ))
              )}
            </GridWrapper>
          )}

          {active == 1 && (
            <>
              <GridWrapper>
                {loading ? (
                  <span>loading...</span>
                ) : filtered.length < 1 ? (
                  <>
                    <Text>No Listing</Text>
                  </>
                ) : (
                  filtered.map((list: any, i: number) => (
                    <SwapGrid
                      list={list}
                      key={i}
                      state="auth"
                      account={account}
                      confirmFriction={() => null}
                      handleRemove={handleRemove}
                    />
                  ))
                )}
              </GridWrapper>
            </>
          )}

          {active == 2 && (
            <>
              <GridWrapper>
                {loading ? (
                  <span>loading...</span>
                ) : filtered.length < 1 ? (
                  <>
                    <Text>No Listing</Text>
                  </>
                ) : (
                  filtered.map((list: any, i: number) => (
                    <SwapGrid
                      list={list}
                      key={i}
                      state="auth"
                      account={account}
                      confirmFriction={() => null}
                      handleRemove={handleRemove}
                    />
                  ))
                )}
              </GridWrapper>
            </>
          )}

          {active == 3 && (
            <>
              <GridWrapper>
                {loading ? (
                  <span>loading...</span>
                ) : counters.length < 1 ? (
                  <>
                    <Text>No Listing</Text>
                  </>
                ) : (
                  counters.map((counter: any, i: number) => (
                    <CounterGrid counter={counter} key={i} state="auth" />
                  ))
                )}
              </GridWrapper>
            </>
          )}
        </ListingBody>
      </ListingInner>

      {/* <Message
        msg="Your trade has been edited"
        headerText="Success"
        show={open}
        handleClose={() => setOpen(false)}
      /> */}
      {/* <ListModal show={open} handleClose={() => setOpen(false)} /> */}
    </MyListingWrapper>
  );
}

export default MyListings;
