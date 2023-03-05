import React from "react";
import Game from "./components/Game";
import { mouseController } from "./controllers/MouseController";
import styled from "@emotion/styled";
import Info from "./components/Info";
import { isRightClick } from "./utils";

const Wrapper = styled.div`
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

const App: React.FC = () => {
  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    !isRightClick(e) && mouseController.mouseDown();
  };

  const onMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    !isRightClick(e) && mouseController.mouseUp();
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
};

export default App;
