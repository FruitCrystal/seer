import {useEffect, useState} from 'react'
import './App.css'
import {init} from './utils/init'
import Loading from './components/Loading/Loading';
import  {PROGRESS_MAP} from './interface/iData';
import {Home} from './page/Home/Home';


function App() {
  const [data,setData]=useState(new Map());
  useEffect(()=>{init(setProgress).then(res=>{setData(res);});},[])
  const [progress, setProgress] = useState({item:'',index:0});
  return (
    <div>
      {progress.index!=17? <Loading width={progress.index*20} item={PROGRESS_MAP.get(progress.item) as string}></Loading> : <Home version={data.get('version')} monsterBrief={data.get('petbook')} monsterDetail={data.get('monsters')}></Home>}
    </div>
  )
}

export default App
