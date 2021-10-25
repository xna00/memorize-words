import { useEffect } from "react";
import { useState } from "react";
import { getVocabularies } from "./service/api";
import List from "./pages/List";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={List} />
        <Route path="/learn" component={Learn} />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;
