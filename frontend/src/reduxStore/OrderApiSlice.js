import { apiSlice } from "./ApiSlice";
import { BASE_URL } from '../Constants';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (data) => ({
                url: `/api/orderRouter/placeOrder`, // Use relative URL
                method: 'POST',
                body: data,
            }),
        }),
        
        myOrders: builder.mutation({
            query: () => ({
                url: `/api/orderRouter/myOrders`, // Use relative URL
                method: 'POST',
            }),
        }),
    }),
});

export const { usePlaceOrderMutation, useMyOrdersMutation } = orderApiSlice;

