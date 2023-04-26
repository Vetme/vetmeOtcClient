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
  max-width: 100%;
  /* margin: auto; */
  left: 50%;
  top: 50%;
  position: relative;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 30px;

  @media (max-width: 740px) {
    left: 50%;
    top: 10%;
    position: relative;
    transform: translate(-50%, 0%);
    padding: 10px;
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

  @media (max-width: 740px) {
    width: 100%;
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

  @media (max-width: 740px) {
    width: 100%;
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

  const chartOption: ApexOptions = useMemo(() => {
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
    const tData = await apiHelper.getTokenDetails(token.address);

    const { data } = await apiHelper.getCandlestickData(tData.data.id, "7");
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
                      --
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
                        --
                      </Text>
                    </Flex>
                    <Flex align="center">
                      {" "}
                      <Text as="div" size="s3" uppercase>
                        TMcap:
                      </Text>{" "}
                      <Text as="span" size="s1">
                        --
                      </Text>
                    </Flex>
                  </Flex>

                  <Spacer height={20} />

                  <Flex justify="space-between">
                    <BuildList heading="24h Volume" value="--" />
                    <BuildList heading="total tx" value="--" />
                  </Flex>
                  <Spacer height={20} />

                  <Flex justify="space-between">
                    <BuildList heading="pooled BTC" value="--" />
                    <BuildList heading="holders" value="--" />
                  </Flex>
                  <Spacer height={20} />

                  <Flex justify="space-between">
                    <BuildList heading="pooled vet" value="--" />
                    <BuildList heading="total supply" value="--" />
                  </Flex>
                  <Spacer height={20} />

                  <Flex justify="space-between">
                    <BuildList heading="pool created" value="--" />
                    <BuildList heading="1 btc" value="--" />
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
