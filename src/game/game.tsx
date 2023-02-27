import styled from "@emotion/styled";
import React from "react";
import { Cell } from "./cell";

const GameBoard = styled.div`
  display: grid;
  background-color: #999;
  padding: 5px;
  grid-template-columns: repeat(16, 28px);
`;

function* generator(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

export function Game() {
  const [cells, setCells] = React.useState<number[]>([]);

  React.useLayoutEffect(() => {
    setCells(Array.from(generator(0, 256)));
  }, []);

  return (
    <GameBoard>
      {cells.map((i) => {
        return (
          <Cell key={i}></Cell>
        );
      })}
    </GameBoard>
  );
}