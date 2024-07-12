import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductsMutation } from '../reduxStore/getProductsApiSlice';
import GetProducts from '../utills/GetProducts';
import ClipLoader from 'react-spinners/ClipLoader';

function Search() {

    const {keyword} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [getProducts, { data, isLoading: isProductsLoading, error: productsError }] = useGetProductsMutation();

    useEffect(()=>{
      function handlegetProducts() {
        setLoading(true); 
        getProducts({keyword})
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
    },[getProducts, keyword])

    if ( isProductsLoading) {
        return <div className="self-center flex justify-center m-[6px] mt-16  items-center text-3xl font-semibold">
            <ClipLoader color="#36d7b7" loading={isProductsLoading} size={50} />
            </div>;
        }

  return (
    <div  className='mt-32 md:mt-20'><p className=' font-semibold ml-9 text-md md:text-lg'>Results for {keyword}</p>
          <GetProducts data={data} isLoading={loading} error={error || productsError} />

    </div>
  )
}

export default Search