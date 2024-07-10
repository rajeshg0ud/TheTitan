{/**import React, { useEffect, useState } from 'react';

function GetCategories() {
  const [category, setCategory]= useState("");

  const getCategoriess=async()=>{
    const data= await fetch('https://api.escuelajs.co/api/v1/categories');
    const jsonData= await data.json();
    setCategory(jsonData);
    console.log(jsonData);   
  };

  useEffect(()=>{
      getCategoriess();
    },[]);

   if(!category) return null; 
  
    return(
      <div  className=' flex justify-center bg-white shadow-md mt-3 mx-4'>
        {
          category?.map((cat)=>(
          (cat.image.includes('jpeg')|| cat.image.includes('jpg')  ?
          <>
          <div key={cat.Id} className=' p-4 flex flex-col items-center'> 
          <img src={cat.image} alt={cat.name} className=' w-[94px] h-[77px] rounded-md object-cover'/>
          <div className=' font-semibold'>{cat.name}</div>
          </div>
          </> :null)
          ))
        }
      </div>
    )
  
}

export default GetCategories */}