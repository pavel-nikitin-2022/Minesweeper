import styled from "@emotion/styled";
import React from "react";
import { useDispatch } from "react-redux";
import sprite from "../assets/sprite.png";
import { MouseController } from "../controllers/MouseController";
import { CellType, openCell, selectNeighbors } from "../redux/game.reducer";

enum CellStates {
  Close = "close",
  Selected = "selected",
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
    `background-position: ${SpritesPos[state].x + "px " + SpritesPos[state].y + "px"}`
}`;

function Cell({ isBomb, nearBombs, open, selected, index }: CellType) {
  const [cellState, setCellState] = React.useState(CellStates.Close);
  const $isMouseOnCell = React.useRef(false);

  const dispatch = useDispatch();

  const onOpenCell = React.useCallback(() => {
    dispatch(openCell(index));
    if (isBomb) setCellState(CellStates.Bomb);
    else if (nearBombs) setCellState(nearBombs);
    else setCellState(CellStates.Selected);
  }, []);

  React.useLayoutEffect(() => {
    if (open) return;
    if (selected)
      setCellState(CellStates.Selected);
    else if (!($isMouseOnCell.current && MouseController.isDown()))
      setCellState(CellStates.Close);
  }, [selected]);

  return (
    <CellSection
      state={cellState}

      onMouseEnter={() => {
        $isMouseOnCell.current = true;

        if (MouseController.isDown()) {
          if (!open) setCellState(CellStates.Selected);
          else dispatch(selectNeighbors({index, status: true}));
        }
      }}

      onMouseLeave={() => {
        $isMouseOnCell.current = false;

        if (!open) setCellState(CellStates.Close);
        else dispatch(selectNeighbors({index, status: false}));
      }}

      onMouseDown={() => {
        if (open) {
          dispatch(selectNeighbors({index, status: true}));
        } else setCellState(CellStates.Selected);
      }}
      onClick={onOpenCell}
      onMouseUp={() => {
        if (open) dispatch(selectNeighbors({index, status: false}));
        else onOpenCell();
      }}
    >
    </CellSection>
  );
}

export default React.memo(Cell);