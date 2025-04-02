import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
      transformResponse: (response, meta) => {
        // API returns a different structure for single coin details
        if (response?.data?.coin) {
          return response;
        }
        // If we don't get a coin object, try to find it in the coins array
        const coin = response?.data?.coins?.find(
          (coin) => coin.uuid === meta.arg
        );
        if (coin) {
          return {
            status: response.status,
            data: {
              coin: coin,
            },
          };
        }
        return response;
      },
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
