import { apiSlice } from "./ApiSlice";
import { BASE_URL } from '../Constants';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/orderRouter/placeOrder`,
                method: 'POST',
                body: data,
            })
        }),

        
        myOrders: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/api/orderRouter/myOrders`,
<<<<<<< HEAD
=======
                method: 'POST',
>>>>>>> 9bf84dd84251ee7ff87763bbb6fedb0295fcdfb1
            })
        })
    })
});

export const { usePlaceOrderMutation, useMyOrdersMutation } = orderApiSlice;