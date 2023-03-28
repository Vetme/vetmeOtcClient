import styled from "styled-components";

export const MyListingWrapper = styled.div`
  margin-top: 30px;

  @media (max-width: 767px) {
    margin-top: 0px;
  } ;
`;

export const ListingInner = styled.div`
  padding: 50px 8px;

  @media (max-width: 767px) {
    padding: 30px 0px;
  } ;
`;
export const ListingTabs = styled.div`
  display: flex;
  height: 34.5px;
  /* background-image: url(/images/bg/tab-bg.png); */
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  padding-left: 95px;
  border-top: 2px solid #50455d;

  @media (max-width: 767px) {
    overflow-x: auto;
    /* background-image: none; */
    /* border: none; */
    width: 100%;
    height: 50px;
    overflow-y: clip;
    padding-bottom: 15px;
    padding-left: 10px;
  } ;
`;
export const TabItems = styled.div`
  padding: 0px 26px;
  white-space: nowrap;
  cursor: pointer;
  color: #170728;
  font-size: 16px;
  font-weight: 300;
  margin-top: 4px;
  position: relative;

  span {
    position: absolute;
    top: calc(0px - 6px);
    left: calc(0px - 12px);
    background: #fff;
    padding: 5px 10px;
    border: 2px solid #50455d;
    border-top: 3px solid #fff;
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &.space {
      margin-left: 26px;
    }
  }

  &:nth-child(1) {
    padding-left: 0px;
  }
`;
export const SearchCon = styled.div`
  /* min-width: 376px; */
`;
export const ListingBody = styled.div``;

export const ProfileInner = styled.div`
  padding: 0px 8px 50px 8px;
`;

export const ProfileBody = styled.div`
  padding-left: 54px;

  @media (max-width: 640px) {
    padding-left: 10px;
  }
`;

export const ActionU = styled.div`
  width: 300px;
  margin-left: 32px;
`;

export const AvatarCon = styled.div`
  height: 97px;
  width: 97px;
  background-image: url(/images/bg/a.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  position: relative;

  div {
    height: 60px;
    width: 60px;
    position: absolute;
    right: 4px;
    bottom: 4px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;

export const TableWrapper = styled.div`
  background-image: url(/images/bg/table.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  overflow-x: hidden;
`;
export const TableHeading = styled.div`
  display: flex;
  position: relative;
  left: 38px;
`;
export const TableBody = styled.div`
  position: relative;
  left: 38px;
`;
export const TableItem = styled.div`
  width: 200px;
  height: 20px;

  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height */

  text-transform: uppercase;

  /* Blue/600 */

  color: #5d5169;
  /* flex: 1; */
  &:nth-child(1) {
    width: 50px;
    flex: inherit;
  }

  &:nth-child(2) {
    left: 20px;
    position: relative;
  }

  &:last-child {
    left: 37px;
    position: relative;
  }
`;

export const Row = styled.div`
  display: flex;
  padding: 8px 0px;
  position: relative;
`;

export const Badge = styled.div`
  height: 27px;
  display: flex;
  align-items: center;
  border: 1px solid #170728;
  border-radius: 1000px;
  padding: 6px;
  gap: 3px;
  width: 117px;

  span {
    font-size: 12px;
    line-height: 18px;
    /* identical to box height */

    text-transform: uppercase;

    /* Blue/Main (900) */

    color: #170728;
  }

  &.successful {
    background: #befecd;
    svg {
      path {
        stroke: #72987b;
      }
    }
  }

  &.pending {
    background: #fef4be;
    svg {
      path {
        stroke: #989072;
      }
    }
  }
  &.declined {
    background: #febebe;
    svg {
      path {
        stroke: #987272;
      }
    }
  }
`;
