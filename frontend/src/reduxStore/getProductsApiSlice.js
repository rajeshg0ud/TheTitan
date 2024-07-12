import { apiSlice } from "./ApiSlice";
import { BASE_URL } from '../Constants';

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/api/productRouter/products`,
            }),
        }),

        getProductById: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/api/productRouter/product/${id}`,
            }),
        }),
    }),
});
 
export const { useGetProductsMutation, useGetProductByIdMutation } = productApiSlice;