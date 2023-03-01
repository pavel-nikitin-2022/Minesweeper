import React from "react";
import Game from "./game";
import { MouseController } from "./controllers/MouseController";
import styled from "@emotion/styled";

function onMouseDown(e: MouseEvent) {
  e.preventDefault();
  MouseController.mouseDown();
}

function onMouseUp(e: MouseEvent) {
  e.preventDefault();
  MouseController.mouseUp();
}

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

function App() {
  React.useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.addEventListener("mousedown", onMouseDown);
      root.addEventListener("mouseup", onMouseUp);
    }

    return () => {
      root?.removeEventListener("mousedown", onMouseDown);
      root?.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  
  return (
    <Wrapper>
      <Game></Game>
    </Wrapper>
  );
}

export default App;
