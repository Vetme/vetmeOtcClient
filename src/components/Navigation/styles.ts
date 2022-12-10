import styled, { css } from "styled-components";
import { Flex } from "..";
import { NavLink } from "react-router-dom";
import { PRIMARY_COLOR, PRIMARY_HOVER } from "./../../themes";

const flex = css`
  display: flex;
`;
export const DropDown = styled.div`
  position: absolute;
  /* background: #0d0c17; */
  background: ${({ theme }) => theme.colors.body};
  padding: 10px;
  min-width: 237px;
  line-height: 45px;
  display: none;
  border-radius: 4px;

  a {
    display: block;
    font-size: 16px;
  }
`;

export const Nav = styled.div`
  ${flex};
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

export const NavContainer = styled.div`
  height: 121px;
  line-height: 121px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  top: 0;
  position: relative;
  background: #fff;

  z-index: 9999;

  &.added {
    position: sticky;
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const NavItems = styled.div``;
export const Item = styled(NavLink)`
  font-size: 24px;
  font-weight: 700;
  padding: 0px 31px;
  color: #000000;
  transition: 0.3s;
  position: relative;

  &:hover {
    color: ${PRIMARY_HOVER};
  }

  &.active {
    color: ${PRIMARY_HOVER};

    &::after {
      content: "";
      border: 5px solid #4473eb;
      position: absolute;
      width: 39px;
      top: 39px;
      left: 33%;
    }
  }
`;
export const Logo = styled.div``;

export const Menu = styled.ul`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuItem = styled.li`
  transition: 0.2s;
  position: relative;
  line-height: 100px;

  &.dropdown:hover ${DropDown} {
    display: block;
  }
  .item {
    padding: 12px 16px;
    margin: 0px 10px;
    &:hover {
      color: ${({ theme }) => (theme.name === "Dark" ? "#C3C1FF" : "#3B35BF")};
    }

    &.active {
      color: ${({ theme }) => (theme.name === "Dark" ? "#C3C1FF" : "#3B35BF")};
    }

    @media (max-width: 1350px) {
      padding: 12px 12px;
    }
  }
  span {
    margin-left: -10px;
  }
`;

export const SWrapper = styled.div`
  margin-right: 20px;
  flex-shrink: 0;
  width: 300px;
`;

export const DFlex = styled(Flex)`
  justify-content: end;
  @media (max-width: 1200px) {
    ${SWrapper} {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MFlex = styled(Flex)`
  display: flex;
  gap: 20px;
  margin-right: 16px;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const NotifyIcon = styled.div`
  height: 38px;
  width: 38px;
  line-height: 30px;
  border-radius: 50%;
  background: ${({ theme }) =>
    theme.name === "Dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
  text-align: center;
  position: relative;
  cursor: pointer;

  &.has-n {
    &:after {
      content: "";
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background: #eb5757;
      position: absolute;
      top: 0px;
      right: 3px;
    }
  }
`;

export const AWrapper = styled.div`
  position: relative;
`;

export const BarWrapper = styled.div``;
