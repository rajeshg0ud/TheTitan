import { apiSlice } from "./ApiSlice";
import { BASE_URL } from '../Constants';

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/api/productRouter/products`,
<<<<<<< HEAD
=======
                method: 'POST', // Specify the HTTP method as GET
>>>>>>> 9bf84dd84251ee7ff87763bbb6fedb0295fcdfb1
            }),
        }),

        getProductById: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/api/productRouter/product/${id}`,
<<<<<<< HEAD
=======
                method: 'POST', // Specify the HTTP method as GET
>>>>>>> 9bf84dd84251ee7ff87763bbb6fedb0295fcdfb1
            }),
        }),
    }),
});
 
export const { useGetProductsMutation, useGetProductByIdMutation } = productApiSlice;