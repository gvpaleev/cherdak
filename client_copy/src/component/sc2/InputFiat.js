import React,{useContext,useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



import DataContext from '../../context/GlobalContext.js'
import Scene2BuyContext from '../../context/Scene2BuyContext.js'
import Scene1Context from '../../context/Scene1Context.js'

export default function ImputAsset() {
  
  //console.log(setFlagCalc)
  let dataContext = useContext(DataContext) 
  const {scene,setScene} = dataContext.scene
  const {typeRequest,setTypeRequest} = dataContext.typeRequest
  // let scene1Context = useContext(Scene1Context) 
  // const {asset,setAsset} = scene1Context.asset
  // const {typePay,setTypePay} = scene1Context.typePay
  // const {assetLimit,setAssetLimit} = scene1Context.assetLimit
  // const {price,setPrice} = scene1Context.price

  // const {valueAsset,setValueAsset} = scene1Context.valueAsset
  // const {valueFiat,setValueFiat} = scene1Context.valueFiat

  


 
    
    
    
    function handleChange(event){
      //console.log(event.target.value)
      // setFlagCalc(0)
      //setValueAsset(event.target.value)
      // setFlagCalc('asset')

    }

    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '330px' },
        }}
        noValidate
        autoComplete="off"
      >
       
        <TextField
          label={'Номер карты '+sessionStorage.getItem('typePay')}
          placeholder='Введите значение'
          multiline
          onChange={handleChange}
        />
      
      </Box>
    );
  }