import { apiSlice } from './ApiSlice'; 

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'http://localhost:5000/api/userRouter', // Adjust URL as per your backend setup
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `http://localhost:5000/api/userRouter/register`, // Assuming USER_URL is correctly defined in Constants.js
                method: 'POST',
                body: data,
            }),
        }),
        signOut: builder.mutation({
            query: () => ({
                url: `http://localhost:5000/api/userRouter/signOut`,
                method: 'POST',
            })
        })
    }),
});

export const { useLoginMutation, useRegisterMutation, useSignOutMutation } = userApiSlice;
