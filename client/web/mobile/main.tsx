import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import UserWord from "./UserWord";

ReactDOM.render(
  <div>
    <Router basename="/mobile">
      <Route path={"/"} exact component={Home}></Route>
      <Route path={"/userWords"} exact component={UserWord}></Route>
    </Router>
  </div>,
  document.getElementById("root")
);
