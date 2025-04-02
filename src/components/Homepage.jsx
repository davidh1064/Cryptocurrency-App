import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";

const { Title } = Typography;

const Homepage = () => {
  const { data: cryptoData, isFetching, error } = useGetCryptosQuery(10);
  const globalStats = cryptoData?.data?.stats;

  if (isFetching) return <Title level={3}>Loading...</Title>;
  if (error) return <Title level={3}>Error: {error.message}</Title>;
  if (!globalStats) return <Title level={3}>No data available</Title>;

  return (
    <div className="home-container">
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className="stats-card">
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats.total}
              valueStyle={{ color: "var(--primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className="stats-card">
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats.totalExchanges)}
              valueStyle={{ color: "var(--primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className="stats-card">
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats.totalMarketCap)}
              valueStyle={{ color: "var(--primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className="stats-card">
            <Statistic
              title="Total 24h Volume"
              value={millify(globalStats.total24hVolume)}
              valueStyle={{ color: "var(--primary)" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className="stats-card">
            <Statistic
              title="Total Markets"
              value={millify(globalStats.totalMarkets)}
              valueStyle={{ color: "var(--primary)" }}
            />
          </Card>
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies
        </Title>
        <Link to="/cryptocurrencies" className="show-more">
          <Title level={3}>
            Show More <ArrowRightOutlined />
          </Title>
        </Link>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Link to="/news" className="show-more">
          <Title level={3}>
            Show More <ArrowRightOutlined />
          </Title>
        </Link>
      </div>
      <News simplified />
    </div>
  );
};

export default Homepage;
