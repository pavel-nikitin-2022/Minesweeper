import styled from "@emotion/styled";
import React from "react";
import { GameStatus } from "../../store/game.reducer";
import { useAppSelector } from "../../store";
import Cell from "./Cell";

const GameBoard = styled.div<{isBlock: boolean}>`
  ${({isBlock}) => isBlock && "pointer-events: none;"}
  display: grid;
  background-color: #999;
  padding: 5px;
  grid-template-columns: repeat(16, 16px);
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
