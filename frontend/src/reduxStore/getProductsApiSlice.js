import { apiSlice } from "./ApiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.mutation({
            query: () => ({
                url: '/api/productRouter/products',
                method: 'POST', // Specify the HTTP method as POST
            }),
        }),

        getProductById: builder.mutation({
            query: (id) => ({
                url: `/api/productRouter/product/${id}`,
                method: 'POST', // Specify the HTTP method as POST
            }),
        }),
    }),
});

// Destructure the generated hooks from the API slice
export const { useGetProductsMutation, useGetProductByIdMutation } = productApiSlice;
