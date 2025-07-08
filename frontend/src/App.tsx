import { useState } from "react";

import './App.css'

function App(){
  const [text,setText]=useState("");
    const [load,setLoad]=useState(false);
    const [result,setResult]=useState<{emotion:string,confidence:number}| null>(null);
   
    const handleSubmit=async (e:React.FormEvent)=>{
     
      e.preventDefault();
      if(!text){
        alert("plzz enter the corect emotion");
      }
       setLoad(true);
       setResult(null);
      try {
        const responce=await fetch('http://localhost:8000/analyse',{
          method:'POST',
          headers:{
            'content-type':'application/json',
          },
          body:JSON.stringify({text}),
        })

        const Data=await responce.json();
        console.log(Data);
        setResult(Data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoad(false);
      }
    }
  
  return(
    <>
    <h1 className="text-4xl">Emotional Analyzer</h1>

    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea className="border border-b-gray-400 rounded-md p-3 focus:outline-none focus:ring-2 
         focus:ring-blue-600 resize-none min-h-[100px]"
         placeholder="Enter your emotion "
         value={text}
         onChange={(e)=>setText(e.target.value)} />
    
    <button disabled={load}
    type="submit"
    className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
      {load?"Analysing":"Analyxe emotion"}
    </button>

      </form>

      {result &&(
        <div >
          <p className="text-2xl text-blue-900">{result.emotion}</p>
          <p className="text-2xl text-blue-900">{result.confidence}</p>
          </div>
      )}

    </div>
    </>
  )
}


export default App;