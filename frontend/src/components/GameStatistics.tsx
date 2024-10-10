import { useState, useEffect, HTMLProps } from "react";
import {List, ListItem, Skeleton} from "@mui/material";
import { mergeClasses } from "../utils/mergeClasses";

type GameStatisticsProps = {
  playersCount: number;
  nickname: string;
  logs: string[]
} & HTMLProps<any>;
export default function GameStatistics(props: GameStatisticsProps) {
  const { className, ...ownProps } = props;

  return (
    <div
      className={mergeClasses("bg-white w-full p-4 flex flex-col", className ? className : "")}
    >
      <List dense={true}>
        <ListItem dense={true}>
          {props.nickname ?
            'Nickname: ' + props.nickname
            :
            <Skeleton width={100} height={20}></Skeleton>
          }
        </ListItem>
        <ListItem dense={true}>
          {props.playersCount > 0 ?
            'Players: ' + props.playersCount
            :
            <Skeleton width={'100%'} height={20}></Skeleton>
          }
        </ListItem>
      </List>
      <div style={{maxHeight: "375px"}} className="bg-gray-200 p-4 grow border border-gray-700 overflow-auto">
         {
           props.logs.map((log) => {
             return <p className="text-sm">{log}</p>
           })
         }
      </div>
    </div>
  );
}
