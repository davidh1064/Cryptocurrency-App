import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography, Spin } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title } = Typography;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching, error } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cryptosList?.data?.coins) {
      const filteredData = cryptosList.data.coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Spin size="large" className="loader" />;
  if (error) return <Title level={3}>Error: {error.message}</Title>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
            size="large"
            allowClear
          />
        </div>
      )}
      <Row gutter={[24, 24]} className="crypto-card-container">
        {cryptos?.map((currency) => {
          const coinId = currency.uuid;
          const priceChange = parseFloat(currency.change);

          return (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="crypto-card"
              key={coinId}
            >
              <Link to={`/crypto/${coinId}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={currency.iconUrl}
                      alt={currency.name}
                    />
                  }
                  hoverable
                >
                  <div className="crypto-stats">
                    <div className="crypto-price">
                      <p>Price:</p>
                      <p className="price-value">$ {millify(currency.price)}</p>
                    </div>
                    <div className="crypto-market-cap">
                      <p>Market Cap:</p>
                      <p>$ {millify(currency.marketCap)}</p>
                    </div>
                    <div className="crypto-change">
                      <p>Daily Change:</p>
                      <p
                        className={
                          priceChange >= 0
                            ? "price-change-positive"
                            : "price-change-negative"
                        }
                      >
                        {priceChange >= 0 ? (
                          <ArrowUpOutlined />
                        ) : (
                          <ArrowDownOutlined />
                        )}{" "}
                        {currency.change}%
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
