import {useEffect, useState} from 'react'
import './App.css'
import {init} from './utils/init'

function App() {
  const [data,setData] = useState(new Map());
  useEffect(()=>{init().then(res=>setData(res))},[])
  console.log(data)
  return (
    <div>
    </div>
  )
}

export default App
