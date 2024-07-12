import { apiSlice } from "./ApiSlice";
import { BASE_URL } from '../Constants';

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/api/productRouter/products`,
                method: 'POST', // Specify the HTTP method as GET
            }),
        }),

        getProductById: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/api/productRouter/product/${id}`,
                method: 'POST', // Specify the HTTP method as GET
            }),
        }),
    }),
});

// Destructure the generated hooks from the API slice
export const { useGetProductsMutation, useGetProductByIdMutation } = productApiSlice;
