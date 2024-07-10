import { apiSlice } from "./ApiSlice";


export const orderApiSlice= apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        placeOrder:builder.mutation({
            query:(data)=>({
                url: 'http://localhost:5000/api/orderRouter/placeOrder',
                method: 'POST',
                body: data,
            })
        }),

        myOrders:builder.query({
            query:()=>({
                url:'http://localhost:5000/api/orderRouter/myOrders',
            })
        })
    })

})

export const {usePlaceOrderMutation,  useMyOrdersQuery}= orderApiSlice