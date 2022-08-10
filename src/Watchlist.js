import React, { useState, useEffect } from 'react';
import { useStateValue } from './StateProvider';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "./Watchlist.css";

function Watchlist() {

  const [{ watchlist_content}, dispatch] = useStateValue();

  function update() {
    
    for(let i=0; i<watchlist_content.length; i++){

      let quote_url = 'https://finnhub.io/api/v1/quote?symbol='+watchlist_content[i]['ticker']+'&token=calbqdaad3i1fmi0hgc0';
       
      axios.get(quote_url)
      .then(res => {
          var percent_change = (res.data.c - watchlist_content[i]['price']) / watchlist_content[i]['price'];
          var price_change = res.data.c - watchlist_content[i]['price'];
          // console.log(current_pr);
          watchlist_content[i]['percent_change'] = percent_change; 
          watchlist_content[i]['price_change'] = price_change; 
          watchlist_content[i]['current_price'] = res.data.c; 

          dispatch({
            type: 'UPDATE_WATCHLIST_CONTENT',
            item: {
                watchlist_cont: watchlist_content
              }
          });
      });
      }
      // console.log(watchlist_content);
    
  }

  useEffect(() => {
    const interval = setInterval(() => {
      update(); console.log("Updating");
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='watchlist'>
      <h2><strong>My Watchlist</strong></h2>
        {watchlist_content?.map(item => (
          <div class='watchlist_item'>
            <Card>
              <Card.Body>
                <Container>
                    <Row>
                      <Col>{item.ticker}</Col>
                      <Col style={{display: 'flex', flex: 1, justifyContent: 'right'}}>{item.current_price}</Col>
                    </Row>
                    <Row>
                      <Col>{item.name}</Col>
                      <Col style={{display: 'flex', flex: 1, justifyContent: 'right'}}>{item.price_change} ({item.percent_change}%)</Col>
                    </Row>
                  </Container>
                
              </Card.Body>
            </Card>

            {/* {item.ticker}
            {item.percent_change}
            {item.price_change}
            {item.current_price} */}
          </div>
        ))}
    </div>
  )
}

export default Watchlist