import { useState, useEffect, HTMLProps } from "react";
import { List, ListItem } from "@mui/material";
import { mergeClasses } from "../utils/mergeClasses";

type GameStatisticsProps = {
  playersCount: number;
  nickname: string;
} & HTMLProps<any>;
export default function GameStatistics(props: GameStatisticsProps) {
  const { className, ...ownProps } = props;

  return (
    <div
      className={mergeClasses("bg-white w-full p-4 flex flex-col", className ? className : "")}
    >
      <List dense={true}>
        <ListItem dense={true}>Nickname: {props.nickname}</ListItem>
        <ListItem dense={true}>Players: {props.playersCount}</ListItem>
      </List>
      <div className="bg-gray-200 p-4 grow">
        Log
      </div>
    </div>
  );
}
