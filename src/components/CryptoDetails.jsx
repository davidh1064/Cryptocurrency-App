import React from "react";
import { useParams } from "react-router-dom";

const CryptoDetails = () => {
  const { coinId } = useParams();

  console.log(coinId);

  return <div>CryptoDetails {coinId}</div>;
};

export default CryptoDetails;
