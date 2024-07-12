import React from 'react'
import GetProducts from '../utills/GetProducts';
import { useEffect, useState } from 'react';
import Footer from './footer'; 

function Home() {

  const [currentSlide, setCurrentSlide]= useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData]=useState([]);


  const slides=[
    'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwd025a10d/images/homepage/All_Banners/BestSellers_D.jpg',
    'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw901c16c3/images/homepage/All_Banners/NewArrivals_D.jpg',
    'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw97a3e857/images/workwear.jpg'
  ]

  useEffect(()=>{
    const interval=setInterval(() => {
      setCurrentSlide((prevSlide)=>  prevSlide=== slides.length-1 ? 0 : prevSlide+1)
    }, 2800);
    
    window.scrollTo(0, 0);

    return ()=> clearInterval(interval);
  },[slides.length])

   useEffect(()=>{
    const fetchData=async()=>{
      try{
      const res= await fetch('http://localhost:5000/api/productRouter/products');
      const json= await res.json();
      setData(json);
    }
    catch(err){
      setError(err.message)
    }
    finally{
      setLoading(false)
    }
    }

    fetchData()
   },[])

  function goToPrev(){
    setCurrentSlide((prevSlide)=> prevSlide=== 0 ? slides.length-1 : prevSlide-1)
  }

  function goToNext(){
    setCurrentSlide((prevSlide)=> prevSlide=== slides.length-1 ? 0: prevSlide+1 )
  }
  

  return (
    <>
    <div className=' mt-16 sm:mt-[74px] relative'>
    <img className='flex flex-wrap justify-center shadow-md transition-all' src={slides[currentSlide]} alt='slides'  />
    <button className=' absolute top-[29%] sm:top-[43%] p-0 sm:p-2 px-[6px] sm:px-[14px] my-3 mx-1 sm:m-3 rounded-full bg-white font-bold' onClick={()=>goToPrev()}>&lt;</button>
    <button className=' absolute top-[29%] right-2  sm:top-[43%] p-0 sm:p-2 px-[6px] sm:px-[14px] my-3 mx-1 sm:m-3 rounded-full bg-white font-bold' onClick={()=>goToNext()}>&gt;</button>
    </div>
    
    <div className='bg-white shadow-md mt-1 sm:mt-5 pt-7'>
      <p className='font-semibold ml-10 text-sm sm:text-md'>Premium Watches</p>
     <GetProducts data={data} isLoading={loading} error={error}/>
      <div className=' flex justify-center mt-12 h-36 ivory'>
       
       <img className='flex flex-wrap h-36 justify-center ' src='https://www.titan.co.in/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw05cf6619/images/Category%20Banners/Espot_new10.jpeg' alt='banner1'  />

      </div>
      <Footer />
    </div>
    </>
    )
}

export default Home;