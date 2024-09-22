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
      className={mergeClasses("bg-white w-full", className ? className : "")}
    >
      <List>
        <ListItem>Nickname: {props.nickname}</ListItem>
        <ListItem>Players: {props.playersCount}</ListItem>
      </List>
    </div>
  );
}
