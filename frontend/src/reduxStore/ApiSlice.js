// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../Constants';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // Include credentials for all requests
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    }
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({}),
});
