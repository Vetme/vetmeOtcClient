import styled, { css } from "styled-components";

const flex = css`
  display: flex;
`;

export const Wrapper = styled.div``;

export const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 10px;
`;
export const LeftSide = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LayoutSwitch = styled.div`
  padding: 8px;
  background: #d8d8d8;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 54px;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  svg {
    height: 34px;
    /* width: 34px; */
  }
`;
export const SwitchItem = styled.div`
  cursor: pointer;
  height: 34px;

  &.list {
    path {
      transform: translate(6px, 7px);
    }
  }
  &.active {
    /* padding: 0px 8px; */
    background: #7da9ff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
`;

export const SwitchItem2 = styled.div`
  cursor: pointer;
  height: 53px;
  display: flex;
  align-items: center;
  &.active {
    padding: 10px;
    background: #7da9ff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
`;
export const ActionSwitch = styled.div`
  padding: 10px 12px;
  background: #d8d8d8;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 17px;
  height: 73px;
  line-height: 33px;
  font-weight: 800;
  font-size: 24px;
`;

export const SearchContainer = styled.div`
  width: 30%;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;
export const InputWrapper = styled.div`
  height: 62px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 3px solid rgba(140, 140, 140, 0.46);
  border-radius: 10px;
  padding: 0px 27px;

  svg {
    flex-shrink: 0;
  }

  input {
    height: 50px;
    outline: none;
    border: none;
    font-size: 24px;
    padding: 0px 19px;
    width: 90%;
  }
`;

export const HomeBody = styled.div`
  padding: 41px 0px;
`;
export const GridWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ListWrapper = styled.div``;
export const ListHeader = styled.div`
  display: flex;
  background: #d9d9d9;
  justify-content: space-between;
  padding: 12px;
`;
export const HeaderItem = styled.div`
  font-size: 24px;
  font-weight: 700;
  flex: 1;
`;
export const ListBody = styled.div`
  /* display: flex; */
`;
export const ListRow = styled.div`
  display: flex;
  background: #fff;
  justify-content: space-between;
  padding: 12px;
  margin: 32px 0px;

  &:nth-child(even) {
    background: #ececec;
  }
`;
export const ListCol = styled.div`
  flex: 1;
  font-size: 24px;
  font-weight: 700;
`;

export const List = styled.div``;
export const Swap = styled.div``;
