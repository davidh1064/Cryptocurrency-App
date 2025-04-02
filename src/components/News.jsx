import React from "react";
import { Typography, Row, Col, Avatar, Card, Spin } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { CalendarOutlined, LinkOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 6 : 12,
  });

  if (isFetching) return <Spin size="large" className="loader" />;
  if (!cryptoNews?.data) return <Title level={3}>No news available</Title>;

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.data.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img
                  className="news-image"
                  src={
                    news.photo_url ||
                    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"
                  }
                  alt="news"
                />
              </div>
              <p className="news-description">
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="article-details">
                <div className="provider-container">
                  <div className="provider-info">
                    <Avatar src={news.source_favicon_url} alt="news" />
                    <Text className="provider-name">{news.source_url}</Text>
                  </div>
                  <div className="news-metadata">
                    <Text>
                      <CalendarOutlined />{" "}
                      {moment(news.published_datetime_utc).fromNow()}
                    </Text>
                    <Text>
                      <LinkOutlined /> Read More
                    </Text>
                  </div>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
