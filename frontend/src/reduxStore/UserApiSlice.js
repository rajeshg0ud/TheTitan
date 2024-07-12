import { apiSlice } from './ApiSlice'; 
import { BASE_URL } from '../Constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
<<<<<<< HEAD
                url: `${BASE_URL}/api/userRouter`, 
=======
                url: `${BASE_URL}/api/userRouter`, // Adjust URL as per your backend setup
>>>>>>> 9bf84dd84251ee7ff87763bbb6fedb0295fcdfb1
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
<<<<<<< HEAD
                url: `${BASE_URL}/api/userRouter/register`, 
=======
                url: `${BASE_URL}/api/userRouter/register`, // Assuming USER_URL is correctly defined in Constants.js
>>>>>>> 9bf84dd84251ee7ff87763bbb6fedb0295fcdfb1
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
});

export const { useLoginMutation, useRegisterMutation, useSignOutMutation } = userApiSlice;