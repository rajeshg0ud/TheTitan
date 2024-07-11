import React from 'react';
import { useMyOrdersQuery } from '../reduxStore/OrderApiSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';

function MyOrders() {
    const { data: orders, isLoading, error } = useMyOrdersQuery({}, { staleTime: 0 });

    if (isLoading) return <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
        <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
    </div>;

    if (error) return <div className="m-5 mt-24">{error?.message}</div>;

    return (
        <div className="flex flex-col m-2 sm:ml-16 mt-24">
            <p className="m-[6px] text-xl sm:text-3xl">MY ORDERS</p>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-4/5">
                    {orders.map((order, index) => (
                        <div className="flex flex-row p-4 m-[8px] my-5 border" key={index}>
                            <div className="flex flex-col w-[71%]">
                                <div className="border-b p-4 mb-4">
                                    <p className="text-lg mb-2 font-semibold">Item Details</p>
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="flex my-3">
                                            <Link to={`/Product?p=${item.id}`}>
                                                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover mr-3" />
                                            </Link>
                                            <div>
                                                <p className="text-zinc-800"><strong>{item.name}</strong> </p>
                                                <p className="text-zinc-800">Qty: {item.quantity} </p>
                                                <p className="text-zinc-800">₹{item.price} </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4">
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
                                <p className="py-2 flex justify-between"><span>Order ID:</span><span>{order._id}</span></p>
                                <p className="py-2 flex justify-between"><span>Ordered on:</span><span>{new Date(order.createdAt).toLocaleString()}</span></p>
                                <p className="py-2 flex justify-between"><span>Items Price:</span><span>₹{order.itemsPrice}</span></p>
                                <p className="py-2 flex justify-between"><span>Tax Price:</span><span>₹{order.taxPrice}</span></p>
                                <p className="py-2 flex justify-between"><span>Shipping Price:</span><span>₹{order.shippingPrice}</span></p>
                                <p className="py-2 flex justify-between"><span>Payment Method:</span><span>{order.paymentMethod}</span></p>
                                <hr className="mt-2" />
                                <p className="my-2"><strong className="flex justify-between"><span>Grand Total:</span><span>₹{order.totalPrice}</span></strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyOrders;
