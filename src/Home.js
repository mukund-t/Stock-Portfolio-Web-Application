import React, { useState } from 'react';
import './Home.css';
import { Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import StockDetails from './StockDetails';

// calbqdaad3i1fmi0hgc0

function Home() {
  
    // const [search_val, setSearchVal] = useState('');
    const [profile, setProfile] = useState({});
    const [quote, setQuote] = useState({});

    const [textInput, setTextInput] = useState('');

    function handleSubmit(){
        // console.log('Your input value is: ' + this.state.search_val)
        let profile_url = 'https://finnhub.io/api/v1/stock/profile2?symbol='+textInput+'&token=calbqdaad3i1fmi0hgc0';
        
        axios.get(profile_url)
        .then(res => {
            const prof = res.data;
            setProfile(prof);
        });

        let quote_url = 'https://finnhub.io/api/v1/quote?symbol='+textInput+'&token=calbqdaad3i1fmi0hgc0';
        
        axios.get(quote_url)
        .then(res => {
            const quot = res.data;
            setQuote(quot);
        });
        
    }

    const handleChange = (event) => {
        setTextInput(event.target.value);
      }


  return (
        <div className='home'>
            <div className='home_text'>
                STOCK SEARCH
            </div>
            <div className='home_form'>
                <Form className='home_form' >
                    <FormControl type="text" className="form-control" onChange={handleChange} placeholder='Enter stock ticker symbol'/>
                    <Button className="btn btn-primary btn-large form_button" 
                     onClick={handleSubmit}>Search</Button>
                </Form>
                <StockDetails profile = { profile } quote = { quote }/>
            </div>
        </div>
  )
}


export default Home