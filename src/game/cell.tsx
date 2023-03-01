import styled from "@emotion/styled";
import React from "react";
import { useDispatch } from "react-redux";
import sprite from "../assets/sprite.png";
import { MouseController } from "../controllers/MouseController";
import { CellStates, ICell, openCell, selectNeighbors, setSelected } from "../redux/game.reducer";

const SpritesPos = {
  close: { x: 0, y: -92 },
  selected: { x: -31, y: -92 },
  bomb: { x: -153, y: -92 },
  1: { x: -0.5, y: -123 },
  2: { x: -31, y: -123 },
  3: { x: -61, y: -123 },
  4: { x: -92, y: -123 },
  5: { x: -122.5, y: -123 },
  6: { x: -153, y: -123 },
  7: { x: -183.5, y: -123 },
  8: { x: -214, y: -123 },
};

const CellSection = styled.div<{ state: CellStates }>`
  height: 28px;
  width: 28px;
  box-sizing: border-box;
  image-rendering: pixelated;
  background-image: url(${sprite});
  ${({ state }) =>
    `background-position: ${SpritesPos[state].x + "px " + SpritesPos[state].y + "px"};`
}`;


function Cell({ open, state, index }: ICell) {
  const $isMouseOnCell = React.useRef(false);
  const dispatch = useDispatch();

  return (
    <CellSection
      state={state}
      onClick={() => dispatch(openCell(index))}

      onMouseEnter={() => {
        $isMouseOnCell.current = true;
        if (MouseController.isDown()) {
          if (!open) dispatch(setSelected({index, status: true}));
          else dispatch(selectNeighbors({index, status: true}));
        }
      }}

      onMouseLeave={() => {
        $isMouseOnCell.current = false;
        if (!open) dispatch(setSelected({index, status: false}));
        else dispatch(selectNeighbors({index, status: false}));
      }}

      onMouseDown={() => {
        if (open) {
          dispatch(selectNeighbors({index, status: true}));
        } else dispatch(setSelected({index, status: true}));
      }}

      onMouseUp={() => {
        if (open) dispatch(selectNeighbors({index, status: false}));
        else dispatch(openCell(index));
      }}
    >
    </CellSection>
  );
}

export default React.memo(Cell);