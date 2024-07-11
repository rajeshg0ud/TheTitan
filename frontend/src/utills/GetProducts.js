import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../reduxStore/ProductSlice'; 
import ClipLoader from 'react-spinners/ClipLoader';

function GetProducts({data, isLoading, error}) {

    const dispatch = useDispatch();

    
  if (isLoading) return <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
  <ClipLoader color="#000000" loading={isLoading} size={50} />
</div>;

  if (error) return <div  className="m-5 mt-24">{error.message}</div>;

    return (
        <div className='flex flex-wrap justify-center text-sm'>{
            data.map((item, j) => (
                <Link to={`/Product?p=${item.id}`} key={item._id ? item._id : `product_${j}`}>
                    <div className='m-5 mx-[10px] sm:mx-5 w-[140px] sm:w-[207px] hover:shadow-lg cursor-pointer justify-self-start mt-7' onClick={() => dispatch(addProduct(item))}>
                        <img src={item.imageUrl} className='w-40 sm:w-[207px] rounded-sm object-cover' alt={item.name} />
                        <div className='p-3'>
                            <p className='font-semibold overflow-hidden line-clamp-2 mb-2 text-sm sm:text-md'>{item.name}</p>
                            <p className='font-semibold text-gray-500 mb-2'>{item.gender === "ladies" ? "Women's" : "Men's"} Watch</p>
                            {
                                item.price === item.listedPrice ? <p className='font-semibold'>₹ {item.listedPrice}</p> :
                                    (
                                        <p className='font-semibold'>₹ {item.price + "  "}
                                            <span className="text-gray-500 line-through">₹ {item.listedPrice}</span>
                                            <span className='text-red-600'>{" " + Math.ceil((item.listedPrice - item.price) / item.listedPrice * 100)}% Off</span>
                                        </p>
                                    )
                            }
                        </div>
                    </div>
                </Link>
            ))
        }</div>
    );
}

export default GetProducts;