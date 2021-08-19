import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navBar";
import home from "./components/home";
import { Switch, Route } from "react-router-dom";
import FullGist from "./components/fullGist";
import TestComponent from "./components/test";
import { DetailedGist } from "./interfaces/DetailedGist";
import detailedGistsJson from "./components/detailedGists.json";

let mylist: DetailedGist[] = detailedGistsJson;
// Then make this data available through context
export const DetailedGistContext = React.createContext<DetailedGist[]>(mylist);

function App() {
  // For now we're storing fake api data into localStorage
  // This will be replaced with real api data
  localStorage.setItem("DETAILED_DATA", JSON.stringify(mylist));

  return (
    <React.Fragment>
      <NavBar />
      <DetailedGistContext.Provider value={mylist}>
        <Switch>
          <Route exact path="/" component={home}></Route>
          <Route path="/test" component={TestComponent}></Route>
          <Route path="/fullGist/:id" component={FullGist}></Route>
        </Switch>
      </DetailedGistContext.Provider>
    </React.Fragment>
  );
}

export default App;
