import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Cell from "./Cell";

const GameBoard = styled.div`
  display: grid;
  background-color: #999;
  padding: 5px;
  grid-template-columns: repeat(16, 28px);
`;

function Game() {
  const { cells }= useSelector((root: RootState) => root.cells);

  return (
    <GameBoard>
      {cells.map((cell, i) =>
        <Cell {...cell} index={i} key={i} />
      )}
    </GameBoard>
  );
}

export default React.memo(Game);