import { Flex } from "@/components";
import styled from "styled-components";

export const TradeWrapper = styled.div`
  background: #ececec;
  box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.12);
  border-radius: 20px;

  padding: 30px 126px;
  /* height: 440px; */
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    padding: 15px 15px;
    /* height: 404px; */
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
export const TradeItem = styled.div`
  text-align: center;

  @media (max-width: 640px) {
    text-align: inherit;
  }
`;

export const RightContent = styled(Flex)`
  flex: 1;
  text-align: end;
  height: 90%;
`;
export const LTop = styled.div``;
export const SwitchTab = styled(Flex)`
  width: 249px;
  height: 73px;

  background: #d9d9d9;
  border-radius: 20px;
  /* flex: none; */
  order: 0;
  flex-grow: 0;
  position: relative;
  transition: 0.3s;

  &:after {
    content: "";
    position: absolute;
    top: 6px;
    height: 80%;
    width: 50%;
    background: #7da9ff;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 10px;
    z-index: 1;
    display: flex;
    transition: 0.3s;
    font-weight: 500;
  }

  &.visible {
    transition: 0.3s;
    font-weight: 700;
    &:after {
      left: calc(50% - 10px);
    }
  }
  &.invisible {
    font-weight: 700;
    &:after {
      left: 10px !important;
    }
  }
`;
export const Tab = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: relative;
`;
export const RTop = styled.div``;
export const Footer = styled.div``;
export const BtnWrapper = styled.div`
  width: 50%;

  @media (max-width: 640px) {
    width: 80%;
  }
`;

export const Stepper = styled.div<{ status: number }>`
  width: 40%;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: auto;

  @media (max-width: 640px) {
    width: 80%;
  }

  &:after {
    content: "";
    width: 100%;
    height: 10px;
    background: #d9d9d9;
    position: absolute;
    /* top: 2px; */
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 640px) {
      height: 5px;
    }
  }
  &:before {
    content: "";
    width: ${({ status }) =>
      status == 1 ? "0px" : status == 2 ? "120px" : "220px"};
    height: 10px;
    background: #7da9ff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    left: 20px;

    @media (max-width: 640px) {
      height: 5px;
      left: 0px;
    }
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
    left: -2px;
  }
  &:nth-child(5) {
    left: 2px;
  }

  &:before {
    /* content: "${({ leftMsg }) => leftMsg}"; */
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
    top: 35px;
    white-space: nowrap;
    left: 50%;
    text-align: start;
    font-weight: 500;
    transform: translateX(-50%);

    @media (max-width: 640px) {
      top: 15px;
      font-size: 12px;
    }
  }
`;
