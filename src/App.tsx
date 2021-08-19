import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navBar";
import home from "./components/home";
import { Switch, Route } from "react-router-dom";
import FullGist from "./components/fullGist";

export const DetailedGistContext = React.createContext<number[] | null>(null);
const testArray = [23, 45, 77];

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <DetailedGistContext.Provider value={testArray}>
        <Switch>
          <Route exact path="/" component={home}></Route>
          <Route path="/fullGist/:id" component={FullGist}></Route>
        </Switch>
      </DetailedGistContext.Provider>
    </React.Fragment>
  );
}

export default App;
