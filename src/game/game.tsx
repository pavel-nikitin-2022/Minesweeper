import styled from "@emotion/styled";
import React from "react";
import { useAppSelector } from "../store";
import Cell from "./Cell";

const GameBoard = styled.div`
  display: grid;
  background-color: #999;
  padding: 5px;
  grid-template-columns: repeat(16, 16px);
  transform: scale(1.5);
`;

const Game: React.FC = () => {
  const { cells } = useAppSelector(root => root.cells);

  return (
    <GameBoard onContextMenuCapture={e => e.preventDefault()}>
      {cells.map((cell, i) => (
        <Cell {...cell} index={i} key={i} />
      ))}
    </GameBoard>
  );
};

export default React.memo(Game);
