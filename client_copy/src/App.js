import React,{useState,useEffect,useMemo} from 'react';
import Container from 'react-bootstrap/Container';

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
  
  const [typeRequest,setTypeRequest] = useState()
  sessionStorage.setItem('typeRequest',typeRequest)
  

  //install dataContext
 
  const globalContext={
    "scene":{scene,setScene},
    "typeRequest":{typeRequest,setTypeRequest},
  }

  //instal qurey
  useMemo(async ()=>{
    console.log('useMemo App')
    
    // let {data} = await axios.get('http://cherdak.fun:3001/api/price/full')
    
    // GlobalContext.price.setPrice(data)
    
    
    // let {data: res2} = await axios.get('http://cherdak.fun:3001/api/asset')
    // GlobalContext.assetLimit.setAssetLimit(res2)
    
    // let {data: res3} = await axios.get('http://cherdak.fun:3001/api/paytypes')
    // GlobalContext.typePayList.setTypePayList(res3)


    // async function getPrice(){
    //   let {data} = await axios.get('http://cherdak.fun:3001/api/price/full')
    //   //console.log(data)
    //   //sessionStorage.setItem('price',JSON.stringify(data))
    //   GlobalContext.price.setPrice(data)
    // }

    // setInterval(getPrice,3000)
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
        {getScene()}
      </Container>
    </GlobalContext.Provider>


  );
}

export default App;
