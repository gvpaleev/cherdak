import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import smiley from "../img/smiley.png"
import NavBar from '../component/NavBar.js'


export default function Loader(){
    console.log('Render Loader')
    return(
      <Container style={{paddingTop:"35vh"}}>
        
        <Row >
          <Col>
            <div className="d-flex justify-content-center">
              <h1 ><b>Loading...</b></h1>
            </div>
          </Col>
        </Row>

      </Container>
    )
}