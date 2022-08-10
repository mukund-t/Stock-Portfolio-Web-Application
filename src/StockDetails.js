import React, { useState } from 'react';
import './StockDetails.css';
import { Row, Col, Nav, Tab, Button, Form } from "react-bootstrap";
import Summary from './Summary';
import { useStateValue } from './StateProvider';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';



function StockDetails(props) {

  const [{watchlist, funds}, dispatch] = useStateValue();

  const [show, setShow] = useState(false);
  const [modalPrice, setModalPrice] = useState(0);

  const [numberStocks, setNumberStocks] = useState(0);

  const handleChange = (event) => {
    setNumberStocks(event.target.value);
  }

  function buyStock () {

    let quote_url = 'https://finnhub.io/api/v1/quote?symbol='+props.profile.ticker+'&token=calbqdaad3i1fmi0hgc0';
       
    axios.get(quote_url)
    .then(res => {
        var current_pr = res.data.c;

        // console.log("buy stock");

        dispatch({
            type: 'BUY_STOCK',
            item: {
                ticker: props.profile.ticker,
                name: props.profile.name,
                price: current_pr,
                quantity: numberStocks,
                total: numberStocks * current_pr
            }
        });
    });

    setNumberStocks(0);
    setShow(false);
  }

  function handleClose () {
      setNumberStocks(0);
      setShow(false);
    }
  function handleShow () {
    let quote_url = 'https://finnhub.io/api/v1/quote?symbol='+props.profile.ticker+'&token=calbqdaad3i1fmi0hgc0';
        
    axios.get(quote_url)
    .then(res => {
        var current_pr = res.data.c;
        // console.log(current_pr);
        setModalPrice(current_pr);
    });

    (setShow(true));

    }

  function getPrice(){

    let quote_url = 'https://finnhub.io/api/v1/quote?symbol='+props.profile.ticker+'&token=calbqdaad3i1fmi0hgc0';
       
    axios.get(quote_url)
    .then(res => {
        var current_pr = res.data.c;
        // console.log(current_pr);

        dispatch({
            type: 'ADD_WATCHLIST_CONTENT',
            item: {
                ticker: props.profile.ticker,
                name: props.profile.name,
                price: current_pr,
            }
        });
    });
    
  }

  const addWatchlist = () => {
    dispatch({
        type: "ADD_TO_WATCHLIST",
        stock: props.profile.ticker,
    });

    getPrice();
  }

  const removeWatchlist = () => {
    dispatch({
        type: "REMOVE_FROM_WATCHLIST",
        stock: props.profile.ticker,
    });

    dispatch({
        type: "REMOVE_WATCHLIST_CONTENT",
        stock: props.profile.ticker,
    });
  }

    
  return (
    <div className='stock'>
       <div className='stock_details'>
       <div className='stock_details_left'>
                    <div>{props.profile.ticker} </div>
                    <div>{props.profile.name}</div>
                    <div>{props.profile.exchange}</div>

                    <Button variant="primary" onClick={handleShow}>
                        Buy
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>{props.profile.ticker}</Modal.Title>
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
                        <Button variant="secondary" onClick={buyStock}>
                            Buy
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    
                    {watchlist.indexOf(props.profile.ticker) < 0 && <button onClick={addWatchlist}>Add to Watchlist</button>}
                    {watchlist.indexOf(props.profile.ticker) > -1 && <button onClick={removeWatchlist}>Remove from Watchlist</button>}
              </div>

              <div className='stock_details_logo'>
                    <img alt="company logo" src={props.profile.logo}></img>
              </div>

              <div className='stock_details_right'>
                    <div>{props.quote.c}</div>
                    <div>{props.quote.d} ({props.quote.dp}) </div>
                    <div>Timestamp</div>
              </div>

          </div>

          <div className='market_status'>
                Market open
                {watchlist.map(item => (
                        item
                    ))}
          </div>

          <div className='tabs'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="summary">
                <Row>
                    <Nav variant="pills">
                        <Col>
                            <Nav.Item>
                                <Nav.Link eventKey="summary" className='m-auto'>Summary</Nav.Link>
                            </Nav.Item>
                        </Col>
                        <Col>
                            <Nav.Item>
                                <Nav.Link eventKey="news">Top News</Nav.Link>
                            </Nav.Item>
                        </Col>
                        <Col>
                            <Nav.Item>
                                <Nav.Link eventKey="charts">Charts</Nav.Link>
                            </Nav.Item>
                        </Col>
                        <Col>
                            <Nav.Item>
                                <Nav.Link eventKey="insights">Insights</Nav.Link>
                            </Nav.Item>
                        </Col>
                    </Nav>
                </Row>

                <Row>
                    <Tab.Content>
                        <Tab.Pane eventKey="summary">
                            <Summary profile = { props.profile } quote= { props.quote }/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="news">
                            news
                        </Tab.Pane>
                    </Tab.Content>
                </Row>
            </Tab.Container>           
        </div> 
    </div>
  )
}

export default StockDetails
