import { useState, useEffect, useReducer } from "react";
import { useBody } from "../hooks/useBody";
import Character from "./Character";
import Point from "./Point"
import {Player as IPlayer} from "../interface/Player";
import {Point as IPoint} from "../interface/Point";

type PlayContainerProps = {
  id: string;
  players: IPlayer[];
  points: IPoint[]

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
   if(!props.points) debugger
  }, [props.points])

  useEffect(() => {
    const restoreScroll = preventScroll();

    document.body.addEventListener("keydown", handleKeyPress);

    return () => {
      document.body.removeEventListener("keydown", handleKeyPress);
      restoreScroll();
    };
  }, []);

  const SHIFT_PX = 15;

  const validatePosition = (topOrLeft: number) => {
    return topOrLeft >= 0 ? topOrLeft : 0
  }

  //TODO: Prevent prop move handler call if position does not change upon click (when going beyond)
  const [position, setPosition] = useReducer(
    (prevState: { left: number; top: number }, action: string) => {
      switch (action) {
        case "walkLeft":
          return { left: validatePosition(prevState.left - SHIFT_PX), top: validatePosition(prevState.top) };
        case "walkRight":
          return { left: validatePosition(prevState.left + SHIFT_PX), top: validatePosition(prevState.top) };
        case "walkUp":
          return { left: validatePosition(prevState.left), top: validatePosition(prevState.top - SHIFT_PX) };
        case "walkDown":
          return { left: validatePosition(prevState.left), top: validatePosition(prevState.top + SHIFT_PX) };
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
        {(props.points && props.points.length) && props.points.map((point, index) => {
          return <Point
            key={index}
            left={point.left}
            top={point.top}
            value={point.value}
          ></Point>
        })}
        {props.players.map((player) => {

          return (
            <Character
              key={player.playerId}
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
