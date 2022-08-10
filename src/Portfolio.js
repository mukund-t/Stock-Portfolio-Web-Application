import React, { useState, useEffect } from 'react';
import { useStateValue } from './StateProvider';
import axios from "axios";
import './Portfolio.css';
import { Card, Button, Form } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';


function Portfolio() {

  const [{portfolio, portfolio_stocks, funds}, dispatch] = useStateValue();

  const [show, setShow] = useState(false);
  const [modalPrice, setModalPrice] = useState(0);
  const [numberStocks, setNumberStocks] = useState(0);

  const handleChange = (event) => {
    setNumberStocks(event.target.value);
  }

  function handleClose () {
    setNumberStocks(0);
    setShow(false);
  }

  function buyStock (profile) {

    let quote_url = 'https://finnhub.io/api/v1/quote?symbol='+profile.ticker+'&token=calbqdaad3i1fmi0hgc0';
       
    axios.get(quote_url)
    .then(res => {
        var current_pr = res.data.c;

        // console.log("buy stock");

        dispatch({
            type: 'BUY_STOCK',
            item: {
                ticker: profile.ticker,
                name: profile.name,
                price: current_pr,
                quantity: numberStocks,
                total: numberStocks * current_pr
            }
        });
    });

    setNumberStocks(0);
    setShow(false);
  }

  function handleShow (profile) {
    let quote_url = 'https://finnhub.io/api/v1/quote?symbol='+profile.ticker+'&token=calbqdaad3i1fmi0hgc0';
        
    axios.get(quote_url)
    .then(res => {
        var current_pr = res.data.c;
        // console.log(current_pr);
        setModalPrice(current_pr);
    });

    (setShow(true));

    }

  // const [temp, setTemp] = useState([]);
  
  window.onload = function() {
    setInterval(function() {
      console.log("Interval");
    }, 2000);
  }

  function update(){
    
    console.log(portfolio);
    console.log(portfolio_stocks);
    for (let j=0;j<portfolio_stocks.length;j++) {
      let quant = 0;
      let tot_cost = 0;
      for(let i=0;i<portfolio.length;i++){
        if(portfolio[i].ticker===portfolio_stocks[j].ticker){
          quant = quant+parseInt(portfolio[i].quantity);
          tot_cost = tot_cost+portfolio[i].total;
        }
      }
      // console.log(quant, tot_cost);

      let current_pr = 0;
      let change_per = 0;
      let quote_url = 'https://finnhub.io/api/v1/quote?symbol='+portfolio_stocks[j].ticker+'&token=calbqdaad3i1fmi0hgc0';
      axios.get(quote_url)
      .then(res => {
          current_pr = res.data.c;
          change_per = ((current_pr*quant) - tot_cost) / tot_cost;
          portfolio_stocks[j]= {ticker:portfolio_stocks[j].ticker, name:portfolio_stocks[j].name, avg_cost:tot_cost/quant, quantity:quant, total_cost:tot_cost, current_price:current_pr, market_value:current_pr*quant, change_percent:change_per};
          // setTemp(portfolio_stocks);
          dispatch({
            type: 'UPDATE_PORTFOLIO_STOCKS',
            item: {
                portfolio_stocks: portfolio_stocks,
                portfolio: portfolio
              }
          });
      });

    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      update(); console.log("Updating");
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='portfolio'>
      
      <h2><strong>My Portfolio</strong></h2>
      <div>Money in Wallet: ${funds}</div>
        {portfolio_stocks?.map(item => (
          <div>
            <Card>
              <Card.Header><span><strong>{item.ticker}</strong> {item.name}</span></Card.Header>
              <Card.Body>
                <Card.Text>
                  <Container>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col style={{display: 'flex', flex: 1, justifyContent: 'right'}}>{item.quantity}</Col>
                      <Col>Change:</Col>
                      <Col style={{display: 'flex', flex: 1, justifyContent: 'right'}}>{item.change_percent}</Col>
                    </Row>
                    <Row>
                      <Col>Avg. Cost / Share:</Col>
                      <Col style={{display: 'flex', flex: 1, justifyContent: 'right'}}>{item.avg_cost}</Col>
                      <Col>Current Price:</Col>
                      <Col style={{display: 'flex', flex: 1, justifyContent: 'right'}}>{item.current_price}</Col>
                    </Row>
                    <Row>
                      <Col>Total Cost:</Col>
                      <Col style={{display: 'flex', flex: 1, justifyContent: 'right'}}>{item.total_cost}</Col>
                      <Col>Market Value:</Col>
                      <Col style={{display: 'flex', flex: 1, justifyContent: 'right'}}>{item.market_value}</Col>
                    </Row>
                  </Container>
                  
                </Card.Text>
                
              </Card.Body>
              <Card.Footer>
                  <Button variant="primary" onClick={() => handleShow(item)}>
                      Buy
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                      <Modal.Title>{item.ticker}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Form>
                          
                          <div>Current Price: {modalPrice}</div>
                          <div>Money in Wallet: {funds}</div>
                          <p>Quantity:</p>
                          <input type="number" onChange={handleChange} ></input>
                  
                      </Form>
                      </Modal.Body>
                      <Modal.Footer>
                      <div>Total: {modalPrice * numberStocks}</div>
                      <Button variant="secondary" onClick={() => buyStock(item)}>
                          Buy
                      </Button>
                      </Modal.Footer>
                  </Modal>

                <Button variant="primary">Sell</Button>
              </Card.Footer>
            </Card>
          </div>
            // <div>
            //   <div>{item.ticker}</div>
            //   <div>{item.avg_cost}</div>
            //   <div>{item.quantity}</div>
            //   <div>{item.current_price}</div>
            //   <div>{item.market_value}</div>
            // </div>
        ))}

    </div>
  )
}

export default Portfolio