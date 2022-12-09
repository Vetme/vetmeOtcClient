import React from "react";
import styled, { useTheme } from "styled-components";
import { Flex, Text, Avatar, Wrapper, Spacer } from "../..";
import { generateText } from "../../../utils/generator";

const Container = styled.div`
  background: ${({ theme }) => (theme.name === "Dark" ? "#121221" : "#fff")};
  width: 500px;
  padding: 32px;
  padding-right: 20px;
  position: absolute;
  right: 0;
  top: 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  box-shadow: 0px 10px 60px rgba(2, 0, 44, 0.05);
`;
const Inner = styled.div`
  height: 427px;
  overflow-y: auto;
`;
const Header = styled.div`
  margin-bottom: 20px;
`;
const NotifyCon = styled(Flex)`
  padding: 24px;
  background: ${({ theme }) => theme.colors.bgCard1};
  border-radius: 4px;
  margin: 0px 8px 8px 0px;

  ${Avatar} {
    flex-shrink: 0;
  }
`;

const Details = styled.div`
  margin-left: 24px;
  width: 100%;
`;

export const Notification = () => {
  const { colors } = useTheme();

  return (
    <NotifyCon>
      <Avatar size="60px">
        <img src={require("./../../../images/avatars/img1.png")} alt="alter" />
      </Avatar>
      <Details>
        <Flex justify="space-between">
          <Text size="18px" weight="700">
            Name name
          </Text>
          <Text size="14px" color={colors.text3}>
            Just now
          </Text>
        </Flex>
        <Spacer height={14} />
        <Wrapper>{generateText("vote")}</Wrapper>
      </Details>
    </NotifyCon>
  );
};

const Notifications = () => {
  return (
    <Container>
      <Header>
        <Flex justify="space-between">
          <Text size="24px" weight="600" as="h4">
            Notifications
          </Text>
          <Text className="fancy" size="16px" weight="700">
            See all
          </Text>
        </Flex>
      </Header>
      <Inner className="fancy-scroll gray">
        {Array(8)
          .fill("")
          .map((_, i) => (
            <Notification key={i} />
          ))}
      </Inner>
    </Container>
  );
};

export default Notifications;
