import React from 'react';
import { useMyOrdersMutation } from '../reduxStore/OrderApiSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';

function MyOrders() {
    const [fetchOrders, { data: orders, isLoading, error }] = useMyOrdersMutation();

        const fetchMyOrders = async () => {
        try {
            const response = await fetchOrders({
                credentials: 'include' // Include this option to send cookies
            });
            console.log(response.data); // Handle successful response
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []);

    if (isLoading) return (
        <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
            < ClipLoader color="#36d7b7" loading={isLoading} size={50} />
        </div>
    );

    if (error) return <div className="m-5 mt-24">{error?.message}</div>;

    return (
        <div className="flex flex-col m-2 sm:ml-16 mt-24">
            <p className=" md:m-[6px] text-lg sm:text-3xl">MY ORDERS</p>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-10/12">
                    {orders && orders.map((order, index) => (
                        <div className="flex flex-col md:flex-row p-4 m-[8px] my-5 border" key={index}>
                            <div className="flex flex-col w-[71%]">
                                <div className="border-b p-4 mb-4">
                                    <p className="text-md md:text-lg mb-2 font-semibold">Item Details</p>
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="flex my-3">
                                            <Link to={`/Product?p=${item.id}`}>
                                                <img src={item.imageUrl} alt={item.name} className=" min-w-14 md:w-20 h-20 object-cover md:pr-3 mr-3 md:mr-6" />
                                            </Link>
                                            <div className=' ml-2 text-sm lg:text-base md:ml-0 min-w-full'>
                                                <p className="text-zinc-800 font-semibold md:w-[90%]">{item.name}</p>
                                                <p className="text-zinc-800">Qty: {item.quantity}</p>
                                                <p className="text-zinc-800">₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 text-sm md:text-md border-b md:border-none">
                                    <p className="text-md md:text-lg mb-2 font-semibold">Address</p>
                                    <div className="flex flex-col mb-2  ">
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
                            <div className="md:border-l p-3 md:p-4 md:ml-4 flex-1 text-sm md:text-md">
                                <p className="text-md md:text-lg mb-2 font-semibold">Order Summary</p>
                                <p className="py-2 flex flex-col md:flex-row justify-between"><span className=' text-gray-500 md:text-black'>Order ID:</span><span>{order._id}</span></p>
                                <p className="py-2 flex flex-col md:flex-row justify-between"><span className=' text-gray-500 md:text-black'>Ordered on:</span><span>{new Date(order.createdAt).toLocaleString()}</span></p>
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

