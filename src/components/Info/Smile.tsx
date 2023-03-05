import styled from "@emotion/styled";
import React from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import sprite from "src/assets/sprite.png";
import { GameStatus, recreateGame } from "src/store/game.reducer";

enum SmileOption {
  Default = "default",
  DefaultPress = "defaultPress",
  Suprised = "suprised",
  PockerFace = "pockerFace",
  SadFace = "sadFace",
}

const SpritesPos = {
  default: { x: 0, y: -24 },
  defaultPress: { x: -27, y: -24 },
  suprised: { x: -54, y: -24 },
  pockerFace: { x: -81, y: -24 },
  sadFace: { x: -108, y: -24 },
};

const SmileBlock = styled.div<{ smile: SmileOption }>`
  width: 26px;
  height: 26px;
  image-rendering: pixelated;
  background-image: url(${sprite});
  display: inline-block;
  ${({ smile }) =>
    `background-position: ${SpritesPos[smile].x}px ${SpritesPos[smile].y}px`}
`;

const Smile: React.FC<{ gameStatus: GameStatus }> = ({ gameStatus }) => {
  const [state, setState] = React.useState<SmileOption>(SmileOption.Default);
  const dispatch = useAppDispatch();
  const { active } = useAppSelector(state => state.cells);

  React.useEffect(() => {
    if (gameStatus === GameStatus.Defeat) {
      setState(SmileOption.SadFace);
    }
    if (gameStatus === GameStatus.Win)
      setState(SmileOption.PockerFace);
  }, [gameStatus]);

  React.useEffect(() => {
    if (gameStatus !== GameStatus.Unknown)
      return;
    if (active) {
      setState(SmileOption.Suprised);
    } else {
      setState(SmileOption.Default);
    }
  }, [active]);

  return (
    <SmileBlock
      smile={state}
      onMouseDown={() => setState(SmileOption.DefaultPress)}
      onMouseUp={() => setState(SmileOption.Default)}
      onClick={() => dispatch(recreateGame())}
    />
  );
};

export default React.memo(Smile);