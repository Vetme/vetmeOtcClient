import React from "react";
import { Text } from "..";
import { SideBarCon } from "./styles";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

const SItems = styled(NavLink)`
  margin: 24px 0px;
  cursor: pointer;
  position: relative;
  width: fit-content;
  display: block;

  span {
    transition: 0.5s;
    color: #453953;
  }
  &:hover,
  &.active {
    span {
      color: #170728;
    }
    &:after {
      content: "";
      height: 7px;
      width: 7px;
      border-radius: 50%;
      position: absolute;
      background: #170728;
      top: 10px;
      right: -13px;
    }
  }
`;
const SideBar = () => {
  return (
    <SideBarCon>
      <SItems to="/dashboard/my-listings">
        <Text size="s1" uppercase>
          Trade
        </Text>
      </SItems>
      <SItems to="/dashboard/history">
        <Text size="s1" uppercase>
          History
        </Text>
      </SItems>
      <SItems to="/dashboard/profile">
        <Text size="s1" uppercase>
          My Profile
        </Text>
      </SItems>
    </SideBarCon>
  );
};

export default SideBar;
