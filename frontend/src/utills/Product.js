import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reduxStore/CartSlice';
import { Link, useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { useGetProductByIdMutation } from '../reduxStore/getProductsApiSlice';

function Product() {
    const location = useLocation();
    const productId = new URLSearchParams(location.search).get('p');
    const dispatch = useDispatch();
    const [btnClicked, setBtnClicked] = useState(false);

    const [fetchProductById, { data, isLoading, error }] = useGetProductByIdMutation();

    useEffect(() => {
        if (productId) {
            fetchProductById(productId); 
        }
        window.scrollTo(0, 0);
    }, [fetchProductById, productId]);

    if (isLoading) return (
        <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
            <ClipLoader color="#000000" loading={isLoading} size={50} />
        </div>
    );

    if (error) return <div className="m-5 mt-24">{error.message}</div>;

    if (!data) return null;  
    const { name, gender, imageUrl, price, listedPrice } = data;

    const handleAddToCart = () => {
        dispatch(addToCart({...data}));
        setBtnClicked(true);
    };

    return (
        <div className='mt-24 sm:pl-10 md:pl-44 flex flex-col sm:flex-row'>
            <div className='flex flex-row h-[300px] md:flex-col overflow-x-scroll overflow-y-scroll md:h-[500px] p-4'>
                {[...Array(6).keys()].map(i => (
                    <img key={i * Math.random()} src={imageUrl && imageUrl.replace(/.(?=\.jpg)/, i + 1)}
                         className='w-full md:w-[500px] object-cover' alt={'.'}/>
                ))}
            </div>
            <div className='sm:px-10'>
                <p className='font-semibold text-lg md:text-xl p-1 px-5 w-5/5 md:w-4/5'>{name}</p>
                <p className='text-gray-500 mb-1 sm:mb-2 p-1 px-5'>{gender === "ladies" ? "Women's" : "Men's"} Watch</p>
                <div className='flex text-lg p-1 pl-5'>
                    {price === listedPrice ? (
                        <p className='font-semibold'>{" ₹ " + listedPrice}</p>
                    ) : (
                        <>
                            <p className='font-semibold'>{" ₹" + price + "  "}
                                <span className="text-gray-500">{"MRP "}</span>
                                <span className="text-gray-500 line-through"> {" ₹" + listedPrice}</span>
                                <span className=' text-red-600'>{" " + Math.ceil((listedPrice - price) / listedPrice * 100)}% Off</span>
                            </p>
                        </>
                    )}
                </div>
                <p className='text-green-600 px-5 text-sm'>Inclusive of all taxes</p>
                <div className='my-4 flex'>
                    {!btnClicked ? (
                        <button className='m-3 mx-4 sm:m-3 p-3 flex justify-center text-sm border border-black hover:shadow-lg hover:bg-gray-100'
                                onClick={handleAddToCart}>ADD TO CART</button>
                    ) : (
                        <Link to='/Cart'>
                            <button className='m-3 mx-4 p-3 sm:m-3 flex justify-center text-sm border bg-black border-black hover:shadow-lg hover:bg-gray-800 text-white'>
                                GO TO CART
                            </button>
                        </Link>
                    )}
                </div>
                <div className='px-4'>
                    <p>OFFERS</p>
                    <p className='border p-2 my-4 w-5/5 sm:w-4/5'>Buy on 6 interest-free EMIs</p>
                    <div className='border w-5/5 sm:w-4/5'>
                        <p className='p-2'>Get 12% OFF* on Non discounted Over Rs. 2499. Maximum Discount: Rs.1200. T&C Apply</p>
                        <p className='border p-1 w-[55px] m-3 my-2 text-orange-700 border-orange-700 text-sm flex justify-center'>NEW</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
