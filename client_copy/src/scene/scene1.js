import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Container from 'react-bootstrap/Container';

import NavBar from '../component/NavBar.js'
import SelectAsset from '../component/sc1/SelectAsset.js'
import SelectTypePay from '../component/sc1/SelectTypePay.js'
import InputAsser from '../component/sc1/InputAsser.js'
import InputFiat from '../component/sc1/InputFiat.js'

import Button from 'react-bootstrap/Button';

import GlobalContext from '../context/GlobalContext.js'
import Scene1Context from '../context/Scene1Context.js'

import React,{useContext,useState,useEffect,useLayoutEffect} from 'react';

import axios from "axios";

export default function Scene1(){

   

  console.log('Render Scene1')

  let globalContext = useContext(GlobalContext) 
  const {scene,setScene} = globalContext.scene
  const {typeRequest,setTypeRequest} = globalContext.typeRequest


  const [asset,setAsset] = useState('')
  sessionStorage.setItem('asset',asset)
  const [typePay,setTypePay] = useState('')
  sessionStorage.setItem('typePay',typePay)
  const [price,setPrice] = useState('')
  //sessionStorage.setItem()
  const [valueAsset,setValueAsset] = useState('')
  sessionStorage.setItem('valueAsset',valueAsset)
  const [valueFiat,setValueFiat] = useState('')
  sessionStorage.setItem('valueFiat',valueFiat)

  const [assetLimit,setAssetLimit] = useState(['Перезагрузи'])
  //sessionStorage.setItem()
  const [typePayList,setTypePayList] = useState(['Перезагрузи'])
  

  const [flagInput,setFlagInput] = useState(false)
  const [flagCalc,setFlagCalc] = useState(-1)

  let scene1Context={
    "asset":{asset,setAsset},
    "typePay":{typePay,setTypePay},
    "price":{price,setPrice},
    "valueAsset":{valueAsset,setValueAsset},
    "valueFiat":{valueFiat,setValueFiat},
    "assetLimit":{assetLimit,setAssetLimit},
    "typePayList":{typePayList,setTypePayList}
  }
  
  
  //Loading...
  useEffect(()=>{
    let install = async ()=>{
      

      let {data: res2} = await axios.get('http://cherdak.fun:3001/api/asset')
      setAssetLimit(res2)

      let {data: res3} = await axios.get('http://cherdak.fun:3001/api/paytypes')
      setTypePayList(res3)
      
      
    }
    let getPrice = async()=>{
      let {data: res1} = await axios.get('http://cherdak.fun:3001/api/price/full')
      setPrice(res1)
    }

    install()
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
      console.log(
        '______________________________________________'
      )
      function autoAsset(){
        setValueAsset(valueFiat/price[typeRequest.toLowerCase()][asset.toLowerCase()] )
      }
      function autoFiat(){
        setValueFiat(valueAsset*price[typeRequest.toLowerCase()][asset.toLowerCase()] )
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
    },[flagCalc,valueAsset,valueFiat,price])

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
        <Container style={{height: '60%'}} className="d-flex align-items-center">
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