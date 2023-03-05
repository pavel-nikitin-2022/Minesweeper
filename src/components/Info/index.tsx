import styled from "@emotion/styled";
import React from "react";
import { useAppSelector } from "src/store";
import { GameStatus } from "src/types";
import Smile from "./Smile";
import Counter from "./Counter";

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  padding-left: 6px;
  padding-right: 6px; 

  border-width: 2px;
  border-style: solid;
  border-left-color: #7b7b7b;
  border-top-color: #7b7b7b;
  border-right-color: #fff;
  border-bottom-color: #fff;
  margin-bottom: 6px;
`;

const Info: React.FC = () => {
  const [timerValue, setTimerValue] = React.useState(0);
  const { isStart, flagsAmount, gameStatus } = useAppSelector(state => state.cells);
  const startTime = React.useRef(Date.now());
  const intervalId = React.useRef(false);

  // Запускаем таймер после первого открытия клетки
  // Останваливаем и сбрасываем при перезапуске
  React.useEffect(() => {
    if (isStart) {
      intervalId.current = true;
      startTime.current = Date.now();
      requestAnimationFrame(function timerUpdate() {
        if (!intervalId.current) return;
        const currentTime = Date.now();
        const dif = (currentTime - startTime.current) / 1000;
        if (Math.floor(dif) < 1000) 
          setTimerValue(Math.floor(dif));
        else setTimerValue(999);
        if (intervalId.current)
          requestAnimationFrame(timerUpdate);
      });
    } else {
      intervalId.current = false;
      setTimerValue(0);
    }
  }, [isStart]);

  // Останавливаем, но не сбрасываем таймер в конце игры.
  React.useEffect(() => {
    if (gameStatus !== GameStatus.Unknown) {
      intervalId.current = false;
    }
  }, [gameStatus]);

  return (
    <InfoSection>
      <Counter number={flagsAmount}/>
      <Smile gameStatus={gameStatus} />
      <Counter number={timerValue} />
    </InfoSection>
  );
};

export default React.memo(Info);