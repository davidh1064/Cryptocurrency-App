import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_NEWS_HOST,
};

const baseUrl = "https://real-time-news-data.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/search?query=${newsCategory}&country=US&lang=en&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
