import { useState,useRef, useCallback,useEffect } from 'react'
import './App.css'

function App() {
const [length,setLength]= useState(6);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [specialCharAllowed,setCharAllowed] = useState(false);
  let [password,setPassword]=useState();

const passwordRef=useRef(null)
  

  const passwordGenerator=useCallback(()=>{

    let Str="aAbBcCDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrsStTUuVvWwXxYyZz";
    if (numberAllowed){
      Str= Str+ "1234567890";
    } 
    
    if (specialCharAllowed) {
      Str=Str+"!@#$%^&*()_+-=?";
    }
    
  
    let pass="";
    for (let index = 0; index <= length; index++) {
     let char= Math.floor(Math.random()*Str.length+1);
     
     pass+= Str.charAt(char);

console.log(Str);

     console.log(pass);
     
      
     
    }
    setPassword(pass);


    

    
  },[length,numberAllowed,specialCharAllowed])
   
  
  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed,specialCharAllowed,length,passwordGenerator]);
 

  const copyPassword=useCallback(() => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard");
    passwordRef.current?.select()
  },[password])


  return (
    <>
      <div className="app">
<div className="row-1">
<input type="text" readOnly className='input1'  placeholder='password' value={password} ref={passwordRef}/>
<button className='copyBtn' onClick={copyPassword}>Copy</button>
</div>

<div className="row-2">
  <input type="range" className='range' value={length} min={6} max={12} onChange={(e)=>{setLength(e.target.value)}} />
  <label>{length}</label>

  <input type="checkbox"  defaultChecked={numberAllowed} className='switch' onChange={()=>{
    setNumberAllowed((prev)=>!prev)
  }}/>
  <label>Numbers</label>
  

  <input type="checkBox"  className='switch' defaultChecked={specialCharAllowed} onChange={()=>{setCharAllowed((prev)=>!prev)}} />

  <label >Special Characters</label>
  



</div>
      
      </div>
    </>
  )
}

export default App;
