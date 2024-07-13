import { apiSlice } from "./ApiSlice";
import { BASE_URL } from '../Constants';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/orderRouter/placeOrder`,
                method: 'POST',
                body: data,
                credentials: 'include', // Add this line
            })
        }),
        
        myOrders: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/api/orderRouter/myOrders`,
                method: 'POST',
                credentials: 'include', // Add this line
            })
        })
    })
});

export const { usePlaceOrderMutation, useMyOrdersMutation } = orderApiSlice;
