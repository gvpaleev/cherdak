import React,{useState,useEffect,useContext} from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import axios from "axios";
import DataContext from '../../context/GlobalContext.js'
import Scene1Context from '../../context/Scene1Context.js'

export default  function SelectAsset() {
  
  let dataContext = useContext(DataContext) 
  let scene1Context = useContext(Scene1Context) 
 

  const {typeRequest,setTypeRequest} = dataContext.typeRequest
  const {asset,setAsset} = scene1Context.asset
  const {typePay,setTypePay} = scene1Context.typePay


  
  const {assetLimit,setAssetLimit} = scene1Context.assetLimit

  
  
  const handleChange = (event) => {
    setAsset(event.target.value);
  };
  
  return (
    <div>
      <FormControl sx={{ m: 1, width: '330px'}}>
        <InputLabel id="demo-simple-select-autowidth-label"
        sx={{
          color: "black",
          
        }}>{typeRequest=='Buy'?"Получаете":"Отдаёте"}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={asset}
          onChange={handleChange}
          autoWidth
          label={typeRequest=='Buy'?"Получаете":"Отдаёте"}
          sx={{
            
          }}
        >
          {Object.keys(assetLimit).map((item)=>{
            return <MenuItem key={Math.random()} value={item}>{item}</MenuItem>
          })}
          

        </Select>
      </FormControl>
    </div>
  );
}
