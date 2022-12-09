import React from "react";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Flex, Text, Avatar, Wrapper, Spacer, Divider } from "../..";
import { Button } from "../../Button";
import {
  EditIcon,
  CollectionIcon,
  SignOutIcon,
  StoreFrontIcon,
  ThemeSwitchIcon,
} from ".";
import { Toggle } from "../../Input";

const CAvatar = styled(Avatar)`
  flex-shrink: 0;
  line-height: initial;

  &.eth {
    border-radius: 4px;

    img {
      border-radius: 4px;
    }
  }
`;

const Container = styled.div`
  background: ${({ theme }) => (theme.name === "Dark" ? "#121221" : "#fff")};
  width: 500px;
  padding: 32px;
  position: absolute;
  right: 0;
  top: 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  box-shadow: 0px 10px 60px rgba(2, 0, 44, 0.05);
`;
const Inner = styled.div``;
const Header = styled.div`
  margin-bottom: 20px;
`;
const DropList = styled.div``;

const Item = styled(Link)`
  padding: 16px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

const Profile = ({ handleTheme }: { handleTheme: () => void }) => {
  const { colors, name } = useTheme();
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <Header>
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <CAvatar size="md">
              <img
                src={require("./../../../images/avatars/img1.png")}
                alt="alter"
              />
            </CAvatar>
            <Spacer width={24}></Spacer>
            <Wrapper>
              <Text size="24px" weight="600" as="h4" color={colors.text2}>
                Alien Olamide
              </Text>
              <Text size="14px" color={colors.text3}>
                0xdfkudjhjf...adfsfghfhdfh
              </Text>
            </Wrapper>
          </Flex>

          <Button className="primary sm">View Profile</Button>
        </Flex>
      </Header>

      <Spacer height={32}></Spacer>
      <Divider />
      <Spacer height={48}></Spacer>

      <Inner>
        <Flex justify="space-between">
          <Text size="18px" weight="700" color={colors.text2}>
            Wallet
          </Text>
          <Text size="16px" className="fancy pointer" weight="700">
            Manege Wallet
          </Text>
        </Flex>

        <Spacer height={24} />

        <Flex align="center">
          <CAvatar size="md" className="eth">
            <img src={require("./../../../images/img9.png")} alt="alter" />
          </CAvatar>
          <Spacer width={16}></Spacer>
          <Wrapper>
            <Text size="18px" weight="700" as="h4" color={colors.text2}>
              0.24 Eth
            </Text>
            <Text size="12px" color={colors.text3}>
              0xdfkudjhjf...adfsfghfhdfh
            </Text>
          </Wrapper>
        </Flex>

        <Spacer height={32}></Spacer>

        <Button className="dark block">Add Funds</Button>

        <Spacer height={32}></Spacer>
        <Divider />
        <Spacer height={32}></Spacer>

        <DropList>
          <Item to="/">
            <Flex align="center">
              <EditIcon color={colors.text2} />
              <Text size="16px" weight="700" color={colors.text2}>
                Edit Profile
              </Text>
            </Flex>
          </Item>
          <Item to="/">
            <Flex align="center">
              <CollectionIcon color={colors.text2} />
              <Text size="16px" weight="700" color={colors.text2}>
                My Collections
              </Text>
            </Flex>
          </Item>
          <Item to="/">
            <Flex align="center">
              <StoreFrontIcon color={colors.text2} />
              <Text size="16px" weight="700" color={colors.text2}>
                Store Front
              </Text>
            </Flex>
          </Item>
          <Item as="div">
            <Flex align="center">
              <ThemeSwitchIcon color={colors.text2} />
              <Text size="16px" weight="700" color={colors.text2}>
                {name === "Dark" ? "Dark Theme" : "Light Theme"}
              </Text>
            </Flex>

            <Toggle
              checked={name === "Dark" ? true : false}
              onChange={handleTheme}
              offstyle="btn-off"
              onstyle="btn-on"
            />
          </Item>{" "}
          <Item to="/">
            <Flex align="center">
              <SignOutIcon />
              <Text size="16px" weight="700" color="#EB5757">
                Sign out
              </Text>
            </Flex>
          </Item>
        </DropList>
      </Inner>
    </Container>
  );
};

export default Profile;
