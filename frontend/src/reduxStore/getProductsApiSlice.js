import { apiSlice } from "./ApiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.mutation({
            query: () => ({
                url: '/api/productRouter/products',
                method: 'GET', // Specify the HTTP method as GET
            }),
        }),

        getProductById: builder.mutation({
            query: (id) => ({
                url: `/api/productRouter/product/${id}`,
                method: 'GET', // Specify the HTTP method as GET
            }),
        }),
    }),
});

// Destructure the generated hooks from the API slice
export const { useGetProductsMutation, useGetProductByIdMutation } = productApiSlice;
