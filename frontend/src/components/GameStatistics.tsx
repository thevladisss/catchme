import {useState, useEffect, HTMLProps, useMemo} from "react";
import {List, ListItem, Skeleton} from "@mui/material";
import { mergeClasses } from "../utils/mergeClasses";

type GameStatisticsProps = {
  playersCount: number;
  nickname: string;
  logs: string[]
} & HTMLProps<any>;
export default function GameStatistics(props: GameStatisticsProps) {
  const { className, ...ownProps } = props;

  const isPlaying =useMemo(() => {
    return props.playersCount > 0 && props.nickname
  }, [props.playersCount, props.nickname])

  return (
    <div
      className={mergeClasses("bg-white w-full p-4 flex flex-col", className ? className : "")}
    >
      <List className="flex-1/3" dense={true}>
        {
          isPlaying ?
            <>
              <ListItem dense={true}>{
                  'Nickname: ' + props.nickname
                }
              </ListItem>
              <ListItem dense={true}>
                {props.playersCount > 0 ?
                  'Players: ' + props.playersCount
                  :
                  <Skeleton width={'100%'} height={20}></Skeleton>
                }
              </ListItem>
            </>
            :
            'You are not in game'
        }
      </List>
      <div className="bg-gray-200 p-4 grow border border-gray-700 overflow-auto">
         {
           props.logs.map((log) => {
             return <p className="text-sm">{log}</p>
           })
         }
      </div>
    </div>
  );
}
