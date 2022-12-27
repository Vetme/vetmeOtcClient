import { Flex } from "@/components";
import styled from "styled-components";

export const TradeWrapper = styled.div`
  background: #ececec;
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.12);
  border-radius: 20px;

  padding: 30px 126px;
  height: 700px;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 15px 15px;
    height: 404px;
  }
`;
export const TradeInner = styled(Flex)`
  /* height: calc(100% - 60px); */
  flex: 1;
`;
export const LeftContent = styled(Flex)`
  height: 90%;
  flex: 1;
`;
export const TradeItem = styled.div``;

export const RightContent = styled(Flex)`
  flex: 1;
  text-align: end;
  height: 90%;
  @media (max-width: 640px) {
    width: 50%;
  }
`;
export const LTop = styled.div`
  @media (max-width: 640px) {
    margin-top: 10px;
  }
`;
export const LBottom = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
`;
export const RTop = styled.div`
  @media (max-width: 640px) {
    margin-top: 10px;
  }
`;
export const RBottom = styled.div`
  @media (max-width: 640px) {
    display: none;
  }
`;
export const Footer = styled.div``;
export const BtnWrapper = styled.div`
  width: 50%;

  @media (max-width: 640px) {
    width: 80%;
  }
`;

export const Stepper = styled.div<{ status: number }>`
  height: 85%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
    @media (max-width: 640px) {
      height: 100%;
  }

  &:after {
    content: "";
    height: 100%;
    width: 10px;
    background: #d9d9d9;
    position: absolute;
    /* top: 2px; */
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 640px) {
      width: 5px;
    }
  }
  &:before {
    content: "";
    height: ${({ status }) =>
      status == 1
        ? "0px"
        : status == 2
        ? "210px"
        : status == 3
        ? "180px"
        : status == 4
        ? "290px"
        : "380px"};
    width: 10px;
    background: #7da9ff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    top: 20px;

    @media (max-width: 640px) {
      top: 0px;
      width: 5px;

      height: ${({ status }) =>
        status == 1
          ? "0px"
          : status == 2
          ? "107px"
          : status == 3
          ? "90px"
          : status == 4
          ? "130px"
          : "170px"};
    }

`;
export const Step = styled.div<{ leftMsg?: string; rightMsg?: string }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #d9d9d9;
  position: relative;
  z-index: 3;

  @media (max-width: 640px) {
    height: 13px;
    width: 13px;
  }

  &.active {
    background: #7da9ff;
  }

  &:nth-child(1) {
    top: -2px;
  }
  &:nth-child(5) {
    top: 2px;
  }

  &:before {
    content: "${({ leftMsg }) => leftMsg}";
    position: absolute;
    left: -240px;
    width: 230px;
    text-align: end;
    font-weight: 500;

    @media (max-width: 640px) {
      width: 75px;
      font-size: 8px;
      line-height: 11px;
      left: -80px;
      /* top: -5px; */
    }
  }
  &:after {
    content: "${({ rightMsg }) => rightMsg}";
    position: absolute;
    top: 0px;
    left: 30px;
    width: 230px;
    text-align: start;
    font-weight: 500;
    @media (max-width: 640px) {
      width: 75px;
      line-height: 11px;
      font-size: 8px;
      /* top: -5px; */
      left: 20px;
    }
  }
`;
export const MobileFooter = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: block;

    .inner {
      display: flex;
      justify-content: space-between;
    }
  }
`;
