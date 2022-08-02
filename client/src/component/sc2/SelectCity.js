import React,{useState,useEffect,useContext} from 'react';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TypePayContext from '../../context/TypePayContext.js';
import TypeContext from '../../context/TypeContext.js';
import axios from "axios";

import DataContext from '../../context/GlobalContext.js'
import Scene1Context from '../../context/Scene1Context.js'






export default function SelectCity() {
  let dataContext = useContext(DataContext) 
  const {typeRequest,setTypeRequest} = dataContext.typeRequest
  const [city,setCity] = useState('')
  
  const cityFull=
  JSON.parse(sessionStorage.getItem('payTypeFull'))['Наличные']['city']
  console.log(city)

  const handleChange = (event) => {
    setCity(event.target.value)
    sessionStorage.setItem('city',event.target.value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1,width: '330px'}}>
        <InputLabel id="demo-simple-select-autowidth-label" sx={{
            color: "black",
            
          }} >{`Город ${typeRequest=='Buy'?'отдачи наличных':'получения наличных'}`}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={city}
          onChange={handleChange}
          autoWidth
          label={`Город ${typeRequest=='Buy'?'отдачи наличных':'получения наличных'}`}
          sx={{
            color: "black",
            borderColor:"black"
          }}
        >
          {cityFull.map((item)=>{
            return <MenuItem key={Math.random()} value={item}>{item}</MenuItem>
          })}
          

        </Select>
      </FormControl>
    </div>
  );
}
