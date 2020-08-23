import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function CurrencyRow({rates, SelectedCurrency, OnChangeCurrency, amount, onchangeAmount}) {

    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onchangeAmount}/>
            <select value={SelectedCurrency} onChange={OnChangeCurrency}>


                    {rates.map(option => (
                        <option key={uuidv4()} value={option}>{option}</option>
                    ))}
                        
                    
                    
            
                
            </select>
        </div>
    )
}
