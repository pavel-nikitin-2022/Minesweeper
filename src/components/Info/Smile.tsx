import styled from "@emotion/styled";
import React from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import sprite from "src/assets/sprite.png";
import { recreateGame } from "src/store/game.reducer";
import { GameStatus, SmileSprite } from "src/types";

const SpritesPos = {
  default: { x: 0, y: -24 },
  defaultPress: { x: -27, y: -24 },
  suprised: { x: -54, y: -24 },
  pockerFace: { x: -81, y: -24 },
  sadFace: { x: -108, y: -24 },
};

const SmileBlock = styled.div<{ smile: SmileSprite }>`
  width: 26px;
  height: 26px;
  image-rendering: pixelated;
  background-image: url(${sprite});
  display: inline-block;
  ${({ smile }) =>
    `background-position: ${SpritesPos[smile].x}px ${SpritesPos[smile].y}px`}
`;

const Smile: React.FC<{ gameStatus: GameStatus }> = ({ gameStatus }) => {
  const [state, setState] = React.useState(SmileSprite.Default);
  const dispatch = useAppDispatch();
  const { active } = useAppSelector(state => state.cells);

  // Окончание игры -> ставится эмодзи победы или поражения
  React.useEffect(() => {
    if (gameStatus === GameStatus.Defeat) {
      setState(SmileSprite.SadFace);
    }
    if (gameStatus === GameStatus.Win)
      setState(SmileSprite.PockerFace);
  }, [gameStatus]);

  // При выборе клетки ставится удивленный эмодзи
  React.useEffect(() => {
    if (gameStatus !== GameStatus.Unknown)
      return;
    if (active) {
      setState(SmileSprite.Suprised);
    } else {
      setState(SmileSprite.Default);
    }
  }, [active]);

  return (
    <SmileBlock
      smile={state}
      onMouseDown={() => setState(SmileSprite.DefaultPress)}
      onMouseUp={() => setState(SmileSprite.Default)}
      onClick={() => dispatch(recreateGame())}
    />
  );
};

export default React.memo(Smile);