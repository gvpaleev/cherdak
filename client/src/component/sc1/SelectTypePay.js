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






export default function TypePay() {
  let dataContext = useContext(DataContext) 
  let scene1Context = useContext(Scene1Context)
  const {typeRequest,setTypeRequest} = dataContext.typeRequest

  const {asset,setAsset} = scene1Context.asset
  const {typePay,setTypePay} = scene1Context.typePay

  const payTypeFull=JSON.parse(sessionStorage.getItem('payTypeFull'))
  // const [typePay, setTypePay] = React.useState('');

  const [select,setSelect] = useState([])

  const handleChange = (event) => {
    if(event.target.value=='Наличные'){
      sessionStorage.setItem('is_cash',1)
    }else{
      sessionStorage.setItem('is_cash',0)
    }
    setTypePay(event.target.value);
    //sessionStorage.setItem('typePay',event.target.value)
  };

  return (
    <div>
      <FormControl sx={{ m: 1,width: '330px'}}>
        <InputLabel id="demo-simple-select-autowidth-label" sx={{
            color: "black",
            
          }} >{typeRequest=='Sell'?"Получаете":"Отдаёте"}</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={typePay}
          onChange={handleChange}
          autoWidth
          label={typeRequest=='Sell'?"Получаете":"Отдаёте"}
          sx={{
            color: "black",
            borderColor:"black"
          }}
        >
          {Object.keys(payTypeFull).map((item)=>{
            return <MenuItem key={Math.random()} value={item}>{item}</MenuItem>
          })}
          {/* <MenuItem value={'Сбербанк'}>Сбербанк</MenuItem>
          <MenuItem value={'Тиньков'}>Тиньков</MenuItem>
          <MenuItem value={'QIWI'}>QIWI</MenuItem>
          <MenuItem value={'YandexMoney'}>YandexMoney</MenuItem> */}

        </Select>
      </FormControl>
    </div>
  );
}
