import {useEffect, useReducer, useState} from "react";
import DialogSelectCharacter from "../../components/dialogs/DialogSelectCharacter";
import GameContainer from "../../components/GameContainer";
import BaseButton from "../../components/base/BaseButton";
import {connectWebSocketServer} from "../../service/websocket";
import {Grid2 as Grid, Paper, Box} from "@mui/material";
import GameStatistics from "../../components/GameStatistics";

const useSockets = () => {

  let ws: WebSocket | null = null;

  const initConnection = () => {
    ws = connectWebSocketServer()

    return ws;
  }

  const closeConnection = () => {
    if (ws) ws.close()
  }

  return {ws, initConnection, closeConnection}
}

export default function Playground() {

  const {initConnection, closeConnection} = useSockets();

  const [connectionMetaData, setConnectionMetaData] = useState<{
    connectionId: string;
    id: string;
    color: string;
    playersCount: number;
  } | null>(null)

  useEffect(() => {
    const ws = initConnection()

    ws.onmessage = (event) => {
     const data = event.data ? JSON.parse(event.data) : null;

     console.log("Got message", data)
     if (data) {
       setConnectionMetaData(data)
     }
    }

    return () => {
      closeConnection()
    }
  }, [])


  const [isShowingSelectCharacter, showSelectCharacter] = useState(true)

  const [character, setCharacter] = useState({
    nickname: "",
    color: ""
  })

  const [color, setColor] = useState("")
  const handleCharacterSaved = ({color, nickname}: {color: string, nickname: string}) => {
    setCharacter((prevState) => ({...prevState, color, nickname}))
    showSelectCharacter(false)
  }
  const handleBack = () => {
    showSelectCharacter(false)
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-6xl mb-4 font-bold text-white"> SNAKY.IO </h1>
      </div>
      <div>
        <div className="flex justify-end">
          <BaseButton variant={'contained'} onClick={() => {showSelectCharacter(true)}} color="primary">
            Change character
          </BaseButton>
        </div>
        <Box>
          <Grid container columns={12}>
            <Grid size={10}>
              <GameContainer
                nickname={character.nickname}
                color={character.color}
              ></GameContainer>
            </Grid>
            <Grid size="grow">
              <GameStatistics
                nickname={character.nickname}
                playersCount={connectionMetaData? connectionMetaData.playersCount : 0}
              ></GameStatistics>
            </Grid>
          </Grid>
        </Box>
      </div>
      <DialogSelectCharacter
        nickname={character.nickname}
        color={character.color}
        onCharacterSaved={handleCharacterSaved}
        onBack={handleBack}
        open={isShowingSelectCharacter}
      ></DialogSelectCharacter>
    </div>
  )
}
