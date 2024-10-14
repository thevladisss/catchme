import BaseButton from "./base/BaseButton";
import React from "react";
import {useTheme} from "@mui/material";

export default function PlaygroundPanel(props: any) {

  const theme = useTheme();

  return (
    <div className="flex justify-between mb-1">
      <div>
        {
          !props.isInGame ?
            <BaseButton
              sx={{ backgroundColor: "white", color: theme.palette.primary.dark, fontWeight: 'bold' }}
              square
              variant="contained"
              onClick={props.onStartGame}
            >
              Start game
            </BaseButton>
            :
            <BaseButton
              sx={{ backgroundColor: "white", color: theme.palette.primary.dark, fontWeight: 'bold' }}
              square
              variant="contained"
            >
              Pause
            </BaseButton>
        }
      </div>
      <div className="bg-white p-2">
        Score: { props.score }
      </div>
    </div>
  )
}
