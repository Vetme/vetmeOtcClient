import {
  ActionBtn,
  Center,
  Flex,
  Input,
  InputBox,
  InputInner,
  Spacer,
  Text,
} from "@/components";
import { ArrowRight } from "@/components/Icons";
import {
  ProfileInner,
  MyListingWrapper,
  ProfileBody,
  ActionU,
  AvatarCon,
} from "./styles";

function MyListings() {
  return (
    <MyListingWrapper>
      <ProfileInner>
        <ProfileBody>
          <UserAvatar />
          <Spacer height={32} />
          <Flex gap={32} wrap>
            <InputBox className="standard">
              <label htmlFor="">First Name</label>
              <InputInner>
                <Input
                  onChange={() => null}
                  name="amount_in"
                  value={"Emeka"}
                  type="text"
                  placeholder="First Name"
                />
              </InputInner>
            </InputBox>

            <InputBox className="standard">
              <label htmlFor="">Last Name</label>
              <InputInner>
                <Input
                  onChange={() => null}
                  name="amount_in"
                  value={"Ike"}
                  type="text"
                  placeholder="Last Name"
                />
              </InputInner>
            </InputBox>
          </Flex>

          <Spacer height={16} />

          <Flex gap={32} wrap>
            <InputBox className="standard">
              <label htmlFor="">Email</label>
              <InputInner>
                <Input
                  onChange={() => null}
                  name="amount_in"
                  value={"jamesike@gmail.com"}
                  type="email"
                  placeholder="Email Address"
                />
              </InputInner>
            </InputBox>

            <InputBox className="standard">
              <label htmlFor="">Phone Number</label>
              <InputInner>
                <Input
                  onChange={() => null}
                  name="amount_in"
                  value={"03028784883"}
                  type="text"
                  placeholder="@username"
                />
              </InputInner>
            </InputBox>
          </Flex>

          <Spacer height={16} />

          <Flex gap={32} wrap>
            <InputBox className="standard">
              <label htmlFor="">telegram</label>
              <InputInner>
                <Input
                  onChange={() => null}
                  name="amount_in"
                  value={"@Jame"}
                  type="text"
                  step={0.1}
                  placeholder="@username"
                />
              </InputInner>
            </InputBox>

            <InputBox className="standard">
              <label htmlFor="">Twitter</label>
              <InputInner>
                <Input
                  onChange={() => null}
                  name="amount_in"
                  value={"www.twitter.com/jamesike"}
                  type="text"
                  placeholder="Twitter Url"
                />
              </InputInner>
            </InputBox>
          </Flex>

          <Spacer height={32} />
          <ActionU>
            <Center>
              <ActionBtn>
                Update Profile{" "}
                <div>
                  <ArrowRight />
                </div>
              </ActionBtn>
            </Center>
          </ActionU>
        </ProfileBody>
      </ProfileInner>
    </MyListingWrapper>
  );
}

const UserAvatar = () => (
  <Flex align="flex-end" gap={16}>
    <AvatarCon>
      <div>
        <img src="/images/avatar.png" alt="User Avatar" />
      </div>
    </AvatarCon>
    <div style={{ marginBottom: 10 }}>
      <Text size="s1" uppercase color="#170728">
        James Ike
      </Text>
      <Text size="tiny" color="#453953">
        Crypto enthusiast
      </Text>
    </div>
  </Flex>
);
export default MyListings;
