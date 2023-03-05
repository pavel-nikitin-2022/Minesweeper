import styled from "@emotion/styled";
import React from "react";
import sprite from "src/assets/sprite.png";

enum TimerNumber {
  One = 1,
  Two = 2,
  Three = 3,
  Four= 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Zero = 0,
}

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

const TimeBlock = styled.div<{ number: TimerNumber }>`
  width: 13px;
  height: 23px;
  image-rendering: pixelated;
  background-image: url(${sprite});
  display: inline-block;
  ${({ number }) =>
    `background-position: ${SpritesPos[number].x}px ${SpritesPos[number].y}px`}
`;

const TimeSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Timer: React.FC<{number: number}> = ({number}) => {
  return (
    <TimeSection>
      <TimeBlock number={((number - number % 100) / 100)}/>
      <TimeBlock number={((number - number % 10) / 10) % 10 } />
      <TimeBlock number={number % 10} />
    </TimeSection>
  );
};

export default React.memo(Timer);
