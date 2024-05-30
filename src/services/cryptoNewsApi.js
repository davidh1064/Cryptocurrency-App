import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
  "X-RapidAPI-Key": "3a7379dab6msh2377a432c1c9545p1f7e1djsn509e0b534fbc",
  "X-RapidAPI-Host": "real-time-news-data.p.rapidapi.com",
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
