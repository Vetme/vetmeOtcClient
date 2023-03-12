import styled from "styled-components";

export const MyListingWrapper = styled.div`
  margin-top: 30px;
`;

export const ListingInner = styled.div`
  padding: 8px;
`;
export const ListingTabs = styled.div`
  display: flex;
  height: 34.5px;
  background-image: url(/images/bg/tab-bg.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  padding-left: 95px;
`;
export const TabItems = styled.div`
  padding: 0px 26px;
  white-space: nowrap;
  cursor: pointer;
  color: #170728;
  font-size: 16px;
  font-weight: 300;
  margin-top: 4px;

  &:nth-child(1) {
    padding-left: 0px;
  }
`;
export const SearchCon = styled.div`
  /* min-width: 376px; */
`;
