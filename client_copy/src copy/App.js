import React,{useState,useEffect,useMemo} from 'react';
import Container from 'react-bootstrap/Container';

import Loader from './scene/loader.js'
import Scene0 from './scene/scene0.js'
import Scene1 from './scene/scene1.js'
import Scene2_Buy from './scene/scene2_Buy'
import Scene2_Sell from './scene/scene2_Sell'
import Scene3 from './scene/scene3.js'

//GlobalContext
import GlobalContext from './context/GlobalContext.js'


import axios from "axios";

function App() {
  console.log('Render APP')
  const [scene,setScene] = useState(0)

  const [loading,setLoading] = useState(true)
  
  const [typeRequest,setTypeRequest] = useState()
  sessionStorage.setItem('typeRequest',typeRequest)
  

 
  const globalContext={
    "scene":{scene,setScene},
    "typeRequest":{typeRequest,setTypeRequest},
    "loading":{loading,setLoading},
  }

  //instal qurey
  useMemo(async ()=>{
    console.log('useMemo App')
    let {data:assetFull} = await axios.get('http://cherdak.fun:3001/api/asset')
    sessionStorage.setItem('assetFull',JSON.stringify(assetFull))

    let {data:payTypeFull} = await axios.get('http://cherdak.fun:3001/api/paytypes')
    sessionStorage.setItem('payTypeFull',JSON.stringify(payTypeFull)) 
   
    let {data:networkFull} = await axios.get('http://cherdak.fun:3001/api/network/full')
    sessionStorage.setItem('networkFull',JSON.stringify(networkFull)) 

    setLoading(false)
  },[])
  
  


  
  function getScene(){
    console.log('getScene')
      switch(globalContext.scene.scene){
        case 0:
          return <Scene0/>
        case 1:
          return  <Scene1/> 
        case 2:
          return typeRequest == 'Buy' ?<Scene2_Buy/>:<Scene2_Sell/> 
        case 3:
          return <Scene3/> 
      }
    
  }

  return (
        
    


    <GlobalContext.Provider value={globalContext}>
    

      <Container style={{height: "100vh"}}>
        {loading?<Loader/>:getScene()}
      </Container>
    </GlobalContext.Provider>


  );
}

export default App;
