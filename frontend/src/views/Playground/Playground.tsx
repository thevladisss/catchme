import { useEffect, useReducer, useRef, useState } from "react";
import { useSockets } from "../../hooks/useSockets";
import DialogSelectCharacter from "../../components/dialogs/DialogSelectCharacter";
import GameContainer from "../../components/GameContainer";
import BaseButton from "../../components/base/BaseButton";
import { connectWebSocketServer } from "../../service/websocket";
import { Grid2 as Grid, Paper, Box } from "@mui/material";
import GameStatistics from "../../components/GameStatistics";

export default function Playground() {
  const { ws, closeConnection } = useSockets();

  const [connectionMetaData, setCurrentConnection] = useState<{
    connectionId: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    ws.current.onmessage = (event: any) => {
      const data = event.data ? JSON.parse(event.data) : null;

      console.log("Message: ", data);

      //TODO: Replace with constants
      if (data.event === "user_connected") {
        setCurrentConnection(data);
      }

      if (data.event === "user_move") {
      }

      if (data.event === "user_disconnected") {
      }
    };

    return () => {
      closeConnection();
    };
  }, []);

  const [isShowingSelectCharacter, showSelectCharacter] = useState(true);

  const [character, setCharacter] = useState({
    nickname: "",
    color: "#000",
  });

  const handleCharacterSaved = ({
    color,
    nickname,
  }: {
    color: string;
    nickname: string;
  }) => {
    setCharacter((prevState) => ({ ...prevState, color, nickname }));
    showSelectCharacter(false);
  };

  type Player = {
    id: string;
    nickname: string;
    color: string;
    top: number;
    left: number;
  };

  const [gameSession, setGameSession] = useState<{
    playerId: string;
    players: Record<string, Player>;
  } | null>(null);

  //todo: update logic for notifying server on join
  useEffect(() => {
    if (ws.current.readyState === WebSocket.OPEN && !isShowingSelectCharacter)
      sendJoinGameEvent();
  }, [isShowingSelectCharacter]);

  //TODO: Move somewhere else

  const sendJoinGameEvent = () => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          event: "user_join_game",
          color: character.color,
          nickname: character.nickname,
        }),
      );
    }
  };

  const handlePositionChange = (position: { left: number; top: number }) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN)
      ws.current.send(
        JSON.stringify({
          event: "user_move",
          position,
        }),
      );
  };

  const handleBack = () => {
    showSelectCharacter(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-6xl mb-4 font-bold text-white"> SNAKY.IO </h1>
      </div>
      <div>
        <div className="flex justify-end">
          <BaseButton
            variant={"contained"}
            onClick={() => {
              showSelectCharacter(true);
            }}
            color="primary"
          >
            Change character
          </BaseButton>
        </div>
        <Box>
          <Grid container columns={12}>
            <Grid size={10}>
              <GameContainer
                id={connectionMetaData ? connectionMetaData.connectionId : ""}
                players={[]}
                onPositionChange={handlePositionChange}
              ></GameContainer>
            </Grid>
            <Grid size="grow">
              {false ? (
                <GameStatistics
                  className="h-full"
                  nickname={character.nickname}
                  playersCount={0}
                ></GameStatistics>
              ) : (
                <div>Nothing</div>
              )}
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
  );
}
