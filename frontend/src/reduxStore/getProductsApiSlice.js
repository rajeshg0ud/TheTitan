import { apiSlice } from "./ApiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: '/api/productRouter/products',
                method: 'GET', // Specify the HTTP method
            }),
        }),

        getProductById: builder.query({
            query: (id) => ({
                url: `/api/productRouter/product/${id}`,
                method: 'GET',
            }),
        })
    }),
});

// Destructure the generated hooks from the API slice
export const { useGetProductsQuery , useGetProductByIdQuery} = productApiSlice;
