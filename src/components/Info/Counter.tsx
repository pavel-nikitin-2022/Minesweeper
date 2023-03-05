import styled from "@emotion/styled";
import React from "react";
import sprite from "src/assets/sprite.png";
import { CounterSprite } from "src/types";

const SpritesPos = {
  1: { x: 0, y: 0 },
  2: { x: -14, y: 0 },
  3: { x: -28, y: 0 },
  4: { x: -42, y: 0 },
  5: { x: -56, y: 0 },
  6: { x: -70, y: 0 },
  7: { x: -84, y: 0 },
  8: { x: -98, y: 0 },
  9: { x: -112, y: 0 },
  0: { x: -126, y: 0 },
};

const TimeBlock = styled.div<{ number: CounterSprite }>`
  width: 13px;
  height: 23px;
  image-rendering: pixelated;
  background-image: url(${sprite});
  display: inline-block;
  ${({ number }) =>
    `background-position: ${SpritesPos[number].x}px ${SpritesPos[number].y}px`}
`;

const CounterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Counter: React.FC<{number: number}> = ({number}) => {
  return (
    <CounterSection>
      <TimeBlock number={((number - number % 100) / 100)}/>
      <TimeBlock number={((number - number % 10) / 10) % 10 } />
      <TimeBlock number={number % 10} />
    </CounterSection>
  );
};

export default React.memo(Counter);
