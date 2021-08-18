import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navBar";
import home from "./components/home";
import { Switch, Route } from "react-router-dom";
import FullGist from "./components/fullGist";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={home}></Route>
        <Route path="/fullGist/:id" component={FullGist}></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
