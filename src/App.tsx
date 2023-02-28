import React from "react";
import { useDispatch } from "react-redux/es/exports";
import "./App.css";
import Game from "./game";
import { setMouseDown } from "./redux/playerReducer";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const body = document.getElementsByTagName("body");
    if (body[0]) {
      body[0].addEventListener("mousedown", (e) => {
        e.preventDefault();
        dispatch(setMouseDown(true));
      });

      body[0].addEventListener("mouseup", (e) => {
        e.preventDefault();
        dispatch(setMouseDown(false));
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
