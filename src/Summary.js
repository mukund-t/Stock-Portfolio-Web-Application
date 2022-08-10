import React, { Component } from 'react'

function Summary(props) {
  return (
    <div className='summary'>
          <div className='summary_left'>
            <div className='summary_left_prices'>
                <div>High Price: {props.quote.h}</div>
                <div>Low Price: {props.quote.l}</div>
                <div>Open Price: {props.quote.o}</div>
                <div>Prev Close: {props.quote.pc}</div>
            </div>
            <div className='summary_left_about'>
                <div>IPO Start Date: {props.profile.ipo}</div>
                <div>Industry: {props.profile.finnhubIndustry}</div>
                <div>Webpage: {props.profile.weburl}</div>
                <div></div>
            </div>
            
          </div>
          
      </div>
  )
}

export default Summary;
