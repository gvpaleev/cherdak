import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import GlobalContext from '../context/GlobalContext.js'
import React,{useContext} from 'react';


function MyVerticallyCenteredModal(props) {
  let globalContext = useContext(GlobalContext) 
  const {scene,setScene} = globalContext.scene
  const {typeRequest,setTypeRequest} = globalContext.typeRequest

  let asset = sessionStorage.getItem('asset')
  let typePay = sessionStorage.getItem('typePay')
  let valueAsset = sessionStorage.getItem('valueAsset')
  let valueFiat = sessionStorage.getItem('valueFiat')
  let addressAsser= sessionStorage.getItem('addressAsser')
  let addressFiat= sessionStorage.getItem('addressFiat')
  let network= sessionStorage.getItem('network')
  let contact = sessionStorage.getItem('contact')
  let comment = sessionStorage.getItem('comment')
  
  function onCancel(){
    setScene(0)
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
       
      
        <h6>{`Вы ${typeRequest=='Buy'?'покупаете:':'продаете:'} ${valueAsset} ${asset}`}</h6>
        <h6>{`Вы ${typeRequest=='Buy'?'отдаете:':'получаете:'} ${valueFiat} RUB ${typePay}`}</h6>  
        {/* ${Array.from(addressAsser).join(' ')} */}
        <s>Пробелы для простоты проверки 👇🏻</s>
        <h6>{typeRequest=='Buy'
          ?`Адрес пополнения ${asset} сеть ${network}: ${Array.from(addressAsser).join(' ')}`
          :`Адрес пополнения ${typePay}: ${Array.from(addressFiat).join(' ')}`}</h6>
        
        <h6>{`Телеграмм для связи: ${contact}`}</h6>
        <h6>{`Коментарий: ${comment}`}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={onCancel}>Отмена</Button>
        
          
          
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