import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct } from '../reduxStore/ProductSlice'; 

function GetProducts({ link }) {

    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    const getProducts = async () => { 
        const data = await fetch(link);
        const jsonData = await data.json();
        setProducts(jsonData);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className='flex flex-wrap justify-center text-sm'>
            {products && products.campaignResponses?.map((pro ) => (
                pro.payload && pro.payload.products?.map((item, j) => (
                    <Link to='/Product' key={item.id ? item.id : `product_${j}`}>
                        <div className='m-5 mx-[10px] sm:mx-5 w-[140px] sm:w-[207px] hover:shadow-lg cursor-pointer justify-self-start mt-7' onClick={() => dispatch(addProduct(item))}>
                            <img src={item?.attributes?.imageUrl?.value} className=' w-40 sm:w-[207px] rounded-sm object-cover' alt={item?.attributes?.name?.value} />
                            <div className=' p-3'>
                                <p className=' font-semibold overflow-hidden line-clamp-2 mb-2 text-sm sm:text-md'>{item?.attributes?.name?.value}</p>
                                <p className=' font-semibold text-gray-500  mb-2'>{item.dimensions.Gender?.[0] === "ladies" ? "Women's" : "Men's"} Watch</p>
                                {
                                    item?.attributes?.price?.value === item?.attributes?.listPrice?.value ? <p className='font-semibold'>₹ {item?.attributes?.listPrice?.value}</p> :
                                        (
                                            <p className='font-semibold'>₹ {item?.attributes?.price?.value + "  "}
                                                <span className="text-gray-500 line-through">₹ {item?.attributes?.listPrice?.value}</span>
                                                <span className=' text-red-600'>{" " + Math.ceil((item?.attributes?.listPrice?.value - item?.attributes?.price?.value) / item?.attributes?.listPrice?.value * 100)}% Off</span>
                                            </p>
                                        )
                                }
                            </div>
                        </div>
                    </Link>
                ))
            ))}
        </div>
    );
}

export default GetProducts;
