import React from "react";
import { Flex, Text } from ".";
import { Link } from "react-router-dom";
import styled, { css, useTheme } from "styled-components";

const FooterContainer = styled.div`
  background: #fcfcfc;
  padding-top: 100px;
  padding-bottom: 70px;
  width: 100%;

  .ppm {
    display: none;
  }
`;
const Footer = () => {
  const common = css`
    transition: 0.3s;
    &:hover {
      color: white;
    }
  `;
  const CText = styled(Text)`
    ${common}
    margin: 10px 0px;
  `;

  const C2Text = styled(Text)`
    ${common};
  `;

  const CustomFlex = styled(Flex)``;

  return (
    <FooterContainer>
      <div className="container">
        <h2>Hello </h2>
      </div>
    </FooterContainer>
  );
};

export default Footer;
