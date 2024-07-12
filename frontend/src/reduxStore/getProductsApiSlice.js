import { apiSlice } from "./ApiSlice";
import { BASE_URL } from '../Constants';

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.mutation({
            query: ({keyword}) => ({
                url: `${BASE_URL}/api/productRouter/products`,
                method: 'POST',
                params:{keyword}
            }),
        }),

        getProductById: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/api/productRouter/product/${id}`,
                method: 'POST',
            }),
        }),
    }),
});
 
export const { useGetProductsMutation, useGetProductByIdMutation } = productApiSlice;