import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
//let data = null;
//(async () => {
//  data = await init()
//  console.log(data)
//})();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
