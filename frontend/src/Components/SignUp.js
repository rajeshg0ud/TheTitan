import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../reduxStore/UserApiSlice';
import { setCredentials } from '../reduxStore/authSlice';
import ClipLoader from 'react-spinners/ClipLoader';


function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordType, setPasswordType] = useState(true);
  const [passwordType2, setPasswordType2] = useState(true);

  const [register, {isLoading, error}]= useRegisterMutation();

const dispatch=useDispatch();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await register({ name, email, password }).unwrap();
    console.log('Response:', res); // Debugging line
    dispatch(setCredentials({ ...res }));
    toast.success('Signed up successfully');
  } catch (err) {
    console.error('Signup Error:', err); // Debugging line
    toast.error('Signup failed');
  }
};




const userInfo = useSelector((state) => state.authSlice.userInfo);



  const {search}= useLocation();
  const sp= new URLSearchParams(search);
  const redirect= sp.get('redirect') || '/';
  const navigate=useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);  

  if (isLoading) return <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
  <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
</div>;

  if (error) return <div  className="m-5 mt-24">{error?.message}</div>;

  return (
    <div className='mt-28 flex justify-center'>
      <div className='shadow-lg p-10 rounded-md bg-white w-full max-w-sm'>
        <h1 className='font-semibold text-2xl mb-5 text-center'>SIGN UP</h1>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input
            type='text'
            className='my-2 focus:outline-none border p-2'
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            className='my-2 focus:outline-none border p-2'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='my-2 relative'>
            <input
              type={passwordType ? 'password' : 'text'}
              className='focus:outline-none border p-2 w-full pr-10'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <span 
              className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' 
              onClick={() => setPasswordType(!passwordType)}
            >
              {passwordType ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className='my-2 relative'>
            <input
              type={passwordType2 ? 'password' : 'text'}
              className='focus:outline-none border p-2 w-full pr-10'
              placeholder='Confirm Password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span 
              className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' 
              onClick={() => setPasswordType2(!passwordType2)}
            >
              {passwordType2 ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button className='font-medium text-sm bg-yellow-500 border w-full my-3 p-2  hover:brightness-95'>
            CONTINUE
          </button>
        </form>
        <p className='text-sm text-slate-600 mt-4 text-center'>
          Already have an account?{' '}
          <Link to={redirect!=='/'? '/SignIn?redirect=/Shipping' : '/SignIn?redirect=/'}>
            <span className='text-black font-semibold'>Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
