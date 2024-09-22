import "./Character.css"
import {useEffect, useState} from "react";
import {mergeClasses} from "../utils/mergeClasses";
import {clearTimeout} from "timers";


export default function Character(props: {
  color: string;
  nickname: string;
  left: number;
  top: number;
}) {
  const [size, setSize] = useState(25);

  const [isMoving, setMoving] = useState(false)

  let timeout: any;

  useEffect(() => {
    setMoving(true)

    if (timeout) window.clearTimeout(timeout);

    timeout =  setTimeout(() => {
      setMoving(false)
    }, 500)

    return () => {
      if (timeout) window.clearTimeout(timeout);
    }
  }, [props.top, props.left]);

  return (
    <div
      className={mergeClasses('character', isMoving ? 'character--moving' : '')}
      style={{
        height: size + "px",
        width: size + "px",
        background: props.color,
        left: props.left,
        top: props.top,
        ...(isMoving ? {
          boxShadow: `0px 0px 10px 5px ${props.color}`
        } : {})
      }}
    ></div>
  );
}
