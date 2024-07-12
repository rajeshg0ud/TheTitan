import { apiSlice } from "./ApiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: 'http://localhost:5000/api/productRouter/products',
                method: 'GET', // Specify the HTTP method
            }),
        }),

        getProductById: builder.query({
            query: (id) => ({
                url: `http://localhost:5000/api/productRouter/product/${id}`,
                method: 'GET',
            }),
        })
    }),
});

// Destructure the generated hooks from the API slice
export const { useGetProductsQuery , useGetProductByIdQuery} = productApiSlice;
