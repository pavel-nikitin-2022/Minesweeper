import React from "react";
import "./App.css";
import Game from "./game";
import { MouseController } from "./controllers/MouseController";

function App() {

  React.useEffect(() => {
    const body = document.getElementsByTagName("body");
    if (body[0]) {
      body[0].addEventListener("mousedown", (e) => {
        e.preventDefault();
        MouseController.mouseDown();
      });

      body[0].addEventListener("mouseup", (e) => {
        e.preventDefault();
        MouseController.mouseUp();
      });
    }
  }, []);
  
  return (
    <div>
      <Game></Game>
    </div>
  );
}

export default App;
