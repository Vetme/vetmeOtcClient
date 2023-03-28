import {
  ActionBtn,
  Center,
  Flex,
  Input,
  InputBox,
  InputInner,
  Spacer,
  Text,
  ErrorMsg,
} from "@/components";
import { ArrowRight } from "@/components/Icons";
import {
  ProfileInner,
  MyListingWrapper,
  ProfileBody,
  ActionU,
  AvatarCon,
} from "./styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { parseError, parseSuccess } from "@/utils";
import { useEffect, useState } from "react";
import Api, { BASE_URL } from "@/helpers/apiHelper";

const updateSchema = Yup.object().shape({
  first_name: Yup.string().min(2, "Too Short!").required("First name Required"),
  last_name: Yup.string().min(2, "Too Short!").required("Last name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
});

interface IUser {
  account?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  twitter?: string;
  telegram?: string;
}

function MyListings() {
  const { account } = useWeb3React<Web3Provider>();
  const [user, setUser] = useState<IUser>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    telegram: "",
    twitter: "",
  });
  const formik = useFormik({
    initialValues: user,
    enableReinitialize: true,
    onSubmit: async ({
      first_name,
      last_name,
      email,
      phone,
      telegram,
      twitter,
    }) => {
      try {
        const response = await axios.patch(`${BASE_URL}/users/${account}`, {
          first_name,
          last_name,
          email,
          phone,
          telegram,
          twitter,
        });
        parseSuccess("Account Updated");
      } catch (err) {
        parseError("Opps, something went wrong");
      }
    },
    validationSchema: updateSchema,
  });

  useEffect(() => {
    getAccount();
  }, [account]);

  const getAccount = async () => {
    const { data: user } = await Api.getAccount(account);
    setUser(user.account);
  };

  return (
    <MyListingWrapper>
      <ProfileInner>
        <ProfileBody>
          <UserAvatar user={user} />
          <Spacer height={32} />
          <form onSubmit={formik.handleSubmit}>
            <Flex gap={32} wrap>
              <InputBox className="standard">
                <label htmlFor="">First Name</label>
                <InputInner>
                  <Input
                    onChange={formik.handleChange}
                    name="first_name"
                    value={formik.values.first_name}
                    type="text"
                    placeholder="First Name"
                  />
                </InputInner>
                {formik.touched.first_name && formik.errors.first_name && (
                  <ErrorMsg>{formik.errors.first_name}</ErrorMsg>
                )}
              </InputBox>

              <InputBox className="standard">
                <label htmlFor="">Last Name</label>
                <InputInner>
                  <Input
                    onChange={formik.handleChange}
                    name="last_name"
                    value={formik.values.last_name}
                    type="text"
                    placeholder="Last Name"
                  />
                </InputInner>
                {formik.touched.last_name && formik.errors.last_name && (
                  <ErrorMsg>{formik.errors.last_name}</ErrorMsg>
                )}
              </InputBox>
            </Flex>

            <Spacer height={20} />

            <Flex gap={32} wrap>
              <InputBox className="standard">
                <label htmlFor="">Email</label>
                <InputInner>
                  <Input
                    onChange={formik.handleChange}
                    name="email"
                    value={formik.values.email}
                    type="email"
                    placeholder="Email Address"
                  />
                </InputInner>
                {formik.touched.last_name && formik.errors.email && (
                  <ErrorMsg>{formik.errors.email}</ErrorMsg>
                )}
              </InputBox>

              <InputBox className="standard">
                <label htmlFor="">Phone Number</label>
                <InputInner>
                  <Input
                    onChange={formik.handleChange}
                    name="phone"
                    value={formik.values.phone}
                    type="text"
                    placeholder="Phone Number"
                  />
                </InputInner>
              </InputBox>
            </Flex>

            <Spacer height={20} />

            <Flex gap={32} wrap>
              <InputBox className="standard">
                <label htmlFor="">Telegram</label>
                <InputInner>
                  <Input
                    onChange={formik.handleChange}
                    name="telegram"
                    value={formik.values.telegram}
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
                    onChange={formik.handleChange}
                    name="twitter"
                    value={formik.values.twitter}
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
          </form>
        </ProfileBody>
      </ProfileInner>
    </MyListingWrapper>
  );
}

const UserAvatar = ({ user }: { user: IUser }) => (
  <Flex align="flex-end" gap={16}>
    <AvatarCon>
      <div>
        <img src="/images/avatar.png" alt="User Avatar" />
      </div>
    </AvatarCon>
    <div style={{ marginBottom: 10 }}>
      <Text size="s1" uppercase color="#170728">
        {`${user.first_name || ""} ${user.last_name || "Anonymous"}`}
      </Text>
      <Text size="tiny" color="#453953">
        Crypto enthusiast
      </Text>
    </div>
  </Flex>
);
export default MyListings;
