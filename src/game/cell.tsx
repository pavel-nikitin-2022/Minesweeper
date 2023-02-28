import styled from "@emotion/styled";
import React from "react";
import sprite from "../assets/sprite.png";
import { MouseController } from "../controllers/MouseController";
import { CellType } from "./Game";

enum CellStates {
  Normal = "normal",
  MouseDown = "mouseDown",
  Bomb = "bomb",
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
}

const SpritesPos = {
  normal: {x: 0, y: -92},
  mouseDown: {x: -31, y: -92},
  bomb: {x: -153, y: -92},
  1: {x: -0.5, y: -123},
  2: {x: -31, y: -123},
  3: {x: -61, y: -123},
  4: {x: -92, y: -123},
  5: {x: -122.5, y: -123},
  6: {x: -153, y: -123},
  7: {x: -183.5, y: -123},
  8: {x: -214, y: -123},
};

const CellSection = styled.div<{state: CellStates}>`
  height: 28px;
  width: 28px;
  box-sizing: border-box;
  background-image: url(${sprite});
  ${({state}) => 
    `background-position: ${SpritesPos[state].x + "px " + SpritesPos[state].y + "px"}`
}`;

function Cell({isBomb, nearBombs}: CellType) {
  const [cellState, setCellState] = React.useState(CellStates.Normal);
  const $isPressed = React.useRef(false);

  return (
    <CellSection
      state={cellState} 
      onMouseEnter={() => !$isPressed.current && MouseController.isDown() && setCellState(CellStates.MouseDown)}
      onMouseLeave={() => !$isPressed.current && setCellState(CellStates.Normal)}
      onMouseDown={() => !$isPressed.current && setCellState(CellStates.MouseDown)}

      onClick={() => {
        $isPressed.current = true;
        if (isBomb) setCellState(CellStates.Bomb);
        else if (nearBombs) setCellState(nearBombs);
        else setCellState(CellStates.MouseDown);
      }}

      onMouseUp={() => {
        $isPressed.current = true;
        if (isBomb) setCellState(CellStates.Bomb);
        else if (nearBombs) setCellState(nearBombs);
        else setCellState(CellStates.MouseDown);
      }}
    >
    </CellSection>
  );
}

export default React.memo(Cell);