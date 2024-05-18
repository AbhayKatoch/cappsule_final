import React, { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import Results from './Results';

function Searchbar({onSearch}) {
  const [input, setInput] = useState("");
  

  const handleSearch= ()=>{
    
    onSearch(input)
  }
  const handleChange= (value)=>{
    setInput(value)
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleSearch();
    }
  }

  return (
    <>
        <div className='flex p-6 justify-center '>
          <div className='flex gap-x-6 w-full '>
            <div className='p-2 text-gray-500'><FaSearch id ="search-icon" className='w-6 h-6'/></div>
            
            <input type="text" placeholder='Type your medicine name here' className=' min-w-full  bg-transparent text-lg font-semibold outline-none' value={input} onChange={(e)=>handleChange(e.target.value)}  onKeyDown={handleKeyPress}/>

          </div>
            <button onClick={handleSearch} className=' ml-auto text-lg text-blue-900 hover:text-blue-700 font-bold my-auto px-4 '>
              Search
            </button>
        </div>

       


    </>
  )
}

export default Searchbar