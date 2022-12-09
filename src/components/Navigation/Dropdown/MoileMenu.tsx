import React, { useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { Flex, Text, Avatar, Wrapper, Spacer, Divider } from "../..";
import { generateText } from "../../../utils/generator";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FaceBook, Twitter, Discord, Instagram } from "../../SvgIcons/socials";

import {
  ExploreIcon,
  Angle,
  ActivityIcon,
  StatIcon,
  DocIcon,
  NotifyIcon,
  SignOutIcon,
} from ".";
import { Button } from "../../Button";

const Common = css`
  padding: 16px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  svg,
  ${Avatar} {
    margin-right: 8px;
  }

  ${Avatar} {
    height: auto;
  }
`;

const Container = styled.div`
  background: ${({ theme }) => (theme.name === "Dark" ? "#16152d" : "#FAF9FA")};
  height: calc(100vh - 100px);
  position: fixed;
  top: 100px;
  width: 100%;
  overflow-x: hidden;
  /* margin: 10px; */
`;

const Contain = styled.div`
  width: 200%;
  height: 100%;
  position: relative;
`;
const Inner = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 100%;
  transition: 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19);

  &.added {
    transform: translateX(-50%);
  }
`;
const Header = styled.div`
  padding: 16px;
  margin-bottom: 4px;
  background: ${({ theme }) => (theme.name === "Dark" ? "#121221" : "#fff")};

  ${Common}
`;

const MainMenu = styled.div`
  width: 100%;
  height: calc(100vh - 100px);

  .top {
    width: 100%;
    flex: 1;
  }
`;

const SubMenu = styled.div`
  width: 100%;
  height: 100%;
`;

const Item = styled(Link)`
  ${Common}
`;

const BackAngle = styled.div`
  svg {
    transform: rotate(180deg);
  }
`;
const Foot = styled.div`
  padding: 0px 20px 40px 20px;
  width: 100%;
  flex: 1;
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  .signout {
    margin: auto;
    margin-top: 10px;
  }
`;

const Social = styled.div`
  padding: 10px;
  background: #2a2866;
  margin-left: 10px;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }
`;

const ExploreSub = styled.div``;
const NotificationsSub = styled.div``;
const ProfileSub = styled.div``;

const NotifyWrapper = styled.div`
  padding: 20px;
`;

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

const Pt = styled.div`
  padding: 16px 20px 34px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

type subT = "explore" | "notifications" | "profile";

const MobileMenu = ({ account }: { account?: string|null }) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<subT>("explore");

  const setMenu = (sub: subT) => {
    setActive(sub);
    setOpen(true);
  };

  return (
    <Container>
      <Contain>
        <Inner className={open ? "added" : ""}>
          <MainMenu>
            <Flex direction="column" style={{ height: "100%" }}>
              <Wrapper className="top">
                <Item as="div" onClick={() => setMenu("explore")}>
                  <Flex align="center">
                    <ExploreIcon color={colors.text2} />
                    <Text size="16px" weight="700" color={colors.text2}>
                      Explore
                    </Text>
                  </Flex>

                  <Angle color={colors.text2} />
                </Item>
                {/* <Divider /> */}

                <Item to="/activity">
                  <Flex align="center">
                    <ActivityIcon color={colors.text2} />
                    <Text size="16px" weight="700" color={colors.text2}>
                      Activity
                    </Text>
                  </Flex>
                </Item>

                <Item to="/stats">
                  <Flex align="center">
                    <StatIcon color={colors.text2} />
                    <Text size="16px" weight="700" color={colors.text2}>
                      Stats
                    </Text>
                  </Flex>
                </Item>

                <Item to="/docs">
                  <Flex align="center">
                    <DocIcon color={colors.text2} />
                    <Text size="16px" weight="700" color={colors.text2}>
                      Docs
                    </Text>
                  </Flex>
                </Item>

                {account && (
                  <>
                    <Item as="div" onClick={() => setMenu("notifications")}>
                      <Flex align="center">
                        <NotifyIcon color={colors.text2} />
                        <Text size="16px" weight="700" color={colors.text2}>
                          Notifications
                        </Text>
                      </Flex>

                      <Angle color={colors.text2} />
                    </Item>

                    <Item as="div" onClick={() => setMenu("profile")}>
                      <Flex align="center">
                        <Avatar size="sm">
                          <img
                            src={require("./../../../images/avatars/img1.png")}
                            alt="alter"
                          />
                        </Avatar>
                        <Text size="16px" weight="700" color={colors.text2}>
                          Account
                        </Text>
                      </Flex>

                      <Angle color={colors.text2} />
                    </Item>
                  </>
                )}
              </Wrapper>
              <Spacer height={48} />
              <Foot>
                {account ? (
                  <Button className="block primary sm">Create</Button>
                ) : (
                  <Button className="block primary sm">Connect Wallet</Button>
                )}

                <Flex justify="center">
                  <Social>
                    <a href="#a">
                      <FaceBook />
                    </a>
                  </Social>

                  <Social>
                    <a href="#a">
                      <Twitter />
                    </a>
                  </Social>

                  <Social>
                    <a href="#a">
                      <Instagram />
                    </a>
                  </Social>

                  <Social>
                    <a href="#a">
                      <Discord />
                    </a>
                  </Social>
                </Flex>
              </Foot>
            </Flex>
          </MainMenu>

          <SubMenu>
            {/* Explore Submenu */}

            {active === "explore" && (
              <ExploreSub>
                <Header>
                  <Flex>
                    <ExploreIcon color={colors.text2} />
                    <Text size="16px" weight="700" color={colors.text2}>
                      Explore
                    </Text>
                  </Flex>
                  <BackAngle onClick={() => setOpen(false)}>
                    <Angle color={colors.text2} />
                  </BackAngle>
                </Header>

                <Wrapper>
                  <Item to="/nfts">
                    <Flex align="center">
                      <Text size="16px" weight="700" color={colors.text2}>
                        NFTs
                      </Text>
                    </Flex>
                  </Item>

                  <Item to="/nfts">
                    <Flex align="center">
                      <Text size="16px" weight="700" color={colors.text2}>
                        Store front
                      </Text>
                    </Flex>
                  </Item>

                  <Item to="/collections">
                    <Flex align="center">
                      <Text size="16px" weight="700" color={colors.text2}>
                        Collections
                      </Text>
                    </Flex>
                  </Item>

                  <Item to="/categories">
                    <Flex align="center">
                      <Text size="16px" weight="700" color={colors.text2}>
                        Categories
                      </Text>
                    </Flex>
                  </Item>
                </Wrapper>
              </ExploreSub>
            )}

            {/* Notifications  */}

            {active === "notifications" && (
              <NotificationsSub>
                <Header>
                  <Flex>
                    <NotifyIcon color={colors.text2} />
                    <Text size="16px" weight="700" color={colors.text2}>
                      Notifications
                    </Text>
                  </Flex>
                  <BackAngle onClick={() => setOpen(false)}>
                    <Angle color={colors.text2} />
                  </BackAngle>
                </Header>

                <NotifyWrapper>You don't have notifications</NotifyWrapper>
              </NotificationsSub>
            )}

            {/* Profile */}

            {active === "profile" && (
              <ProfileSub>
                <Header>
                  <Flex align="center">
                    <Avatar size="sm">
                      <img
                        src={require("./../../../images/avatars/img1.png")}
                        alt="alter"
                      />
                    </Avatar>
                    <Text size="16px" weight="700" color={colors.text2}>
                      Account
                    </Text>
                  </Flex>
                  <BackAngle onClick={() => setOpen(false)}>
                    <Angle color={colors.text2} />
                  </BackAngle>
                </Header>

                <Wrapper>
                  <Pt>
                    <Flex justify="space-between">
                      <Text size="16px" weight="700" color={colors.text2}>
                        Wallet
                      </Text>
                      <Text size="16px" className="fancy pointer" weight="700">
                        Manege Wallet
                      </Text>
                    </Flex>

                    <Spacer height={24} />

                    <Flex align="center">
                      <CAvatar size="md" className="eth">
                        <img
                          src={require("./../../../images/img9.png")}
                          alt="alter"
                        />
                      </CAvatar>
                      <Spacer width={16}></Spacer>
                      <Wrapper>
                        <Text
                          size="16px"
                          weight="700"
                          as="h4"
                          color={colors.text2}
                        >
                          0.24 Eth
                        </Text>
                        <Text size="12px" color={colors.text3}>
                          0xdfkudjhjf...adfsfghfhdfh
                        </Text>
                      </Wrapper>
                    </Flex>
                  </Pt>

                  <Item to="/activity">
                    <Flex align="center">
                      <Text size="16px" weight="700" color={colors.text2}>
                        Edit Profile
                      </Text>
                    </Flex>
                  </Item>
                  <Item to="/activity">
                    <Flex align="center">
                      <Text size="16px" weight="700" color={colors.text2}>
                        My Collections
                      </Text>
                    </Flex>
                  </Item>
                  <Item to="/activity">
                    <Flex align="center">
                      <Text size="16px" weight="700" color={colors.text2}>
                        Storefront
                      </Text>
                    </Flex>
                  </Item>
                  <Item to="/activity">
                    <Flex align="center">
                      <Text size="16px" weight="700" color={colors.text2}>
                        Watchlist
                      </Text>
                    </Flex>
                  </Item>
                </Wrapper>
                <Spacer height={48} />
                <Foot>
                  <Button className="block primary sm">View Profile</Button>

                  <Flex className="signout" align="center">
                    <SignOutIcon />
                    <Text size="16px" weight="700" color="#EB5757">
                      Sign out
                    </Text>
                  </Flex>
                </Foot>
              </ProfileSub>
            )}
          </SubMenu>
        </Inner>
      </Contain>
    </Container>
  );
};

export default MobileMenu;
