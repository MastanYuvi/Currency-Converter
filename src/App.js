import React, {useState,useEffect} from 'react';
import CurrencyRow from './CurrencyRow';
import './App.css';
import { fireEvent } from '@testing-library/react';

export default function App() {

  const BASE_URL = "https://api.exchangeratesapi.io/latest";
  const [currency, setCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exhangeRate, setExchangeRate] = useState();
  const [Amount, setAmount] = useState(1);
  const [amountInFromCurrency, setamountInFromCurrency] = useState(true)
  
  let toAmount, fromAmount;
  if(amountInFromCurrency){
    fromAmount = Amount;
    toAmount = Amount * exhangeRate;
  }else{
    toAmount = Amount;
    fromAmount = Amount/ exhangeRate;
  }

  useEffect(() => {
    getCurrenncyRate();
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }  
  })

  const getCurrenncyRate = async () => {

    const response = await fetch(BASE_URL)
    .then(result => result.json())
    .then(data => {
      const FirstCurrency = Object.keys(data.rates)[0];
      setCurrency([data.base, ...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(FirstCurrency);
      setExchangeRate(data.rates[FirstCurrency]);
    })
  }


  const FromAmountChange = (e) => {
    setAmount(e.target.value)
    setamountInFromCurrency(true)
  }

  const ToAmountChange = (e) => {
    setAmount(e.target.value)
    setamountInFromCurrency(false)
  }

  return (
    <div className="Apptoid">
      <h1>Convert</h1>
      <CurrencyRow 
      rates = {currency}
      SelectedCurrency = {fromCurrency}
      OnChangeCurrency = {(e) => setFromCurrency(e.target.value)}
      onchangeAmount = {FromAmountChange}
      amount = {fromAmount}
      />
      <p>=</p>
      <CurrencyRow 
      rates = {currency}
      SelectedCurrency = {toCurrency}
      OnChangeCurrency = {(e) => setToCurrency(e.target.value)}
      amount = {toAmount}
      onchangeAmount = {ToAmountChange}
      />
    </div>
  )
}
