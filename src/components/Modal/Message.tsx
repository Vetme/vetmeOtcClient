import styled from "styled-components";
import { Spacer, Text } from "..";
import { CSSTransition } from "react-transition-group";
import { Button } from "../Button";

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 99999;
  background: rgba(217, 217, 217, 0.44);
`;
const Inner = styled.div`
  width: 662px;
  max-width: 95%;
  background: #141414;
  border-radius: 40px;
  /* margin: auto; */
  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 30px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  margin: auto;
  justify-content: center;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

interface IMessage {
  handleClose: () => void;
  show: boolean;
  headerText?: string;
  msg: string;
}

const Connect = ({ msg, show, headerText, handleClose }: IMessage) => {
  return (
    <>
      <CSSTransition in={show} timeout={400} classNames={"alert"} unmountOnExit>
        <Container onClick={handleClose}>
          <Inner onClick={(e) => e.stopPropagation()}>
            <Text as="h3" sizeM="20px" color="#fff">
              {headerText || "Message"}
            </Text>
            <Spacer height={35} />
            <Text as="p" color="#fff">
              {msg}
            </Text>
            <Spacer height={50} />
            <ButtonWrap>
              <Button className="primary  m-sm" onClick={() => handleClose()}>
                Ok
              </Button>
            </ButtonWrap>
          </Inner>
        </Container>
      </CSSTransition>
    </>
  );
};

export default Connect;
