import React from "react";
import "./App.css";
import Playground from "./views/Playground/Playground";
import {palette} from "@mui/system"
import {Logo} from "./components/Logo";
function App() {

  return (<div className="bg-red-500 h-screen">
    <div className="py-4">
      <Logo></Logo>
    </div>
    <Playground className="h-full"></Playground>
  </div>)
}

export default App;
