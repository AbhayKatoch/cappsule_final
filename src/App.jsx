import { useState } from 'react'
import Searchbar from './Compnents/Searchbar'
import Results from './Compnents/Results'

function App() {
  const [initial, setInitial] = useState("Find medicines with amazing discount")
  const update = (newMessage)=>{
    setInitial(newMessage)
  }

  const [results, setResults] = useState([]);

  const fetchData = (value)=>{
    console.log(value);
    if(!value){
      setInitial("please enter a search term to find a medicines");
      return;
    }
    fetch(`https://backend.cappsule.co.in/api/v1/new_search?q=${value}&pharmacyIds=1,2,3`)
    .then((response) =>response.json())
    .then((json) =>{
      console.log(json)
      if(json.data && json.data.saltSuggestions){
        console.log(json.data.saltSuggestions)
      setResults(json.data.saltSuggestions.filter((suggestion)=>{
          return suggestion && suggestion.salt && suggestion.salt.toLowerCase().includes(value);
          }))
          console.log(results);
          setInitial("");
    
    }
    })
  }

  return (
    <div className='h-screen'>
      <section>
        <h1 className=' text-center my-12 text-3xl font-semibold pb-2'>Cappsule web development test</h1>
        <div className='flex mx-auto rounded-full flex-col  min-w-52 justify-center   w-2/3 h-16 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
          <Searchbar onSearch={fetchData}/>
        </div>


      </section>
       <hr className='mt-16 border mx-auto w-2/3  border-gray-300'/>

       <p className='text-2xl italic font-bold text-gray-400 text-center relative top-48'>{initial}</p>

      
      <div className='m-8 justify-between flex flex-wrap min-w-2/3 gap-y-10'>
          {results.map((result) => (
            <Results key={result.id} result={result} />
           
          ))}
      </div>
 
      
    
    </div>
  )
}

export default App
