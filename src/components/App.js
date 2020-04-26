import React from "react";
import '../styles/transition.css';
import MyRouter from "../router/MyRouter";
import Div100vh from 'react-div-100vh'

const App = () => {
  return (
    <Div100vh>
    <MyRouter />
    </Div100vh>
  );
}

export default App;