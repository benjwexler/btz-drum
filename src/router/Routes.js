
import React from "react";
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import Nav from '../components/Nav';
import DrumPage from '../components/DrumPage'
import Homepage from "../components/Homepage";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import '../styles/transition.css';

const Routes = ({ location }) => {
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