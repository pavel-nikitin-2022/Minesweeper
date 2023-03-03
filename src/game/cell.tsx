import styled from "@emotion/styled";
import React from "react";
import sprite from "../assets/sprite.png";
import { MouseController } from "../controllers/MouseController";
import {
  openCell,
  putFlag,
  highlightNeighbors,
  setSelected
} from "../store/game.reducer";
import { useAppDispatch } from "../store";
import { isRightClick } from "../utils/isRightClick";
import { SpritesPos } from "./config";
import { CellSprite, CellStatus, Cell as ICell } from "../types";

const TOUCH_INTERVAL = 600;

const CellSection = styled.div<{ state: CellSprite }>`
  height: 16px;
  width: 16px;
  box-sizing: border-box;
  image-rendering: pixelated;
  background-image: url(${sprite});
  ${({ state }) =>
    `background-position: ${SpritesPos[state].x}px ${SpritesPos[state].y}px`}
`;

const Cell: React.FC<ICell> = ({ status, sprite, index }) => {
  const dispatch = useAppDispatch();
  const touchStartRef = React.useRef<null | number>(null);
  const setCellSpriteTimeoutRef = React.useRef<number>(0);

  // обработчики событий клетки
  const handleClick = React.useCallback(() => {
    if (status !== CellStatus.Guess) dispatch(openCell(index));
  }, []);

  const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isRightClick(e)) dispatch(putFlag(index));
    else if (status === CellStatus.Open) {
      dispatch(highlightNeighbors({ index, status: true }));
    } else if (status === CellStatus.Close)
      dispatch(setSelected({ index, status: true }));
  }, []);

  const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isRightClick(e)) return;
    if (status !== CellStatus.Guess) {
      if (status === CellStatus.Open)
        dispatch(highlightNeighbors({ index, status: false }));
      else dispatch(openCell(index));
    }
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    if (MouseController.isDown()) {
      if (status === CellStatus.Close)
        dispatch(setSelected({ index, status: false }));
      else dispatch(highlightNeighbors({ index, status: false }));
    }
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    if (MouseController.isDown()) {
      if (status === CellStatus.Close)
        dispatch(setSelected({ index, status: true }));
      else if (status === CellStatus.Open)
        dispatch(highlightNeighbors({ index, status: true }));
    }
  }, []);

  const handleTouchStart = React.useCallback(() => {
    touchStartRef.current = Date.now();
    setCellSpriteTimeoutRef.current = setTimeout(() => {
      dispatch(putFlag(index));
    }, TOUCH_INTERVAL);
  }, []);

  return (
    <CellSection
      state={sprite}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={() => clearTimeout(setCellSpriteTimeoutRef.current)}
    />
  );
};

export default React.memo(Cell);
