
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Nav from './Nav';
import DrumPage from './DrumPage'
import Homepage from "./Homepage";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './transition.css';
import Routes from "./Routes";

const MyRouter = () => {
  // console.log('location', location)
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default MyRouter;