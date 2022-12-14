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
`;
export const LTop = styled.div``;
export const LBottom = styled.div``;
export const RTop = styled.div``;
export const RBottom = styled.div``;
export const Footer = styled.div``;
export const BtnWrapper = styled.div`
  width: 50%;
`;

export const Stepper = styled.div<{ status: number }>`
  height: 85%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:after {
    content: "";
    height: 100%;
    width: 10px;
    background: #d9d9d9;
    position: absolute;
    /* top: 2px; */
    left: 50%;
    transform: translateX(-50%);
  }
  &:before {
    content: "";
    height: ${({ status }) =>
      status == 1
        ? "0px"
        : status == 2
        ? "90px"
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
  }
`;
export const Step = styled.div<{ leftMsg?: string; rightMsg?: string }>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #d9d9d9;
  position: relative;
  z-index: 3;

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
    top: 0px;
    left: -240px;
    width: 230px;
    text-align: end;
    font-weight: 500;
  }
  &:after {
    content: "${({ rightMsg }) => rightMsg}";
    position: absolute;
    top: 0px;
    left: 30px;
    width: 230px;
    text-align: start;
    font-weight: 500;
  }
`;
