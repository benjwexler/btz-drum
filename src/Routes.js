
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

const Routes = ({ location }) => {
  console.log('location', location)
  return (
    <div>
      <Nav />
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          appear
          timeout={{
            appear: 150000,
            enter: 300000,
            exit: 200,
          }}
          classNames='fade'
        >
          <Switch location={location}>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/drum">
              <DrumPage />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default withRouter(Routes);