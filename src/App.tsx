import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navBar";
import TestColumn from "./components/testColumn";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <TestColumn />
    </React.Fragment>
  );
}

export default App;
