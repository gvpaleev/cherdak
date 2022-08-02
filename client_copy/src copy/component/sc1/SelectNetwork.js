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
  const {network,setNetwork} = scene1Context.network

  const networkFull=typeRequest=='Buy'
                    ?JSON.parse(
                      sessionStorage.getItem('networkFull')
                      ).network_Out[asset]
                    :Object.keys(
                      JSON.parse(
                        sessionStorage.getItem('networkFull')
                        ).network_In[asset]
                    )
          
    
  
  const handleChange = (event) => {
    //setNetworkValue('')
    setNetwork(event.target.value);
    sessionStorage.setItem('network',event.target.value)
  };
  
  return (
    <div>
      <FormControl sx={{ m: 1, width: '330px'}}>
        <InputLabel id="demo-simple-select-autowidth-label"
        sx={{
          color: "black",
          
        }}>{'Сеть'}</InputLabel>
        <Select
         
          value={network}
          onChange={handleChange}
          autoWidth
          label={'Сеть'}
          sx={{
            
          }}
        >
          {networkFull.map((item)=>{
            return <MenuItem key={Math.random()} value={item}>{item}</MenuItem>
          })}
          

        </Select>
      </FormControl>
    </div>
  );
}
