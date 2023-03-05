import styled from "@emotion/styled";
import React from "react";
import { GameStatus } from "src/store/game.reducer";
import { useAppSelector } from "src/store";
import Smile from "./Smile";
import Timer from "./Timer";

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
  const { isStart, bomb, gameStatus } = useAppSelector(state => state.cells);
  const startTime = React.useRef(Date.now());
  const intervalId = React.useRef(false);

  // первое нажатие
  React.useEffect(() => {
    if (isStart) {
      intervalId.current = true;
      startTime.current = Date.now();
      requestAnimationFrame(function timerUpdate() {
        const currentTime = Date.now();
        const dif = (currentTime - startTime.current) / 1000;
        setTimerValue(Math.floor(dif));
        if (intervalId.current)
          requestAnimationFrame(timerUpdate);
      });
    } else {
      intervalId.current = false;
      setTimerValue(0);
    }
  }, [isStart]);

  // конец игры
  React.useEffect(() => {
    if (gameStatus !== GameStatus.Unknown) {
      intervalId.current = false;
    }
  }, [gameStatus]);

  return (
    <InfoSection>
      <Timer number={bomb}/>
      <Smile gameStatus={gameStatus} />
      <Timer number={timerValue} />
    </InfoSection>
  );
};

export default React.memo(Info);