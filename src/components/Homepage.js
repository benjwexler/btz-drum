
import React from 'react';
import '../styles/Homepage.css';
import ButtonEnter from './Button.Enter';
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <div style={{
        maxWidth: '1350px', padding: '0px',
        padding: 0,
        height: 'calc(100vh - 66px)',
        width: '100vw',
        minHeight: 502,
        position: 'relative'
      }} className="container p-0 p-lg-3 p-xl-5">
        <Link to="/drum" className="d-none d-sm-inline">
          <div style={{ height: '100%' }} id="test" className="row">
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
          <ButtonEnter />
        </Link>
        <div className="d-block d-sm-none mt-5 mx-4">
          <div>
            BTZ Drum does not currently work on mobile browsers. Please use a desktop or laptop computer to start making beats.
          </div>
          <div className="mt-4">
            Created by <a href="https://www.linkedin.com/in/benjwexler/">Ben Wexler</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;



