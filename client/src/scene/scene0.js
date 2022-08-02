import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import smiley from "../img/smiley.png"
import NavBar from '../component/NavBar.js'


export default function Scene0(){
    console.log('Render Scene0')
    return(
      <Container style={{paddingTop:"35vh"}}>
        
        <Row >
          <Col>
            <div className="d-flex justify-content-center">
              <h1 ><b>Cherdak.fun</b></h1>
            </div>
          </Col>
        </Row>

        <Row style={{paddingBottom:"1vh"}}>
          <Col>
          
            <div className="d-flex justify-content-center">
              <img src={smiley} style={{width:75}}/>
            </div>
          </Col>
        </Row> 

        <NavBar/>
        

      </Container>
    )
}