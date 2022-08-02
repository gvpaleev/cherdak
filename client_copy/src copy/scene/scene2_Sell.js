import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import smiley from "../img/smiley.png"
import NavBar from '../component/NavBar.js'

import InputFiat from '../component/sc2/InputFiat.js'
import InputConatact from '../component/sc2/InputConatact.js'
import InputComment from '../component/sc2/InputComment.js'
import SelectCity from '../component/sc2/SelectCity.js'
import ModalWindow from '../component/ModalWindow.js'

import Scene2SellContext from '../context/Scene2SellContext.js'
import GlobalContext from '../context/GlobalContext.js'
import React,{useContext,useState,useEffect,useLayoutEffect} from 'react';

export default function Scene2_Sell(){
    console.log('Render Scene2_Sell')
    let is_cash = sessionStorage.getItem('is_cash')
    let globalContext = useContext(GlobalContext) 
    const {scene,setScene} = globalContext.scene
    const {typeRequest,setTypeRequest} = globalContext.typeRequest
  
    let scene2Context={
  }
    return(
        <Scene2SellContext.Provider value={scene2Context}>
<Container style={{height: '20%'}}>
        
        <Row style={{paddingTop:"5vh"}}>
          <div className="d-flex justify-content-center">
            <h1><b onClick={()=>{
              setScene(0);
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
                {Number(is_cash)?<SelectCity/>:<InputFiat/>}
              </div>
          </Col>
        </Row>
        <Row>
          <Col>
              <div className="d-flex justify-content-center">
                <InputConatact/>
              </div>
          </Col>
        </Row>
        <Row>
          <Col>
              <div className="d-flex justify-content-center">
                <InputComment/>
              </div>
          </Col>
        </Row>
        <Row>
              <Col>
                  <div className="d-flex justify-content-center">
                   <ModalWindow/>
                  </div>
              </Col>
        </Row>
      </Container>
    </Container>
      </Scene2SellContext.Provider>
    )
}