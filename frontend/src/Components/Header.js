import React, { useState, useEffect, useRef } from 'react';
import logo from '../titan-logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSignOutMutation } from '../reduxStore/UserApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../reduxStore/authSlice';
import ClipLoader from 'react-spinners/ClipLoader';

function Header() {
  const userInfo = useSelector((state) => state.authSlice.userInfo);
  const cartItems = useSelector((store) => store?.CartSlice?.cartItems);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();
  const [signOut, { isLoading }] = useSignOutMutation();

  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      dispatch(setCredentials(null));
      toast.success('Logged out successfully');
      setDropdownVisible(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  let numOfItem = 0;
  if (cartItems && cartItems.length > 0) {
    cartItems.forEach((cartItem) => {
      numOfItem += cartItem.quantity;
    });
  }

  if (isLoading) return <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
  <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
</div>;


  return (
    <div className='fixed top-0 w-full z-50'>
      <header className='flex justify-between pt-2 sm:p-[10px] sm:pb-0 bg-white shadow-lg'>
        <Link to='/' className='p-3'>
          <img src={logo} className='w-20 sm:w-[124px] ml-7 cursor-pointer' alt='logo' />
        </Link>
        <div className={`hidden border rounded-sm w-2/6 px-2 h-10 my-[5.5px] sm:flex ${isFocused ? "bg-white" : "bg-gray-100"}`}>
          <img src='https://www.titan.co.in/on/demandware.static/Sites-Titan-Site/-/default/dwc65631a9/images/search.svg' alt='search' className='p-2 px-1' />
          <input
            type='text'
            placeholder='Search for Products...'
            className={`outline-none w-full ${isFocused ? "bg-white" : "bg-gray-100"}`}
            onClick={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        <div className='flex sm:mr-10'>
          <div>
            {userInfo ? (
              <div className='relative' ref={dropdownRef}>
                <p
                  className='px-4 flex flex-col items-center hover:cursor-pointer size-14 sm:size-16 text-sm sm:text-md'
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  <img
                    src='https://www.titan.co.in/on/demandware.static/Sites-Titan-Site/-/default/dw1d6980ca/images/headerAccount.svg'
                    alt='signin'
                  />{" "}
                  {userInfo.name}
                </p>

                {dropdownVisible && (
                  <div className='absolute top-full -right-5 bg-white shadow-md rounded-sm'>
                    <Link to='/Order-history'>
                    <button 
                      className='block px-2 py-2 text-sm text-gray-700 w-[100px] hover:bg-gray-100'
                    >
                      My Orders
                    </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='block px-2 py-2 text-sm text-gray-700 w-[100px] hover:bg-gray-100'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to='/SignIn' className='relative'>
                <p className='px-4 flex flex-col items-center hover:cursor-pointer size-14 sm:size-16 text-sm sm:text-md'>
                  <img
                    src='https://www.titan.co.in/on/demandware.static/Sites-Titan-Site/-/default/dw1d6980ca/images/headerAccount.svg'
                    alt='signin'
                  />{" "}
                  SignIn
                </p>
              </Link>
            )}
          </div>

          <Link to='/Cart' className='relative'>
            <p className='px-4 flex flex-col items-center hover:cursor-pointer size-14 sm:size-16 text-sm sm:text-md'>
              <img
                src='https://www.titan.co.in/on/demandware.static/Sites-Titan-Site/-/default/dw7cbff1cd/images/headerCart.svg'
                alt='cart'
              />
              Cart
              {numOfItem > 0 && (
                <span className='absolute top-0 left-8 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
                  {numOfItem}
                </span>
              )}
            </p>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
