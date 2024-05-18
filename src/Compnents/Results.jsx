import React, { useEffect, useState } from 'react'

function Results({result}) {
    const {available_forms, salt_forms_json} = result;
    const [selectForm, setSelectForm] = useState("")
    const [selectStrength, setSelectStrength] = useState("")
    const [selectPackagings, setSelectpackagings] = useState("")
    const [strengths, setStrength] = useState([])
    const [packagings, setpackaging] = useState([])
    const [price, setPrice] = useState(null)

    

    useEffect(()=>{
        if(selectForm){
            const updateStrength =Object.keys(salt_forms_json[selectForm])
            setStrength(updateStrength)
            setSelectStrength("")
        }
    },[selectForm, salt_forms_json])


    useEffect(()=>{
        if(selectForm && selectStrength){
            const updatepackage =Object.keys(salt_forms_json[selectForm][selectStrength])
            setpackaging(updatepackage)
        }
    },[selectForm,selectStrength, salt_forms_json])

    useEffect(() => {
        if (selectForm && selectStrength && selectPackagings) {
          const packages = salt_forms_json[selectForm][selectStrength][selectPackagings];
          let minPrice = null
          for (let key in packages) {
            if (packages[key]) {
              packages[key].forEach(item => {
                if (item && item.selling_price) {
                  minPrice = minPrice !== null ? Math.min(minPrice, item.selling_price): item.selling_price;
                }
              });
            }
          }
          setPrice(minPrice);
        } else {
          setPrice(null);
        }
      }, [selectForm, selectStrength, selectPackagings, salt_forms_json]);

      const isOptionAvailable = (form, strength, packaging) => {
        return salt_forms_json[form] && salt_forms_json[form][strength] && salt_forms_json[form][strength][packaging];
      };
    
  return (
    <>
        <div className='flex flex-wrap  p-10 items-center  shadow-md rounded-xl justify-between  bg-gradient-to-r from-gray-50 to-sky-200 w-2/3 bg-black mx-auto'>
        <div className='flex flex-row gap-x-8'>
            
            <div className='flex flex-col gap-y-3 '>

              <div className=' flex flex-row gap-x-12  '>
                    <div className='font-medium pr-4'>Form:</div>
                    <div className='flex flex-row flex-wrap max-w-44 justify-between gap-y-2  '>
                        {available_forms.map((form,index)=>(

                            <button key={index} onClick={()=> setSelectForm(form)} type="button" className={`text-black focus:ring-1 focus:border-teal-600 border-2   border-gray-300 bg-white from-teal-400 via-teal-500 to-teal-600 shadow-lg shadow-teal-300/35  font-normal rounded-lg text-sm px-2 py-1.5 text-center ${selectForm === form ? 'border-teal-500' : ''}  ${isOptionAvailable(form,selectForm,selectPackagings) ? 'border-dotted':''}` }>{form}</button>

                        ))}
                    

                     </div>

                
              </div>
              
                    <div className=' flex flex-row gap-x-12  '>
                            <div className='font-medium pr-4'>Strength:</div>
                            <div className='flex flex-row flex-wrap max-w-44 justify-between gap-y-2  '>
                                {strengths.length > 0 ? strengths.map((strength,index)=>(

                                    <button key={index} type="button" onClick={()=>setSelectStrength(strength)} className={`text-black border-2  border-gray-300 bg-white from-teal-400 via-teal-500 to-teal-600 shadow-lg focus:ring-1 focus:border-teal-600 shadow-teal-300/35  font-normal rounded-lg text-sm px-2 py-1.5 text-center ${selectStrength === strength ? 'border-teal-500' : ''}  `}>{strength}</button>

                                )):(
                                    <div className='flex gap-x-2'>
                                    <button type="button" class="text-black border-2  border-gray-300 bg-white from-teal-400 via-teal-500 to-teal-600 shadow-lg shadow-teal-300/35  font-normal rounded-lg text-sm px-2 py-1.5 text-center  ">100 mg</button>
                                    <button type="button" class="text-black border-2  border-gray-300 bg-white from-teal-400 via-teal-500 to-teal-600 shadow-lg shadow-teal-300/35  font-normal rounded-lg text-sm px-2 py-1.5 text-center  ">500 mg</button>
                                    

                                </div>

                                )
                                }
                            

                            </div>

                        
                    </div>


                <div className=' flex flex-row gap-x-12  '>
                        <div className='font-medium pr-4'>Package:</div>
                        <div className='flex flex-row flex-wrap max-w-48 justify-between  gap-y-2  '>
                            {packagings.length >0 ? packagings.map((packaging,index)=>(

                                
                                <button key={index} onClick={()=>setSelectpackagings(packaging)}  type="button" className="text-black border-2 focus:ring-1 focus:border-teal-600  border-gray-300 bg-white from-teal-400 via-teal-500 to-teal-600 shadow-lg shadow-teal-300/35  font-normal rounded-lg text-sm px-2 py-1.5 text-center  ">{packaging}</button>
                            )): (
                                <div className='flex gap-x-2'>
                                    <button type="button" className="text-black border-2  border-gray-300 bg-white from-teal-400 via-teal-500 to-teal-600 shadow-lg shadow-teal-300/35  font-normal rounded-lg text-sm px-2 py-1.5 text-center  ">5 strips</button>
                                    <button type="button" className="text-black border-2  border-gray-300 bg-white from-teal-400 via-teal-500 to-teal-600 shadow-lg shadow-teal-300/35  font-normal rounded-lg text-sm px-2 py-1.5 text-center  ">10 strips</button>
                                    

                                </div>
                            )
                            }
                        

                        </div>

                    
                </div>
              
            </div>
            

            </div>
          <div className=' text-center '>
            <h1 className='font-semibold text-xl'>{result.salt}</h1>
          </div>

          
          <div className=' '>
            <h1 className='font-bold text-2xl'> {price !=null ? "From "+ `₹${price}` :( 
            <div className='p-2 font-normal w-44 border-gray-400 border bg-white text-lg text-center '>
                No stores selling product near you
                
            </div>
  )}
            </h1>
          </div>
          


        </div>
        
    </>
  )
}

export default Results