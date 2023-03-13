import styled from "styled-components";

export const MyListingWrapper = styled.div`
  margin-top: 30px;
`;

export const ListingInner = styled.div`
  padding: 50px 8px;
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
export const ListingBody = styled.div``;

export const ProfileInner = styled.div`
  padding: 0px 8px 50px 8px;
`;

export const ProfileBody = styled.div`
  padding-left: 54px;
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
