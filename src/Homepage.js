
import React from 'react';
import './Homepage.css';
import ButtonEnter from './Button.Enter';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function Homepage() {
  return (
    <>
      
        <div style={{maxWidth: '1350px', padding: '0px',
        padding: 0,
    height: 'calc(100vh - 66px)',
    // width: '100%',
    width: '100vw',
    minHeight: 502,
    position: 'relative'
        
        }} className="container p-0 p-lg-3 p-xl-5">
        <Link to="/drum">
          <div style={{height: '100%'}} id="test" className="row">

            <div id="row1" className="col-sm-12 col-md-6 col-lg-6 ">
              <div className="typewriter">
                <h1>Let's</h1>
              </div>
            </div>
            <div id="row2" className="col-sm-12 col-md-6 col-lg-6 ">
              <div className="typewriter2">
                <h1>Make</h1>
              </div>
            </div>

            <div id="row3" className="col-sm-12 col-md-6 col-lg-6 ">
              <div className="typewriter3">
                <h1>Some</h1>
              </div>
            </div>

            <div id="row4" className="col-sm-12 col-md-6 col-lg-6 ">
              <div className="typewriter4">
                <h1>Beats</h1>
              </div>
            </div>
          </div>
          <ButtonEnter/>
          </Link>
        </div>
        
    </>
  );
}

export default Homepage;



