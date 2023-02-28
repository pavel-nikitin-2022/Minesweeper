import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";
import sprite from "../assets/sprite.png";
import { RootState } from "../redux/store";

enum CellStates {
  Normal = "normal",
  MouseDown = "mouseDown",
}

const Sprites = {
  normal: {x: 0, y: -92},
  mouseDown: {x: -31, y: -92},
};

const CellSection = styled.div<{state: CellStates}>`
  height: 28px;
  width: 28px;
  box-sizing: border-box;
  background-image: url(${sprite});
  ${({state}) => `background-position: ${Sprites[state].x + "px " + Sprites[state].y + "px"}`};
`;

function Cell() {
  const { isMouseDown } = useSelector((state: RootState) => state.player);
  const [cellState, setCellState] = React.useState(CellStates.Normal);

  return (
    <CellSection
      state={cellState} 
      onMouseEnter={() => isMouseDown && setCellState(CellStates.MouseDown)}
      onMouseLeave={() => setCellState(CellStates.Normal)}
      onMouseDown={() => setCellState(CellStates.Normal)}
    >
    </CellSection>
  );
}

export default React.memo(Cell);