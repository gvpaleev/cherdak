import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Container from 'react-bootstrap/Container';

import NavBar from '../component/NavBar.js'
import SelectAsset from '../component/sc1/SelectAsset.js'
import SelectTypePay from '../component/sc1/SelectTypePay.js'
import SelectNetwork from '../component/sc1/SelectNetwork.js'
import InputAsser from '../component/sc1/InputAsser.js'
import InputFiat from '../component/sc1/InputFiat.js'

import Button from 'react-bootstrap/Button';

import GlobalContext from '../context/GlobalContext.js'
import Scene1Context from '../context/Scene1Context.js'

import React,{useContext,useState,useEffect,useLayoutEffect} from 'react';

import axios from "axios";

export default function Scene1(){

   
  //Флаг налички

  console.log('Render Scene1')

  let globalContext = useContext(GlobalContext) 
  const {scene,setScene} = globalContext.scene
  const {typeRequest,setTypeRequest} = globalContext.typeRequest

  sessionStorage.setItem('addressAsser','')
  sessionStorage.setItem('addressFiat','')
  sessionStorage.setItem('city','')


  const [asset,setAsset] = useState('')
  sessionStorage.setItem('asset',asset)
  const [network,setNetwork] = useState('')
  sessionStorage.setItem('network',network)
  const [typePay,setTypePay] = useState('')
  sessionStorage.setItem('typePay',typePay)
  const [price,setPrice] = useState('')

  //sessionStorage.setItem()
  const [valueAsset,setValueAsset] = useState('')
  sessionStorage.setItem('valueAsset',valueAsset)
  const [valueFiat,setValueFiat] = useState('')
  sessionStorage.setItem('valueFiat',valueFiat)


  

  const [flagInput,setFlagInput] = useState(false)
  const [flagCalc,setFlagCalc] = useState(-1)

  let scene1Context={
    "asset":{asset,setAsset},
    "network":{network,setNetwork},
    "typePay":{typePay,setTypePay},
    "price":{price,setPrice},
    "valueAsset":{valueAsset,setValueAsset},
    "valueFiat":{valueFiat,setValueFiat}

  }
  
  
  //Loading...
  useEffect(()=>{

    let getPrice = async()=>{
      let {data: res1} = await axios.get('http://cherdak.fun/api/price/full')
      setPrice(res1)
      sessionStorage.setItem('price',JSON.stringify(res1))
    }

    getPrice()
     let timeId = setInterval(getPrice,3000)
    return ()=>{
      clearInterval(timeId)
    }
  },[])

    useEffect(()=>{
      if(asset && typePay){
        
        setFlagInput(true)
        
      }else{
        setFlagInput(false)
      }
    },[asset,typePay])
    

    //calcAvto
    useEffect(()=>{

      function autoAsset(){
        let count = valueFiat/price[
          typeRequest=='Buy'?'sell':'buy'
        ][asset.toLowerCase()] 
        
        switch(asset){
          case 'USDT':
            setValueAsset(count.toFixed(2))
            break;
          default:
            setValueAsset(count.toFixed(9))
        }
        
        
      }
      function autoFiat(){
        let count = valueAsset*price[
          typeRequest=='Buy'?'sell':'buy'
        ][asset.toLowerCase()] 

        setValueFiat(count.toFixed(2))
      } 
      let timeId;
      if(flagCalc=='asset'){
        autoFiat()
        timeId = setInterval(autoFiat,3000)
      }
      if(flagCalc=='fiat'){
        autoAsset()
        timeId = setInterval(autoAsset,3000)
      }

      return ()=>{
        clearInterval(timeId)
      }
    },[flagCalc,valueAsset,valueFiat,price,typeRequest])

    function onClickButton(){
      setScene(2)
    }

    return(
      <Scene1Context.Provider value={scene1Context}>
        <Container style={{height: '20%'}}>
        
            <Row style={{paddingTop:"5vh"}}>
              <div className="d-flex justify-content-center">
                <h1><b onClick={()=>{
                  setScene(0);
                  setAsset('');
                  setTypePay('');
                  setTypePay();
                  }}>Cherdak.fun</b></h1>
              </div>
            </Row>
          <NavBar />  
        </Container>
        <Container style={{height: '70%',overflowY: 'scroll',overflow:'hidden'}} className="d-flex align-items-center">
          <Container>
            
            <Row>
              <Col>
                  <div className="d-flex justify-content-center">
                    {
                      <SelectAsset/>
                    }
                  </div>
              </Col>
            </Row>
            <Row>
              <Col>
                  <div className="d-flex justify-content-center">
                    {
                      
                      asset?<SelectNetwork/>:null
                    }
                  </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex justify-content-center">
                {
                  flagInput
                    ?<InputAsser setFlagCalc={setFlagCalc}/>              
                    :null
                }
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-flex justify-content-center">
                    {
                      <SelectTypePay/>
                    }
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
              <div className="d-flex justify-content-center">
                { 
                  flagInput
                    ?<InputFiat setFlagCalc={setFlagCalc} />              
                    :null
                 
                }
              </div>
              </Col>
            </Row>
            <Row>

              <Col>
              <div style={{display:flagInput?"block":'none'}}>
                <div className="d-flex justify-content-center">
                  <Button variant="outline-dark" size="lg" onClick={onClickButton}style={{width:'100vh', maxWidth: 330}}>Далее</Button>
                </div>
              </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </Scene1Context.Provider>
    )
}