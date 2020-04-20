
import React, {useState} from 'react';
import '../styles/App.css';
import { withRouter } from "react-router";

function ButtonEnter() {
  const [showBorder, setShowBorder] = useState(false)
  return (
    <button className="buttonEnter d-none d-md-block" onAnimationEnd={() => setShowBorder(true)}>
    <div style={{
         border: '2px solid white',
        opacity: showBorder ? 1 : 0,
        width: showBorder ? 120 : 0,
        transition: 'width 1s',
        margin: 'auto',
      }} />
      <div>Enter</div>
      <div style={{
        border: '2px solid white',
        opacity: showBorder ? 1 : 0,
        width: showBorder ? 120 : 0,
        transition: 'width 1s',
        margin: 'auto',
      }} />
    </button>
  );
}

export default withRouter(ButtonEnter);
