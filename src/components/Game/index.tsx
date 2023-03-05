import styled from "@emotion/styled";
import React from "react";
import { useAppSelector } from "src/store";
import { GameStatus } from "src/types";
import Cell from "./Cell";

const GameBoard = styled.div<{isBlock: boolean}>`
  ${({isBlock}) => isBlock && "pointer-events: none;"}
  display: grid;
  grid-template-columns: repeat(16, 16px);

  border-width: 2px;
  border-style: solid;
  border-left-color: #7b7b7b;
  border-top-color: #7b7b7b;
  border-right-color: #fff;
  border-bottom-color: #fff;
`;

const Game: React.FC = () => {
  const { cells, gameStatus } = useAppSelector(root => root.cells);

  return (
    <GameBoard 
      isBlock={gameStatus !== GameStatus.Unknown} 
      onContextMenuCapture={e => e.preventDefault()}
    >
      {cells.map((cell, i) => (
        <Cell {...cell} index={i} key={i} />
      ))}
    </GameBoard>
  );
};

export default React.memo(Game);
