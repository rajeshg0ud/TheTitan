import { apiSlice } from './ApiSlice'; 
import { BASE_URL } from '../Constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/userRouter`, 
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/userRouter/register`, 
                method: 'POST',
                body: data,
            }),
        }),
        signOut: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/api/userRouter/signOut`,
                method: 'POST',
            })
        })
    }),
})


export const { useLoginMutation, useRegisterMutation, useSignOutMutation } = userApiSlice;
