{/**import React, { useState } from 'react'

function Search() {

    const [data, setData]=useState('');

    
let arrayOfObjects = [     { name: "John", age: 25, city: "New York" },     
{ name: "Emily", age: 30, city: "Los Angeles" },     
{ name: "Michael", age: 28, city: "Chicago" },     
{ name: "Sarah", age: 35, city: "Houston" } ];

const submitSearch=(e)=>{
    e.preventDefault();
    setData(e.target.value);
    filterSearch(e.target.value)
}

const filterSearch=(value)=>{
    const personn= arrayOfObjects.filter((person)=>{
        
           return person.name.toLowerCase().includes(value) 
           ||person.age.toString().includes(value) ||person.city.toLowerCase().includes(value)
        
    })

    console.log(personn);
}

  return (
    <div className=' mt-20 border'>
       <form >
       <input type='text' onChange={(e)=>{submitSearch(\e)}}/>
       </form>
    </div>
  )
}

export default Search */}