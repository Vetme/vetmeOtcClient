import styled from "styled-components";
import { ActionBtn, CustomLink, Flex, Spacer, Text } from "..";
import { CSSTransition } from "react-transition-group";
import { AncIcon } from "../Icons";

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 99999;
  background: rgba(242, 255, 245, 0.7);
`;
const Inner = styled.div`
  width: 588px;
  max-width: 95%;
  /* margin: auto; */
  background-image: url(/images/bg/counter.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  height: 325px;
  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, -50%);
  padding: 67px 16px 16px 16px;
`;

const Close = styled.div`
  position: absolute;
  width: 64px;
  height: 64px;
  right: 0px;
  top: 0px;
  background: #170728;
  border: 1px solid #453953;
  border-radius: 12px;
  display: grid;
  place-content: center;
  cursor: pointer;
`;

const Anc = styled.div`
  position: absolute;
  left: 90px;
  top: 0px;

  @media (max-width: 640px) {
    left: 48px;
  }
`;

interface ICounter {
  handleClose: () => void;
  handleCounter: () => void;
  handleAccept: () => void;
  show: boolean;
}

const Counter = ({
  show,
  handleClose,
  handleCounter,
  handleAccept,
}: ICounter) => {
  return (
    <>
      <CSSTransition
        in={show}
        timeout={400}
        classNames={"alert-up"}
        unmountOnExit
      >
        <Container onClick={handleClose}>
          <Inner onClick={(e) => e.stopPropagation()}>
            <Close onClick={handleClose}>
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.79355 9.4998L2.42959 3.13584L3.1367 2.42873L9.50066 8.79269L15.8644 2.42893L16.5715 3.13604L10.2078 9.4998L16.5717 15.8638L15.8646 16.5709L9.50066 10.2069L3.1365 16.5711L2.42939 15.864L8.79355 9.4998Z"
                  fill="white"
                />
              </svg>
            </Close>
            <Anc>
              <AncIcon />
            </Anc>
            <Text as="h3" size="h3" sizeM="h3" weight="375" color="#170728">
              Transaction Options
            </Text>
            <Spacer height={32} />
            <Text size="normal" weight="300" color="#5D5169">
              Would you prefer to counter-trade the offer with a different price
              or simply accept it?
            </Text>
            <Spacer height={31} />
            <Flex gap={16}>
              <ActionBtn className="sm secondary" onClick={handleCounter}>
                Counter
              </ActionBtn>
              <ActionBtn className="sm" onClick={handleAccept}>
                Accept
              </ActionBtn>
            </Flex>
          </Inner>
        </Container>
      </CSSTransition>
    </>
  );
};

export default Counter;
