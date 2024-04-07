import {useEffect, useState} from 'react'
import './App.css'
import {init} from './utils/init'
import Loading from './components/Loading/Loading';
import  {PROGRESS_MAP} from './interface/iData';
import {Pet} from './page/Pet';

function App() {
  const [data,setData]=useState(new Map());
  useEffect(()=>{init(setProgress).then(res=>{setData(res);});},[])
  const [progress, setProgress] = useState({item:'',index:0});
  return (
    <div>
      {progress.index!=17? <Loading width={progress.index*20} item={PROGRESS_MAP.get(progress.item) as string}></Loading> : <Pet pets={data.get('monsters')}></Pet>}
      <p style={{margin:0,fontSize: '10px',position:'absolute',right:0,bottom:0}}>版本号：{data.get('version')}</p>
    </div>
  )
}

export default App
