import styled from "styled-components";
import { Spacer, Text } from "..";
import { CSSTransition } from "react-transition-group";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { LoadingIll } from "../Icons";
import { text } from "stream/consumers";
import { ListCard } from "../Card";

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
  left: 50%;
  top: 50%;
  width: fit-content;
  position: relative;
  transform: translate(-50%, -50%);
  /* padding: 50px 16px; */
`;

interface IMessage {
  handleClose: () => void;
  show: boolean;
}

const ListModal = ({ show, handleClose }: IMessage) => {
  const navigate = useNavigate();

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
            <ListCard />
          </Inner>
        </Container>
      </CSSTransition>
    </>
  );
};

export default ListModal;
