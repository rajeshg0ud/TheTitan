import React, { useEffect } from 'react';
import { useMyOrdersQuery } from '../reduxStore/OrderApiSlice';

function MyOrders() {
const { data: orders, isLoading, error } = useMyOrdersQuery({}, { staleTime: 0 });

    useEffect(() => {
        if (orders) {
            console.log(orders);
        }
    }, [orders]);
    

    if (isLoading) return <div  className="m-5 mt-24">Loading...</div>;
    if (error) return <div  className="m-5 mt-24">error</div>;

    return (
        <div className="flex flex-col m-2 sm:ml-16 mt-24">
            <p className="m-[6px] text-xl sm:text-3xl">MY ORDERS</p>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-4/5">
                    {orders.map((order, index) => (
                        <div className="flex flex-row p-4 m-[8px] my-5 border" key={index}>
                            <div className="flex flex-col w-[71%] ">
                                <div className="border-b p-4 mb-4">
                                    <p className="text-lg mb-2 font-semibold">Item Details</p>
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="flex my-3">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-3" />
                                            <div>
                                                <p className="text-zinc-800"><strong>{item.name}</strong> </p>
                                                <p className="text-zinc-800">Qty: {item.quantity} </p>
                                                <p className="text-zinc-800">  ₹{item.price} </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className=" p-4">
                                    <p className="text-lg mb-2 font-semibold">Address</p>
                                    <div className="flex flex-col mb-2">
                                        <p className="text-gray-500">Area</p>
                                        <p>{order.shippingAddress.address}</p>
                                    </div>
                                    <div className="flex flex-col mb-2">
                                        <p className="text-gray-500">Locality / City</p>
                                        <p>{order.shippingAddress.city}</p>
                                    </div>
                                    <div className="flex flex-col mb-2">
                                        <p className="text-gray-500">Pincode</p>
                                        <p className="text-green-600">{order.shippingAddress.pincode}</p>
                                    </div>
                                    <div className="flex flex-col mb-2">
                                        <p className="text-gray-500">Country</p>
                                        <p>{order.shippingAddress.country}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l p-4 ml-4 flex-1">
                                <p className="text-lg mb-2 font-semibold">Order Summary</p>
                                <p className=' py-2 flex justify-between'> <a>Order ID: </a>  <a>   {order._id}</a></p>
                                <p className=' py-2 flex justify-between'> <a> Ordered on:</a>  <a>  {new Date(order.createdAt).toLocaleString()} </a></p>
                                <p className=' py-2 flex justify-between'> <a> Items Price:</a>  <a> ₹{order.itemsPrice} </a> </p>
                                <p className=' py-2 flex justify-between'> <a> Tax Price:</a>  <a> ₹{order.taxPrice} </a> </p>
                                <p className=' py-2 flex justify-between'> <a>  Shipping Price:</a> <a>   ₹{order.shippingPrice}</a></p>
                                <p className=' py-2 flex justify-between'> <a> Payment Method:</a>  <a> {order.paymentMethod} </a> </p>
                                <hr className=' mt-2'/>
                                
                                <p className=' my-2'> <strong className=' flex justify-between'><a> Grand Total: </a>  <a> ₹{order.totalPrice} </a></strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyOrders;
