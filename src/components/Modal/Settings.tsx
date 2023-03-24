import styled from "styled-components";
import { ListContext, ListContextType } from "@/context/Listcontext";
import {
  ActionBtn,
  Center,
  CustomLink,
  Flex,
  Spacer,
  Text,
  Input,
  InputBox,
  InputCon,
  InputInner,
} from "..";
import { CSSTransition } from "react-transition-group";
import React, { useContext, useState } from "react";
import Toggle from "../Toggle";
import { ArrowRight } from "../Icons";

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
  width: 590px;
  max-width: 95%;
  /* margin: auto; */
  background-image: url(/images/bg/settings.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;

  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, -50%);
  padding: 42px 24px 24px;

  .header {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0px;
  }
`;

export const Wrapper = styled.div``;
export const IWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div:first-child {
    width: 383px;
    /* max-width: 70%; */
  }
`;
export const SWrapper = styled.div`
  margin: 20px 0px;
`;
interface IMessage {
  handleClose: () => void;
  show: boolean;
}

const Settings = ({ show, handleClose }: IMessage) => {
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);

  const { setForm, form } = useContext(ListContext) as ListContextType;

  const handleSetting = (e: any) => {
    let value = e.target.value;
    const name = e.target.name;

    setForm((prevState: any) => {
      return {
        ...prevState,
        [name]: !prevState[name],
      };
    });
  };

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
            <Text
              className="header"
              uppercase
              weight="400"
              size="s3"
              color="#453953"
            >
              Trade Settings
            </Text>

            <Wrapper>
              <Flex justify="space-between">
                <Text size="h4" weight="450" color=" #170728">
                  Sell coin in fractions
                </Text>

                <Toggle
                  checked={form.is_friction}
                  onChange={handleSetting}
                  name="is_friction"
                  offstyle="btn-off"
                  onstyle="btn-on"
                />
              </Flex>
              <Spacer height={16} />

              <SWrapper>
                <Text size="h4" weight="450" color=" #170728">
                  Are you vetted with our KYC Platform?
                </Text>
                <Spacer height={16} />
                <IWrapper>
                  <InputCon style={{ flex: 1 }}>
                    <InputBox>
                      <label htmlFor="">Input KYC Gen Code</label>
                      <InputInner>
                        <Input
                          onChange={() => null}
                          name="amount_in"
                          value={0}
                          type="number"
                          step={0.1}
                          placeholder="0.0"
                        />
                      </InputInner>
                    </InputBox>{" "}
                  </InputCon>

                  <div>
                    <Toggle
                      checked={false}
                      onChange={handleSetting}
                      offstyle="btn-off"
                      onstyle="btn-on"
                    />
                  </div>
                </IWrapper>
              </SWrapper>
              <Flex justify="space-between">
                <Text size="h4" weight="450" color=" #170728">
                  Has this coin been launched privately?
                </Text>

                <Toggle
                  checked={false}
                  onChange={handleSetting}
                  offstyle="btn-off"
                  onstyle="btn-on"
                />
              </Flex>
              <Spacer height={16} />
              <Flex justify="space-between">
                <Text size="h4" weight="450" color=" #170728">
                  Has this coin been launched publicly?
                </Text>

                <Toggle
                  checked={false}
                  name=""
                  onChange={handleSetting}
                  offstyle="btn-off"
                  onstyle="btn-on"
                />
              </Flex>
              <Spacer height={32} />
              <Center>
                <ActionBtn onClick={() => handleClose()}>
                  Continue{" "}
                  <div>
                    <ArrowRight />
                  </div>
                </ActionBtn>
              </Center>
            </Wrapper>
          </Inner>
        </Container>
      </CSSTransition>
    </>
  );
};

export default Settings;
