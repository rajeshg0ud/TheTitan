import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, increaseQuantity, removeFromCart } from '../reduxStore/CartSlice';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const cartItems = useSelector(state => state.CartSlice.cartItems);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const dispatch = useDispatch();
    let numOfItem = 0;
    let totalPrice = 0;
    let discountedPrice = 0;

    cartItems.forEach(cartItem => {
        numOfItem += cartItem.quantity;
        totalPrice += cartItem.listedPrice * cartItem.quantity;
        discountedPrice += cartItem.price * cartItem.quantity;
    });

    const { userInfo } = useSelector(state => state.authSlice);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (!userInfo) {
            navigate('/SignIn?redirect=/Shipping');
        } else {
            navigate('/Shipping');
        }
    };

     
    useEffect(() => {
        window.scrollTo(0, 0);
        return () => setIsOrderPlaced(false);
    }, []);

    if (isOrderPlaced) {
        return (
            <div className='self-center flex justify-center m-[6px] mt-24 text-3xl font-semibold'>Order Placed</div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className='self-center flex flex-col items-center mt-32'>
                <img className='w-40' src='https://www.titan.co.in/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw83105fb4/images/cart/emptybag.png' alt='Empty Bag' />
                <p className='m-[6px] text-3xl mt-4'>YOUR BAG IS EMPTY</p>
                <p className='text-zinc-800 py-[2px] pt-4'>There is nothing in your bag.</p>
                <p className='text-zinc-800 py-[2px]'>Let's add something new to your collection</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col m-2 sm:ml-16 mt-24'>
            <p className='m-[6px] text-xl sm:text-3xl'>CART</p>
            <div className='flex flex-col sm:flex-row'>
                <div className='w-full'>
                    {cartItems.map((cartItem, index) => (
                        <div className='flex p-4 m-[6px] border' key={index}>
                            <div>
                            <Link to={`/Product?p=${cartItem.id}`}>
                                <img src={cartItem.imageUrl} className='w-44 mt-[6px] mr-5' alt={cartItem.name} />
                            </Link>
                            </div>
                            <div className='text-md w-[580px] px-2 sm:px-0'>
                                <p className='text-zinc-800'>{cartItem.name}</p>
                                {cartItem.price === cartItem.listedPrice ? (
                                    <p className='font-semibold text-lg'>₹ {cartItem.listedPrice}</p>
                                ) : (
                                    <p className='font-semibold text-lg'>
                                        ₹ {cartItem.price}
                                        <span className='text-gray-500 line-through text-sm'> ₹ {cartItem.listedPrice}</span>
                                        <span className='text-red-600 text-sm'>
                                            {' ' + Math.ceil((cartItem.listedPrice - cartItem.price) / cartItem.listedPrice * 100)}% Off
                                        </span>
                                    </p>
                                )}
                                <p className='py-2 text-xs font-semibold text-zinc-800'>7 Days Returnable</p>
                                <div className='pt-3 font-semibold'>
                                    <button className='border px-2' onClick={() => dispatch(removeFromCart(cartItem))}>-</button>
                                    <button className='border px-2'>{cartItem.quantity}</button>
                                    <button className='border px-2' onClick={() => dispatch(increaseQuantity(cartItem))}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-5/5 sm:w-3/5 mx-[6px] sm:mx-4 my-[6px] sm:mr-12 text-sm font-semibold'>
                    <div className='border p-4'>
                        <div className='flex justify-between mt-3'>
                            <p className='text-lg'>Order Summary</p>
                            <p className='font-normal text-xs'>({numOfItem} Items)</p>
                        </div>
                        <p className='text-green-600 text-sm mb-3'>Overall Savings ₹ {totalPrice - discountedPrice}</p>
                        <hr />
                        <div className='flex justify-between my-3 font-normal'>
                            <p>Order Value</p>
                            <p>₹ {totalPrice}</p>
                        </div>
                        <div className='flex justify-between my-3 font-normal'>
                            <p>Shipping</p>
                            <p className='text-green-600'>FREE</p>
                        </div>
                        <div className='flex justify-between my-3 font-normal mb-16'>
                            <p>Product Discount</p>
                            <p>- ₹ {totalPrice - discountedPrice}</p>
                        </div>
                        <hr />
                        <div className='flex justify-between my-3'>
                            <p className='text-lg mb-9 sm:mb-0'>Grand Total</p>
                            <p>₹ {discountedPrice}</p>
                        </div>
                        <div onClick={handleSubmit}>
                            <button className='bg-yellow-500 border w-full py-4 hover:brightness-95 fixed bottom-0 left-0 z-50 sm:relative'>PROCEED TO BUY</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
