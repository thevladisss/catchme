import { useState } from "react";

export default function Character(props: {
  color: string;
  nickname: string;
  left: number;
  top: number;
}) {
  const [size, setSize] = useState(25);

  return (
    <div
      className="player absolute"
      style={{
        height: size + "px",
        width: size + "px",
        background: props.color,
        left: props.left,
        top: props.top,
      }}
    ></div>
  );
}
