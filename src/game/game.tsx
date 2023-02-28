import styled from "@emotion/styled";
import React from "react";
import Cell from "./cell";

type Cell = {
  isBomb: boolean;
  nearBombs: number;
}

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

function Game() {
  const [cells, setCells] = React.useState<Cell[]>([]);

  React.useLayoutEffect(() => {
    const bombsIndex = [...Array(256).keys()].sort(() => Math.random() - 0.5).slice(0, 40);

    const cellsProto = Array.from(generator(0, 256)).map(() => {
      return {
        isBomb: false,
        nearBombs: 0,
      };
    });

    bombsIndex.forEach((i) => {
      cellsProto[i].isBomb = true;
      cellsProto[i].nearBombs = 0;

      if (i - 15 > 0 && !cellsProto[i - 15].isBomb)
        cellsProto[i - 15].nearBombs++;
      if (i - 16 > 0 && !cellsProto[i - 16].isBomb)
        cellsProto[i - 16].nearBombs++;
      if (i - 17 > 0 && !cellsProto[i - 17].isBomb)
        cellsProto[i - 17].nearBombs++;
      if (i - 1 > 0 && !cellsProto[i - 1].isBomb)
        cellsProto[i - 1].nearBombs++;

      if (i + 15 < 256 && !cellsProto[i + 15].isBomb)
        cellsProto[i + 15].nearBombs++;
      if (i + 16 < 256 && !cellsProto[i + 16].isBomb)
        cellsProto[i + 16].nearBombs++;
      if (i + 17 < 256 && !cellsProto[i + 17].isBomb)
        cellsProto[i + 17].nearBombs++;
      if (i + 1 < 256 && !cellsProto[i + 1].isBomb)
        cellsProto[i + 1].nearBombs++;
    });

    setCells(cellsProto);
  }, []);
  console.log(cells);

  return (
    <GameBoard>
      {cells.map((cell, i) => {
        return (
          <Cell key={i}></Cell>
        );
      })}
    </GameBoard>
  );
}

export default React.memo(Game);