import styled, { css } from "styled-components";
import { Flex } from "..";
import { NavLink } from "react-router-dom";
import {
  PRIMARY_COLOR,
  PRIMARY_HOVER,
  SECONDARY_COLOR,
  SECONDARY_COLOR_GREEN,
} from "./../../themes";

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
  height: 72px;
  position: relative;
  position: fixed;
  width: 100%;
  transition: 0.3s ease;
  /* z-index: 9999; */
  z-index: 99999;

  &.scroll-up {
    /* transform: translate3d(0px, -100px, 0px); */
  }
  &.scroll-down {
    transform: translate3d(0px, -100px, 0px);
  }
  &.added {
    position: sticky;
  }

  .item {
    font-size: 16px;
    font-weight: 300;
    padding: 0px 20px;
    color: #170728;
    transition: 0.3s;
    position: relative;

    &:hover,
    &.active {
      span {
        border-bottom: 1px solid ${PRIMARY_COLOR};
      }
    }
  }

  .mitem {
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    margin: 20px 0px;
    display: block;
  }

  @media (max-width: 640px) {
    height: 72px;
    /* line-height: 111px; */
  }
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* line-height: 72px; */
  height: 72px;
  border-radius: 100px;
  border: 1px solid #5d5169;
  padding: 0px 16px;
  margin: 16px 0px;
  z-index: 9999;
  position: relative;
  background: #fff;
  /* width: calc(100% - 50px); */
`;
export const NavItems = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
`;
export const Item = styled(NavLink)`
  font-size: 16px;
  font-weight: 300;
  padding: 0px 20px;
  color: #170728;
  position: relative;
  transition: transform 0.5s ease;

  &:after,
  &.active {
    transition: transform 0.5s ease;
    transform: scaleX(0);
  }

  &:hover,
  &.active {
    span {
      border-bottom: 1px solid ${PRIMARY_COLOR};
    }
  }
`;
export const Logo = styled(NavLink)`
  display: flex;
  align-items: center;

  img {
    width: 10rem;
  }
`;

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

export const DFlex = styled.div`
  display: flex;
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

export const MFlex = styled.div`
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
export const Action = styled.div`
  position: relative;
  @media (max-width: 640px) {
    display: none;
  }
`;

export const IconM = styled.div`
  position: absolute;
  left: 50%;
  top: 0px;
  transform: translateX(-50%);
`;

export const MobileMenu = styled.div`
  position: absolute;
  width: 100%;
  top: 84px;
  width: calc(100% - 1.3rem);
  left: 50%;
  transform: translateX(-50%);
  /* max-height: 0px; */
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  background-image: url(/images/bg/mobile-m.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  backdrop-filter: blur(5px);
  transition: all 0.7s 0s;
  z-index: 99999;

  &.added {
    /* border: 1px solid #5d5169; */
    /* max-height: 400px; */
    backdrop-filter: blur(0px);
    opacity: 1;
    transition: all 0.7s 0.6s;
    pointer-events: inherit;
  }
`;
export const MMenuInner = styled.div`
  padding: 34px 16px 18px 16px;
  text-align: center;
`;
export const MMenuItem = styled(NavLink)`
  text-align: center;
  font-weight: 400;
  font-size: 18px;
  line-height: 33px;
  margin: 12px 0px;
  display: block;
  text-transform: uppercase;
`;

export const Bar = styled.div`
  display: none;
  cursor: pointer;
  background: ${PRIMARY_COLOR};
  height:40px;
  width:40px;
  border-radius: 100px;


  
  @media (max-width: 640px) {
    position:relative;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

  
    
    /* height: 40px; */
    /* overflow-x: hidden; */
    div,div::before,div::after {
        background: #fff;
        content: "";
        display: block;
        height: 1px;
        width: 20px;
        position: absolute;
        transition: background ease 0.3s, top ease 0.3s 0.3s;
          transform ease 0.3s;
  }

  div{
    &::before {
      top: -3px;
      }

      &::after {
          top: 3px;
      }
  }

  &.opened{
       background: ${SECONDARY_COLOR_GREEN};
       border: 1px solid ${PRIMARY_COLOR};

       div,div::before,div::after {
        background: ${PRIMARY_COLOR};
      }
    
     div{
       background: transparent;

       &::before,&::after{
         top: 0;
         transition: top ease .3s, transform ease .3s .3s;
       }
    &::before {
      transform: rotate(45deg);
      }

      &::after {
      transform: rotate(-45deg);
      }
  }
  }
}
`;

export const SideBarCon = styled.div`
  min-width: 224px;
  background: #eff1ea;
  border: 1px solid #453953;
  border-radius: 10px;
  height: 100%;
  min-height: 500px;
  padding: 32px;
  /* min-height: 100vh; */

  @media (max-width: 767px) {
    display: none;
  } ;
`;

export const DashBody = styled.div`
  flex: 1;

  @media (max-width: 767px) {
    overflow: hidden;
  }
`;

export const DropDownCon = styled.div`
  position: absolute;
  top: 60px;
  /* height: 300px; */
  width: 300px;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #170728;
  right: 0;
  transform: translateY(60px);
  transition: 0.5s;
  opacity: 0;
  pointer-events: none;
  padding: 10px;

  &.active {
    transform: translateY(0px);
    opacity: 1;
    pointer-events: inherit;
  }
`;
export const Notify = styled.div`
  margin-left: 8px;
  height: 40px;
  width: 40px;
  border: 1px solid #170728;
  border-radius: 100px;
  position: relative;
  display: grid;
  place-content: center;

  @media (max-width: 640px) {
    margin-right: 10px;
    margin-left: 0px;
  }
`;
export const Count = styled.div`
  position: absolute;
  height: 20px;
  width: 20px;
  display: grid;
  place-content: center;
  background: #befecd;
  border-radius: 50px;
  left: 28px;
  border: 1px solid #170728;
`;

export const MMenuR = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: flex;
  }
`;
