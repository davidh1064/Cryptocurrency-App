import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select, Statistic } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const {
    data: cryptoDetails,
    isFetching,
    error: detailsError,
  } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, error: historyError } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  if (isFetching) return <Title level={3}>Loading...</Title>;
  if (detailsError)
    return <Title level={3}>Error: {detailsError.message}</Title>;
  if (!cryptoDetails?.data?.coin)
    return <Title level={3}>No data available</Title>;

  const cryptoData = cryptoDetails.data.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoData?.price ? millify(cryptoData.price) : "N/A"}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: cryptoData?.rank || "N/A",
      icon: <NumberOutlined />,
    },
    {
      title: "24h Volume",
      value: `$ ${cryptoData?.volume ? millify(cryptoData.volume) : "N/A"}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoData?.marketCap ? millify(cryptoData.marketCap) : "N/A"
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoData?.allTimeHigh?.price
          ? millify(cryptoData.allTimeHigh.price)
          : "N/A"
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoData?.numberOfMarkets || "N/A",
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoData?.numberOfExchanges || "N/A",
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: cryptoData?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoData?.supply?.total ? millify(cryptoData.supply.total) : "N/A"
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoData?.supply?.circulating
          ? millify(cryptoData.supply.circulating)
          : "N/A"
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoData?.name} ({cryptoData?.symbol}) Price
        </Title>
        <p>
          {cryptoData?.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      {!historyError && coinHistory && (
        <LineChart
          coinHistory={coinHistory}
          currentPrice={cryptoData?.price ? millify(cryptoData.price) : "N/A"}
          coinName={cryptoData?.name || "Unknown"}
        />
      )}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoData?.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoData?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoData?.name}?
          </Title>
          {cryptoData?.description && (
            <div style={{ marginTop: "20px" }}>
              {HTMLReactParser(cryptoData.description)}
            </div>
          )}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoData?.name} Links
          </Title>
          {cryptoData?.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
