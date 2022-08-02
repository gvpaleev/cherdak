import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import smiley from "../img/smiley.png"
import NavBar from '../component/NavBar.js'
import GlobalContext from '../context/GlobalContext.js'
import React,{useContext,useState,useEffect,useLayoutEffect} from 'react';

export default function Scene3(){
    console.log('Render Scene3')
    let globalContext = useContext(GlobalContext) 
    const {scene,setScene} = globalContext.scene
    const {typeRequest,setTypeRequest} = globalContext.typeRequest

    let asset = sessionStorage.getItem('asset')
    let typePay = sessionStorage.getItem('typePay')
    let valueAsset = sessionStorage.getItem('valueAsset')
    let valueFiat = sessionStorage.getItem('valueFiat')
    let addressAsser= sessionStorage.getItem('addressAsser')
    let addressFiat= sessionStorage.getItem('addressFiat')
    let payTypeFull= JSON.parse(sessionStorage.getItem('payTypeFull'))
    let networkFull= JSON.parse(sessionStorage.getItem('networkFull'))
    let network= sessionStorage.getItem('network')
    let contact = sessionStorage.getItem('contact')
    let comment = sessionStorage.getItem('comment')
    let city = sessionStorage.getItem('city')
    let is_cash = Number(sessionStorage.getItem('is_cash'))

    return(
      // 'После получения средств, вам в телеграм '+contact+
      //         " напишит оператор обменика, в диалоге вы определитесь с общественным местом для передачи "
      //         +valueFiat+" RUB"
        <>
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
    <Container style={{height: '70%',overflowY: 'scroll',overflow:'hidden'}} className="d-flex align-items-center">
      <Container>
      <Row>
          <Col>
              <div className="d-flex justify-content-center">
                <h5>
                {'Заявка № 666 принята'}
                </h5>
              </div><br/><br/>
          </Col>
        </Row>
        <Row>
          <Col>
              <div className="d-flex justify-content-center"><h6>
                {typeRequest=='Buy'
                ?"В ближайшее время вам в телеграм "+contact+
                " напишит оператор обменика, в диалоге вы определитесь с общественным местом для передачи "
                +valueFiat+" RUB"
                :'Переведите '+valueAsset+' '+asset+' сеть '+network
                }
                </h6>
              </div>
          </Col>
        </Row>
        <Row>
          <Col >
             
              <div style={{wordWrap:'break-word',textAlign : 'center'}}>
              {typeRequest=='Buy'
                ?null
                :networkFull.network_In[asset.toUpperCase()][network.toUpperCase()]
                }
                </div>
              
          </Col>
        </Row>
        <Row>
          <Col>
          <div style={{wordWrap:'break-word',textAlign : 'center'}}><br/><h6>
            
              {
                typeRequest=='Buy'
                ?'После получения средств, вам будет зачислено'
                :'После получения средств, вам в телеграм '+contact+
                  " напишит оператор обменика, в диалоге вы определитесь с общественным местом для передачи "
                  +valueFiat+" RUB"
              }
              
            </h6>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{wordWrap:'break-word',textAlign : 'center'}}>
                
                {
                  typeRequest=='Buy'
                  ?valueAsset+' '+asset+' сеть '+network
                  :null
                }
                
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
          <div style={{wordWrap:'break-word',textAlign : 'center'}}>
          {
                  typeRequest=='Buy'
                  ?addressAsser
                  :addressFiat
                }
          </div>
          </Col>
        </Row>
        <Row>
          <Col>
          <br/><br/>
          <div style={{wordWrap:'break-word',textAlign : 'center'}}>
          <h5>
            {"Спасибо за доверия!"}
            </h5>
          </div>
          </Col>
        </Row>
        
      </Container>
    </Container>
    </>
    )
}