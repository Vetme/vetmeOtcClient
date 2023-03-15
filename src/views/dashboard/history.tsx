import { Flex, Spacer, Text } from "@/components";
import { AscDesc, FilterCircle, LSearch } from "@/components/Icons";
import { Settings } from "@/components/Modal";
import { useListFetch } from "@/hooks/customHooks";
import { formatDateTime } from "@/utils";
import { GridWrapper, InputWrapper } from "../home/styles";
import {
  ListingInner,
  MyListingWrapper,
  SearchCon,
  ListingBody,
  TableWrapper,
  TableHeading,
  TableBody,
  TableItem,
  Row,
  Badge,
} from "./styles";

function History() {
  const { loading, data, setQuery, query } = useListFetch();

  const onChangeHandler = async (e: any) => {
    setQuery(e.target.value);
  };

  return (
    <MyListingWrapper>
      <Flex align="flex-end" gap={10}>
        <div></div>
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
          <TableWrapper>
            <TableHeading>
              <TableItem>.</TableItem>
              <TableItem>Trade</TableItem>
              <TableItem>Give</TableItem>
              <TableItem>Get </TableItem>
              <TableItem>Date</TableItem>
              <TableItem>Status</TableItem>
            </TableHeading>
            <TableBody>
              {loading ? (
                <span>loading...</span>
              ) : (
                data
                  .slice(0, 8)
                  .map((list: any, i: number) => (
                    <ListItem list={list} key={i} i={i} />
                  ))
              )}
            </TableBody>
          </TableWrapper>
        </ListingBody>
      </ListingInner>
    </MyListingWrapper>
  );
}

const arr = ["pending", "declined", "successful"];

const ListItem = ({ list, i }: any) => {
  let state = arr[Math.floor(Math.random() * arr.length)];
  return (
    <Row>
      <TableItem>{i + 1}</TableItem>
      <TableItem>{list.amount_out}</TableItem>
      <TableItem>{list.amount_out}</TableItem>
      <TableItem>{list.amount_in}</TableItem>
      <TableItem>{formatDateTime(list.createdAt)}</TableItem>
      <div>
        <BuildBadge type={"successful"} text={state} />
      </div>
    </Row>
  );
};

const BuildBadge = ({
  text,
  type,
}: {
  text: string;
  type: "pending" | "declined" | "successful";
}) => (
  <Badge className={type}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z" />
    </svg>
    <span>{text}</span>
  </Badge>
);

export default History;
