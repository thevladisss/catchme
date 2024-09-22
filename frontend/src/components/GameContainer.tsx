import { useState, useEffect, useReducer } from "react";
import { useBody } from "../hooks/useBody";
import Character from "./Character";

type PlayContainerProps = {
  id: string;
  players: any[];

  onPositionChange: (position: { left: number; top: number }) => void;
};
export default function GameContainer(props: PlayContainerProps) {
  const { preventScroll } = useBody();

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowLeft":
        handleWalkLeft();
        break;
      case "ArrowRight":
        handleWalkRight();
        break;
      case "ArrowDown":
        handleWalkDown();
        break;
      case "ArrowUp":
        handleWalkUp();
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const restoreScroll = preventScroll();
    document.body.addEventListener("keydown", handleKeyPress);

    return () => {
      document.body.removeEventListener("keydown", handleKeyPress);
      restoreScroll();
    };
  }, []);

  const SHIFT_PX = 15;

  const [position, setPosition] = useReducer(
    (prevState: { left: number; top: number }, action: string) => {
      switch (action) {
        case "walkLeft":
          return { left: prevState.left - SHIFT_PX, top: prevState.top };
        case "walkRight":
          return { left: prevState.left + SHIFT_PX, top: prevState.top };
        case "walkUp":
          return { left: prevState.left, top: prevState.top - SHIFT_PX };
        case "walkDown":
          return { left: prevState.left, top: prevState.top + SHIFT_PX };
        default:
          return prevState;
      }
    },
    { left: 0, top: 0 },
  );

  useEffect(() => {
    props.onPositionChange(position);
  }, [position]);

  const handleWalkRight = () => {
    setPosition("walkRight");
  };
  const handleWalkLeft = () => {
    setPosition("walkLeft");
  };
  const handleWalkUp = () => {
    setPosition("walkUp");
  };
  const handleWalkDown = () => {
    setPosition("walkDown");
  };

  return (
    <div className="flex justify-center">
      <div
        className="playground bg-white relative w-full"
        style={{ height: "70vh", width: "100%" }}
      >
        {props.players.map((player) => {
          return (
            <Character
              color={player.color}
              nickname={player.nickname}
              left={player.left}
              top={player.top}
            ></Character>
          );
        })}
      </div>
    </div>
  );
}
