import React from 'react';
import { useState, useEffect } from 'react';
import CurrencyData from './components/currencyData'; 

import './App.css';

const api_url = "https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd";





function App() {
  const [state, setState] = useState({cartvalue:0, walletbalance:1000, freshState:[]});
  



  function transaction(){
      let length = state.freshState.length;
      let array = [];
      for(let i=0; i<length; i++){
          array.push(" ");
      }
      if (parseFloat(state.cartvalue)<=parseFloat(state.walletbalance)){
        
          alert("Transaction completed");
          setState({cartvalue:0, walletbalance:state.walletbalance-state.cartvalue, freshState:array});
      }
      else{
        console.log("insideInsufficient")
        console.log(state.cartValue)
        console.log(state.walletbalance)
        setState({ ...state,cartvalue:0,walletbalance:state.walletbalance, freshState:array});
        alert("Insufficient Balance")
             
      }
    
  }

  function addstate(Array){
    console.log("called Add state");
    console.log(Array);
    setState({...state, freshState:Array})
  }

  function addToCart(value){
      console.log("cart");
      console.log(state.freshState);
      setState({...state, cartvalue: state.cartvalue+value});
  }

  function newCartValue(value){
    console.log("newcartcalled");
    console.log(state.freshState);
    setState({...state, cartvalue: value});
  }



  return (
  <div className='app-container'>
    <div className='cart-container'>
        <div>{`Cart Value:${state.cartvalue}($)`}</div>
        <div>{`Wallet Balance:${state.walletbalance}($)`}</div>
        <button className='button' onClick={()=>transaction()}>BUY NOW</button>
    </div>
    <CurrencyData addToCart = {(value)=>{addToCart(value)}} newCartValue = {(value)=>newCartValue(value)} cartValue = {state.cartvalue} walletbalance = {state.walletbalance}  freshState = {state.freshState} addState = {(array) => addstate(array)}/>
    </div>
  );
}

export default App;
