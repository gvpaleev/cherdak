import React,{useContext} from 'react';

import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';


import GlobalContext from '../context/GlobalContext.js'




export default function NavBar() {
  console.log('Render NavBar')
  let globalContext = useContext(GlobalContext) 
 
  const {scene,setScene} = globalContext.scene
  const {typeRequest,setTypeRequest} = globalContext.typeRequest

  return (
    <Stack direction="row" spacing={2} className="d-flex justify-content-center">
      <Button variant="outline-dark" size="lg" onClick={
          ()=>{
            setScene(1);
            sessionStorage.setItem('type','Buy');
            setTypeRequest('Buy');

          }
        } style={{width:'100vh', maxWidth: 400}}>Купить</Button>
      <Button variant="outline-dark" size="lg" onClick={
        ()=>{
            setScene(1);
            sessionStorage.setItem('type','Sell');
            setTypeRequest('Sell');

          }
        } style={{width:'100vh', maxWidth: 400}}>Продать</Button>
    </Stack>
  );
} 
