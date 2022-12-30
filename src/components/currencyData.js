import React from 'react';
import { useState, useEffect } from 'react';
import "./currencyData.css"



const api_url = "https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd";



let length;


function CurrencyData(props) {
  const [currency_data, setCurrencyData] = useState([]);
  
  let [refreshState, setRefreshState] = useState(0);

  useEffect(()=>{
      let value = 0;
      let l = props.freshState.length;
      console.log(currency_data)
      for(let i=0; i<l; i++){
        if(props.freshState[i]!==" ")
        value = value + parseFloat(props.freshState[i]||0)*(currency_data[i].metrics.market_data.price_usd).toFixed(2);
      }
      props.newCartValue(value);
  }, [currency_data])

  useEffect(()=>{
    getApiData(api_url);
    console.log("refreshState", refreshState);
  }, [refreshState]);



 function RefreshTable(){
  console.log("refreshState", refreshState);

      if(refreshState==0)
      setRefreshState(1);
      else
      setRefreshState(0);
  }
  

  async function getApiData(url) {
  const response = await fetch(url);
  let apiData = await response.json();
  
  length = apiData.data.length;
  console.log(length);
  let array = [];
  for(let i=0; i<length; i++){
    array.push(" ");
  }

  setCurrencyData(apiData.data);
if(props.freshState.length===0) { props.addState(array)}
}

function updatecart(){
    let value = 0;
      let l = props.freshState.length;
      console.log(currency_data)
      for(let i=0; i<l; i++){
        if(props.freshState[i]!==" ")
        value = value + parseFloat(props.freshState[i]||0)*(currency_data[i].metrics.market_data.price_usd).toFixed(2);
      }
      props.newCartValue(value);
}

function handleChange(key, value){
  let l = props.freshState.length;
  console.log(length);
  /*if(value+props.cartValue>props.walletbalance){
    alert("Insufficient Balance for the entered tokens");
    return;
  }*/
  let array = [];
  for(let i=0; i<length; i++){
    if(i==key){
      console.log("inside");
        array.push(value);
    }
    else if(l==0)
    array.push(" ");
    else
    array.push(props.freshState[i]);
  }
  console.log(key);
  console.log(value);
  console.log("handlechangeCalled");
  console.log(array);
  console.log(props.freshState);
  props.addState(array);
}




  return (  
    <div>
      <button onClick = {()=>RefreshTable()}
       className="button">Refresh Table</button>
      
        <table className='table'>
      <tr>
        <th>Currency name</th>
        <th>Symbol</th>
        <th>CurrentPrice($)</th>
        <th>Tokens wanted</th>
      </tr>
      
      {
        
        (currency_data.map((eachCurrencyData, key) =>{
            
            console.log(props.freshState[key])
            return (
              <tr key = {key}>
                  <td>{eachCurrencyData.slug}</td>
                  <td>{eachCurrencyData.symbol}</td>
                  <td>{(eachCurrencyData.metrics.market_data.price_usd).toFixed(2)}</td>
                  <td>
                    <input type = "number" step="any" className='input' value={props.freshState[key]} onChange={(e)=>handleChange(key, e.target.value) 
                  }  onBlur = {()=>{
                    updatecart()}}/>
                    </td>
              </tr>
            )
        }
        )
        )
      }
    </table>
    </div>
  );
}

export default CurrencyData;