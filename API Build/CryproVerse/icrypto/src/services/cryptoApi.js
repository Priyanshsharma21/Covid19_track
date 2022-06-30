import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '4de1fb24e2mshc6df605b6d6cd40p15efb4jsned3294fc7947',
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) =>({url,headers:cryptoApiHeaders}) // attach url with headers for making req


export const cryptoApi = createApi({
    reducerPath : 'cryptoApi',
    baseQuery : fetchBaseQuery({ baseUrl }),
    endpoints : (builder) =>({
            getCryptos : builder.query({
                query : (count) => createRequest(`/coins?limit=${count}`)
            }),

            getCryptoDetails: builder.query({
                query: (coinId) => createRequest(`/coin/${coinId}`),
              }),
     
              getCryptoHistory: builder.query({
                query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
              }),

              getExchanges: builder.query({
                query: (coinId) => createRequest(`/coin/${coinId}/exchanges`),
              }),
    })
})

export const {
    useGetCryptosQuery,useGetCryptoDetailsQuery, useGetCryptoHistoryQuery,useGetExchangesQuery
} = cryptoApi;