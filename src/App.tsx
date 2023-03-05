import React from "react";
import Game from "./components/Game";
import { MouseController } from "./controllers/MouseController";
import styled from "@emotion/styled";
import { isRightClick } from "./utils/isRightClick";
import Info from "./components/Info";

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 6px;
  border-width: 2px;
  border-style: solid;
  border-left-color: #fff;
  border-top-color: #fff;
  border-right-color: #9b9b9b;
  border-bottom-color: #9b9b9b;
  background-color: #c2c2c2;
`;

function App() {

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    !isRightClick(e) && MouseController.mouseDown();
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    !isRightClick(e) && MouseController.mouseUp();
  };

  React.useEffect(() => {
    const root = document.getElementById("root");

    root?.addEventListener("mousedown", onMouseDown);
    root?.addEventListener("mouseup", onMouseUp);

    return () => {
      root?.removeEventListener("mousedown", onMouseDown);
      root?.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <Wrapper>
      <Info />
      <Game />
    </Wrapper>
  );
}

export default App;
