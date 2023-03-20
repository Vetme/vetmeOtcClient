import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Flex, Spacer, Text, TokenBadge } from "..";
import { Button } from "../Button";
import { CSSTransition } from "react-transition-group";
import { ConnectorNames } from "@/types";
import apiHelper from "@/helpers/apiHelper";
import ReactApexChart from "react-apexcharts";

import { ApexOptions } from "apexcharts";

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 99999;
  background: rgba(242, 255, 245, 0.7);

  > div {
    height: 100%;
  }
`;
const Inner = styled.div`
  max-width: 95%;
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
  width: 70%;
  margin: auto;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const MainChart = styled.div`
  flex: 1;
  background: #170728;
  height: 100%;
  width: 65%;
  color: #fff;
  border: 1px solid #170728;
  border-radius: 12px;
  max-height: 810px;
  height: 451px;

  #apexchart {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  /* display:flex; */
  /* align-items:center; */

  /* height: 310px; */
`;

const DetailsCard = styled.div`
  width: 35%;
  height: 451px;
  /* height: 341px; */
  max-width: 100%;
  padding: 24px;
  background-image: url(/images/bg/token-i.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  position: relative;
  border-radius: 10px;
  border-right: 2px solid #8a8293;
  border-left: 2px solid #8a8293;

  .header {
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translateX(-50%);
  }
`;

interface IChart {
  handleClose: () => void;
  show: boolean;
  token: any;
}

const Chart = ({ handleClose, show, token }: IChart) => {
  const [series, setSeries] = useState([
    {
      data: [],
    },
  ]);

  const chartOption = useMemo(() => {
    return {
      chart: {
        type: "candlestick",
        foreColor: "#ccc",
        height: 350,
        color: "#fff",
        background: "#170728",

        // background: '#00E396'
      },
      tooltip: {
        theme: "dark",
      },
      title: {
        text: "",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    };
  }, []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [token?.address]);

  const getData = async () => {
    setLoading(true);
    // const tData = await apiHelper.getTokenDetails(
    //   "0xe7ef051c6ea1026a70967e8f04da143c67fa4e1f"
    // );

    const { data } = await apiHelper.getCandlestickData("vetme", "7");
    const formateData = data.map((data: any) => {
      return {
        x: new Date(data[0]),
        y: [data[1], data[2], data[3], data[4]],
      };
    });
    setSeries(() => {
      return [
        {
          data: formateData,
        },
      ];
    });

    console.log(formateData);
    setLoading(false);
  };

  return (
    <>
      <CSSTransition in={show} timeout={400} classNames={"alert"} unmountOnExit>
        <Container onClick={handleClose}>
          <div className="container-sm">
            {" "}
            <Inner onClick={(e) => e.stopPropagation()}>
              <Flex gap={32} wrap>
                <MainChart>
                  <div id="apexchart">
                    {loading ? (
                      <>Loading..</>
                    ) : (
                      <ReactApexChart
                        options={chartOption}
                        series={series}
                        type="candlestick"
                        height={350}
                      />
                    )}
                  </div>
                </MainChart>

                <DetailsCard>
                  <Text
                    className="header"
                    uppercase
                    weight="400"
                    size="s3"
                    color="#453953"
                  >
                    Token info
                  </Text>
                  <Spacer height={10} />
                  <Flex justify="center">
                    <TokenBadge token={token} handleClick={() => null} />
                  </Flex>
                  <Spacer />
                  <Flex justify="center">
                    <Text size="s1" color="#170728">
                      {" "}
                      $9.000
                    </Text>
                  </Flex>
                  <Spacer height={20} />

                  <Flex justify="space-between">
                    <Flex align="center">
                      {" "}
                      <Text as="div" size="s3" uppercase>
                        liquidity:{" "}
                      </Text>{" "}
                      <Text as="span" size="s1">
                        $116.77k
                      </Text>
                    </Flex>
                    <Flex align="center">
                      {" "}
                      <Text as="div" size="s3" uppercase>
                        TMcap:
                      </Text>{" "}
                      <Text as="span" size="s1">
                        $116.77k
                      </Text>
                    </Flex>
                  </Flex>

                  <Spacer height={20} />

                  <Flex justify="space-between">
                    <BuildList heading="24h Volume" value="$34.90K" />
                    <BuildList heading="total tx" value="$34.90K" />
                  </Flex>
                  <Spacer height={20} />

                  <Flex justify="space-between">
                    <BuildList heading="pooled BTC" value="$34.90K" />
                    <BuildList heading="holders" value="$34.90K" />
                  </Flex>
                  <Spacer height={20} />

                  <Flex justify="space-between">
                    <BuildList heading="pooled vet" value="$34.90K" />
                    <BuildList heading="total supply" value="$34.90K" />
                  </Flex>
                  <Spacer height={20} />

                  <Flex justify="space-between">
                    <BuildList heading="pool created" value="$34.90K" />
                    <BuildList heading="1 btc" value="$34.90K" />
                  </Flex>
                </DetailsCard>
              </Flex>
            </Inner>
          </div>
        </Container>
      </CSSTransition>
    </>
  );
};

const BuildList = ({ heading, value }: { heading: string; value: string }) => (
  <Flex direction="column">
    <Text size="s3" color="#170728" weight="400" uppercase>
      {heading}
    </Text>
    <Text size="s1" color="#170728">
      {value}
    </Text>
  </Flex>
);
export default Chart;
