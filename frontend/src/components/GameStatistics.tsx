import {useState, useEffect} from 'react'
import {List,ListItem} from "@mui/material";

type GameStatisticsProps = {
  playersCount: number;
  nickname: string;
};
export default function GameStatistics(props: GameStatisticsProps) {

  return (
    <div className="bg-white w-full">
      <List>
        <ListItem>
          Nickname: { props.nickname }
        </ListItem>
        <ListItem>
          Players: { props.playersCount }
        </ListItem>
      </List>
    </div>
  )
}
