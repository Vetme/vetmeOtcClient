import styled, { css } from "styled-components";

const flex = css`
  display: flex;
`;

export const Wrapper = styled.div``;

export const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  /* position: sticky; */
  top: 10px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;
export const LeftSide = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }
`;

export const LayoutSwitch = styled.div`
  padding: 6px;
  width: 100px;
  background: #fff;
  border: 1px solid #2e203e;
  border-radius: 12px;
  display: flex;
  align-items: center;
  height: 56px;

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  svg {
    height: 34px;
    /* width: 34px; */
  }

  @media (max-width: 640px) {
    &.hidden {
      display: none;
      pointer-events: none;
    }
  }
`;
export const SwitchItem = styled.div`
  cursor: pointer;
  height: 44px;
  width: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  path {
    stroke: #453953;
  }

  text-transform: uppercase;
  svg {
    stroke: #453953;
  }
  &.active,
  &:hover {
    svg,
    stroke {
      fill: #ffffff;
    }
    background: #170728;
  }
`;

export const SwitchItem2 = styled.div`
  cursor: pointer;
  height: 44px;
  display: flex;
  width: 50%;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 1px;
  text-transform: uppercase;
  justify-content: center;
  transition: 0.3s;
  border-radius: 8px;

  align-items: center;
  &.active,
  &:hover {
    /* White/Main (100) */
    color: #ffffff;
    background: #170728;
  }
`;
export const ActionSwitch = styled.div`
  padding: 6px 7px;
  background: #ffffff;
  border: 1px solid #2e203e;
  border-radius: 12px;
  height: 56px;
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 24px;
  width: 396px;
  max-width: 80%;
  gap: 7px;
`;

export const SearchContainer = styled.div`
  width: 376px;
  max-width: 80%;

  &.hidden {
    display: none;
    pointer-events: none;
  }

  @media (max-width: 640px) {
    width: 100%;
    margin-top: 20px;
  }
`;
export const InputWrapper = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  padding: 0px 9px 0px 20px;

  background: #ffffff;
  font-size: 18px;

  color: #170728;
  /* Blue/800 */

  border: 1px solid #2e203e;
  border-radius: 12px;

  svg {
    flex-shrink: 0;
  }

  input {
    height: 50px;
    outline: none;
    border: none;
    font-size: 18px;
    padding: 0px 19px;
    width: 90%;
  }
`;

export const HomeBody = styled.div`
  padding: 24px 0px;
`;
export const GridWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ListWrapper = styled.div`
  &.mobile {
    display: none;
  }

  @media (max-width: 920px) {
    &.desktop {
      display: none;
    }
    &.mobile {
      display: block;
      background: #ffffff;
      /* padding: 10px; */
    }
  }
`;
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
  align-items: center;
  padding: 32px 10px;

  &:nth-child(even) {
    background: #ececec;
  }
`;
export const ListCol = styled.div`
  flex: 1;
  font-size: 20px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
`;

export const List = styled.div``;
export const Swap = styled.div``;
