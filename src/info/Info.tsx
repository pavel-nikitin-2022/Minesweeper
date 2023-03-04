import styled from "@emotion/styled";
import React from "react";
import { useAppSelector } from "../store";
import Smile from "./Smile";
import Timer from "./Timer";

const InfoSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 35px;
`;

const Info: React.FC = () => {
  const [timerValue, setTimerValue] = React.useState(0);
  const { isStart, bomb } = useAppSelector(state => state.cells);
  const startTime = React.useRef(Date.now());
  const intervalId = React.useRef<number>();

  React.useEffect(() => {
    if (isStart) {
      startTime.current = Date.now();
      intervalId.current = setInterval(() => {
        const currentTime = Date.now();
        const dif = (currentTime - startTime.current) / 1000;
        setTimerValue(Math.floor(dif));
      }, 400);
    } else {
      clearInterval(intervalId.current);
      setTimerValue(0);
    }
  }, [isStart]);

  return (
    <InfoSection>
      <Timer number={bomb}/>
      <Smile />
      <Timer number={timerValue} />
    </InfoSection>
  );
};

export default React.memo(Info);