import Router, { Route } from "preact-router";
import Home from "./Home";
import _import from "./pages/import";
import login from "./pages/login";
import register from "./pages/register";
import UserWord from "./pages/userWord/UserWord";

export function App() {
  return (
    <div style={{ height: window.innerHeight }}>
      <Router>
        <Route path="/mobile" component={Home}></Route>
        <Route path="/mobile/userWords" component={UserWord}></Route>
        <Route path="/mobile/login" component={login}></Route>
        <Route path="/mobile/register" component={register}></Route>
        <Route path="/mobile/import" component={_import}></Route>
      </Router>
    </div>
  );
}
