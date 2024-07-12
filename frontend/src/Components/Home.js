import React, { useEffect, useState } from 'react';
import Footer from './footer.js';
import { useGetProductsMutation } from '../reduxStore/getProductsApiSlice.js';
import ClipLoader from 'react-spinners/ClipLoader';
import GetProducts from '../utills/GetProducts.js';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const slides = [
        'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwd025a10d/images/homepage/All_Banners/BestSellers_D.jpg',
        'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw901c16c3/images/homepage/All_Banners/NewArrivals_D.jpg',
        'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw97a3e857/images/workwear.jpg'
    ];

    // Using mutation hook to fetch products
    const [getProducts, { data, isLoading: isProductsLoading, error: productsError }] = useGetProductsMutation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => prevSlide === slides.length - 1 ? 0 : prevSlide + 1);
        }, 2800);

        window.scrollTo(0, 0);

        return () => clearInterval(interval);
    }, [slides.length]);

    function goToPrev() {
        setCurrentSlide(prevSlide => prevSlide === 0 ? slides.length - 1 : prevSlide - 1);
    }

    function goToNext() {
        setCurrentSlide(prevSlide => prevSlide === slides.length - 1 ? 0 : prevSlide + 1);
    }

    useEffect(()=>{
      function handlegetProducts() {
        setLoading(true);
        getProducts()
            .then(({ data }) => {
                // setData(json); // No need to set data here as it's handled by useGetProductsMutation
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }

    handlegetProducts();
    },[getProducts])

    return (
        <>
            <div className='mt-16 sm:mt-[74px] relative'>
                <img className='flex flex-wrap justify-center shadow-md transition-all' src={slides[currentSlide]} alt='slides' />
                <button className='absolute top-[29%] sm:top-[43%] p-0 sm:p-2 px-[6px] sm:px-[14px] my-3 mx-1 sm:m-3 rounded-full bg-white font-bold' onClick={goToPrev}>&lt;</button>
                <button className='absolute top-[29%] right-2  sm:top-[43%] p-0 sm:p-2 px-[6px] sm:px-[14px] my-3 mx-1 sm:m-3 rounded-full bg-white font-bold' onClick={goToNext}>&gt;</button>
            </div>

            <div className='bg-white shadow-md mt-1 sm:mt-5 pt-7'>
                <p className='font-semibold ml-10 text-sm sm:text-md'>Premium Watches</p>
                {isProductsLoading ? (
                    <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
                        <ClipLoader color="#000000" loading={isProductsLoading} size={50} />
                    </div>
                ) : (
                    <GetProducts data={data} isLoading={loading} error={error || productsError} />
                )}
                <div className='flex justify-center mt-12 h-[75px] md:h-36  ivory'>
                    <img className='flex flex-wrap justify-center h-[60px] md:h-36 ' src='https://www.titan.co.in/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw05cf6619/images/Category%20Banners/Espot_new10.jpeg' alt='banner1' />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Home;
