import { apiSlice } from './ApiSlice'; 
import { BASE_URL } from '../Constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/userRouter`, 
                method: 'POST',
                body: data,
                credentials: 'include', // Include credentials
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/userRouter/register`, 
                method: 'POST',
                body: data,
                credentials: 'include', // Include credentials
            }),
        }),
        signOut: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/api/userRouter/signOut`,
                method: 'POST',
                credentials: 'include', // Include credentials
            })
        })
    }),
})


export const { useLoginMutation, useRegisterMutation, useSignOutMutation } = userApiSlice;
