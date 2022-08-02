import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//import SceneContext from '../component/SceneContext.js'
import React,{useContext} from 'react';


function MyVerticallyCenteredModal(props) {

  function preCheck(){
    let msg=''
    if(sessionStorage.getItem('typeRequest')=='Buy'){
      msg+="Вы покупаете "+sessionStorage.getItem('asset')+': '+sessionStorage.getItem('valueAsset')
    }


    return msg
  }

  //const {scene,setScene} = useContext(SceneContext)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Заявка № 666
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
          {preCheck()}
         
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" >Отмена</Button>
        
          
          
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="outline-dark" size="lg" onClick={() => setModalShow(true)} style={{width: '330px'}}>
        Проверить заявку
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default App;