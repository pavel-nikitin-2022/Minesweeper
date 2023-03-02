import styled from "@emotion/styled";
import React from "react";
import { useDispatch } from "react-redux";
import sprite from "../assets/sprite.png";
import { MouseController } from "../controllers/MouseController";
import { CellStates, CellStatuses, ICell, openCell, putFlag, selectNeighbors, setSelected } from "../redux/game.reducer";
import { isRightClick } from "../utils/isRightClick";

const SpritesPos = {
  close: { x: 0, y: -92 },
  selected: { x: -31, y: -92 },
  bomb: { x: -153, y: -92 },
  flag: { x: -61.2, y: -92 },
  question: { x: -92, y: -92 },
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


function Cell({ status, state, index }: ICell) {
  const dispatch = useDispatch();
  const $touchStartTime = React.useRef<null | number>(null);
  const $touchController = React.useRef<number>(0);

  return (
    <CellSection
      state={state}
      onClick={() => {
        if (status !== CellStatuses.Guess)
          dispatch(openCell(index));
      }}

      onMouseEnter={() => {
        if (MouseController.isDown()) {
          if (status === CellStatuses.Close) dispatch(setSelected({ index, status: true }));
          else if (status === CellStatuses.Open) dispatch(selectNeighbors({ index, status: true }));
        }
      }}

      onMouseLeave={() => {
        if (MouseController.isDown()) {
          if (status === CellStatuses.Close) dispatch(setSelected({ index, status: false }));
          else dispatch(selectNeighbors({ index, status: false }));
        }
      }}

      onMouseDown={(e) => {
        if (isRightClick(e))
          dispatch(putFlag(index));
        else if (status === CellStatuses.Open) {
          dispatch(selectNeighbors({ index, status: true }));
        } else if (status === CellStatuses.Close)
          dispatch(setSelected({ index, status: true }));
      }}

      onMouseUp={(e) => {
        if (isRightClick(e)) return;
        if (status !== CellStatuses.Guess) {
          if (status === CellStatuses.Open) dispatch(selectNeighbors({ index, status: false }));
          else dispatch(openCell(index));
        }
      }}

      onTouchStart={() => {
        $touchStartTime.current = Number(new Date());
        $touchController.current = setTimeout(() => {
          dispatch(putFlag(index));
        }, 600);
      }}

      onTouchEnd={() => clearTimeout($touchController.current)}
    >
    </CellSection>
  );
}

export default React.memo(Cell);