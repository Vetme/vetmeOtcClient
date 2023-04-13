import { Spacer, Text } from "@/components";
import { Button } from "@/components/Button";
import { claimGeorli, claimToken, convertWeth } from "@/helpers/contract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import styled from "styled-components";
import CustomButton from "@/components/Button/CustomButton";
import { useState } from "react";
import { parseError, parseSuccess } from "@/utils";

const SwapContainer = styled.div`
  /* border: 1px solid rgba(0, 0, 0, 0.05); */
  /* box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.03); */
  /* border-radius: 20px; */
  width: 508px;
  max-width: 100%;
  margin-bottom: 114px;
  margin: auto;

  background-image: url(/images/bg/token-i.png);
  background-repeat: no-repeat;
  /* background-position: top center; */
  background-size: 100% 100%;

  position: relative;

  .header {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Body = styled.div`
  padding: 50px 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 640px) {
    padding: 20px 25px;
  }
`;
const Claim = () => {
  const { library, chainId } = useWeb3React<Web3Provider>();
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>("");

  const handleClaim = async (token: any) => {
    try {
      setLoading(true);
      setCurrent(token.name);
      await claimToken(library, token.address);
      parseSuccess(`${token.name} Claimed`);
    } catch (error) {
      console.log(error, "error");
      parseError("Opps, Something went wrong");
    } finally {
      setLoading(false);
      setCurrent("");
    }
  };

  const handleClaimG = async (token: any) => {
    try {
      setLoading(true);
      setCurrent(token.name);
      await claimGeorli(library, token.address);
      parseSuccess(`${token.name} Claimed`);
    } catch (error) {
      console.log(error, "error");
      parseError("Opps, Something went wrong");
    } finally {
      setLoading(false);
      setCurrent("");
    }
  };

  const handleConvertWeth = async () => {
    try {
      setCurrent("Convert");
      setLoading(true);
      await convertWeth(library, chainId);
      parseSuccess(`Token Converted`);
    } catch (error) {
      parseError("Opps, Something went wrong");
    } finally {
      setLoading(false);
      setCurrent("");
    }
  };

  return (
    <div className="container">
      <SwapContainer>
        <Text
          className="header"
          uppercase
          weight="400"
          size="s3"
          color="#453953"
        >
          Test Tokens
        </Text>
        <Body>
          <CustomButton
            onClick={() =>
              handleClaim({
                address: "0x9a2992BA2d4dF6ea92Bae65951a68da48fbb70fB",
                name: "Cool Tokens",
              })
            }
            text="Get 100 Cool Tokens"
            classNames="primary "
            loading={loading && current === "Cool Tokens"}
            disabled={loading && current === "Cool Tokens"}
          />
          <Spacer height={32} />
          <CustomButton
            onClick={() =>
              handleClaim({
                address: "0x63bEf5e5bd830F61aD5C19fD8Db80462D44ea323",
                name: "Vetme Token",
              })
            }
            text="Get 100 VETME Tokens"
            classNames="primary "
            loading={loading && current === "Vetme Token"}
            disabled={loading && current === "Vetme Token"}
          />
          <Spacer height={32} />
          <CustomButton
            onClick={() =>
              handleClaim({
                address: "0x1004e8AE4387B587eCb06dcf4398c2A395c4b2F2",
                name: "Hot Token",
              })
            }
            text="Get 100 Hot Tokens"
            classNames="primary "
            loading={loading && current === "Hot Token"}
            disabled={loading && current === "Hot Token"}
          />
          <Spacer height={32} />

          {/* <CustomButton
            onClick={handleConvertWeth}
            text="Give me WETH 0.04 for ETH"
            classNames="primary "
            loading={loading && current === "Convert"}
            disabled={loading && current === "Convert"}
          /> */}

          <CustomButton
            onClick={() =>
              handleClaimG({
                address: "0x0A9D0E29d32Ad555118aa724608BEf103ECcbbeF",
                name: "Goerli",
              })
            }
            text="Claim 1 Goerli ETH"
            classNames="primary "
            loading={loading && current === "Goerli"}
            disabled={loading && current === "Goerli"}
          />
          <Spacer height={32} />
        </Body>
      </SwapContainer>
    </div>
  );
};

export default Claim;
``;
