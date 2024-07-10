import React, { useEffect, useState } from 'react';
import { usePlaceOrderMutation } from '../reduxStore/OrderApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addAddress } from '../reduxStore/CartSlice';

function Shipping() {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');

  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const Address = useSelector((state) => state.CartSlice.Address);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (!userInfo) {
      navigate('/SignIn?redirect=/Shipping');
    }

    if (Address) {
      setAddress(Address.address || '');
      setCity(Address.city || '');
      setPincode(Address.pincode || '');
      setCountry(Address.country || '');
    }
  }, [Address]);

  
  const {search}= useLocation();
  const sp= new URLSearchParams(search);
  const redirect= sp.get('redirect') || '/Shipping';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);  

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        if (!address || !city || !pincode || !country) {
          toast.error('All fields are required!');
          return;
        }
        dispatch(addAddress({ address, city, pincode, country }));
        navigate('/PlaceOrder');
      } catch (err) {
        toast.error(err);
      }
  };

  return (
    <div className='mt-28 flex justify-center'>
      <div className='shadow-lg p-10 rounded-md bg-white w-full max-w-sm'>
        <h1 className='font-semibold text-2xl mb-5 text-center'>SHIPPING ADDRESS</h1>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input
            type='text'
            className='my-2 focus:outline-none border p-2'
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className='my-2 relative'>
            <input
              type='text'
              className='focus:outline-none border p-2 w-full pr-10'
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className='my-2 relative'>
            <input
              type='text'
              className='focus:outline-none border p-2 w-full pr-10'
              placeholder='Pincode'
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className='my-2 relative'>
            <input
              type='text'
              className='focus:outline-none border p-2 w-full pr-10'
              placeholder='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button className='font-medium text-sm bg-yellow-500 border w-full my-3 p-2 hover:brightness-95'>
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
