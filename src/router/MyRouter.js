
import React from "react";
import {
  HashRouter as Router,
} from "react-router-dom";
import Routes from "./Routes";

const MyRouter = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default MyRouter;