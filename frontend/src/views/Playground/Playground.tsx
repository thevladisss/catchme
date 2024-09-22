import "./Playground.css"
import BaseButton from "../../components/base/BaseButton";
import GameStatistics from "../../components/GameStatistics";
import DialogSelectCharacter from "../../components/dialogs/DialogSelectCharacter";
import GameContainer from "../../components/GameContainer";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import {useEffect, useMemo, useRef, useState} from "react";
import { GameClientEventEnum } from "../../enums/GameClientEventEnum";
import { GameServerActionsEventEnum } from "../../enums/GameServerActionsEventEnum";
import { GameServerEventSuccessEnum } from "../../enums/GameServerEventSuccessEnum";
import {connectWebSocketServer} from "../../service/websocket";
import {Player} from "../../interface/Player";
import {Connection} from "../../interface/Connection";
import {GameSession} from "../../interface/GameSession";

export default function Playground() {
  const ws = useRef<WebSocket | null>(null)

  const [connectionMetaData, setCurrentConnection] = useState<Connection | null>(null);

  const [isShowingSelectCharacter, showSelectCharacter] = useState(true);



  const handleSaveCharacter = (character: {
    color: string;
    nickname: string;
  }) => {
    showSelectCharacter(false);

    if (ws.current?.readyState === WebSocket.OPEN)
      sendJoinGameEvent({ color: character.color, nickname: character.nickname });
  };

  const [player, setPlayer] = useState<GameSession | null>(null);

  const [players, setGameSessionPlayers] = useState<Player[]>([])

  const playersCount = useMemo(() => players.length, [players])

  const sendSocketEvent = (event: string, payload: Record<string, any> = {}) => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          event,
          ...payload
        })
      )
    }
  }

  const sendJoinGameEvent = (player: { color: string; nickname: string }) => {
      sendSocketEvent(GameClientEventEnum.PLAYER_JOIN, player)
  };

  const sendQuitGameEvent = () => {
      sendSocketEvent(GameClientEventEnum.PLAYER_JOIN)
  }

  const sendPlayerMoveEvent = (position: {left: number; top:number}) => {
    sendSocketEvent(GameClientEventEnum.PLAYER_MOVE, position)
  };

  const handlePositionChange = (position: { left: number; top: number }) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN)
      sendPlayerMoveEvent(position)
  };

  const handleBack = () => {
    showSelectCharacter(false);
  };

  //Handling connection
  useEffect(() => {

    if (!ws.current) {
      ws.current =  connectWebSocketServer();

      ws.current.onmessage = (event: any) => {
        const data = event.data ? JSON.parse(event.data) : null;

        console.log("Message: ", data);

        if (data.event === GameServerEventSuccessEnum.CONNECT) {
          setCurrentConnection({
            connectionId: data.connectionId,
            createdAt: data.createdAt
          });
        }

        if (data.event === GameServerEventSuccessEnum.JOIN_GAME) {

          setPlayer({
            playerId: data.playerId,
            players: data.players,
            nickname: data.nickname,
            color: data.color,
          });
        }

        if (data.event === GameServerActionsEventEnum.PLAYER_CONNECT) {

          setGameSessionPlayers(data.players);
        }

        if (data.event === GameServerActionsEventEnum.PLAYER_CONNECT) {
          //Show event on new user joining
        }

        if (data.event === GameServerActionsEventEnum.PLAYERS_POSITIONS_UPDATE) {

          setGameSessionPlayers(data.players);
        }
      };
    }

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

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
        <Box className="playground-container">
          <Grid container columns={12}>
            <Grid size={10}>
              <GameContainer
                id={connectionMetaData ? connectionMetaData.connectionId : ""}
                players={players}
                onPositionChange={handlePositionChange}
              ></GameContainer>
            </Grid>
            <Grid className="playground-meta" size="grow">
              {player ? (
                <GameStatistics
                  className="h-full"
                  nickname={player.nickname}
                  playersCount={playersCount}
                ></GameStatistics>
              ) : (
                <div className="bg-white h-full">
                  Select character first
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
      <DialogSelectCharacter
        nickname={player ? player.nickname : ''}
        color={player ? player.color : ''}
        onCharacterSaved={handleSaveCharacter}
        onBack={handleBack}
        open={isShowingSelectCharacter}
      ></DialogSelectCharacter>
    </div>
  );
}
