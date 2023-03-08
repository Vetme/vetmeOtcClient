import { Flex } from "@/components";
import styled from "styled-components";

export const TradeWrapper = styled.div`
  /* background: #170728; */
  background-image: url(/images/bg/trade.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: inherit;
  border-radius: 10px;
  /* background-size: 100% 100%; */
  padding: 30px 126px;
  /* height: 700px; */
  display: flex;
  flex-direction: column;
  position: relative;

  .header {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
  }

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
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 640px) {
    height: 100%;
  }

  /*  */
`;
export const Step = styled.div<{ leftMsg?: string; rightMsg?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* background: url(/images/bg/point.png); */
  position: relative;
  z-index: 3;
  color: #fff;

  @media (max-width: 640px) {
    height: 40px;
    width: 40px;
  }

  &.active {
    /* background: url(/images/bg/active.png); */
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
    right: 50px;
    width: 230px;
    text-align: end;
    font-weight: 500;

    @media (max-width: 640px) {
      width: 75px;
      font-size: 12px;
      line-height: 11px;
      /* left: -80px; */
      /* top: -5px; */
    }
  }
  &:after {
    content: "${({ rightMsg }) => rightMsg}";
    position: absolute;
    top: 0px;
    left: 50px;
    width: 230px;
    text-align: start;
    font-weight: 500;
    @media (max-width: 640px) {
      width: 75px;
      line-height: 11px;
      font-size: 12px;
      /* top: -5px; */
      /* left: 20px; */
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

export const StepLineCon = styled.div`
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
