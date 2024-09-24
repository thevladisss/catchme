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
import {JoinGameEvent} from "../../interface/events/JoinGameEvent";
import {PlayerConnectEvent} from "../../interface/events/PlayerConnectEvent";
import {PositionsUpdateEvent} from "../../interface/events/PositionsUpdateEvent";

export default function Playground() {

  const handlePositionChange = (position: { left: number; top: number }) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN)
      sendPlayerMoveEvent(position)
  };

  const handleBack = () => {
    showSelectCharacter(false);
  };

  const [player, setPlayer] = useState<GameSession | null>(null);

  const [players, setGameSessionPlayers] = useState<Player[]>([])

  const playersCount = useMemo(() => players.length, [players])

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


  const getParsedEventData = (event: MessageEvent): any | null => {
    try {
      return JSON.parse(event.data);
    }
    catch {
      return null;
    }
  }

  const handleConnectEvent = (event: MessageEvent<{connectionId: string; createdAt: string }>) => {
    setCurrentConnection({
      connectionId: event.data.connectionId,
      createdAt: event.data.createdAt
    });
  };


  const handleJoinGameEvent = (event: MessageEvent<JoinGameEvent>) => {

    setPlayer({
      playerId: event.data.playerId,
      players: event.data.players,
      nickname: event.data.nickname,
      color: event.data.color,
    });
  }

  const handlePlayerConnectEvent = (event: MessageEvent<PlayerConnectEvent>) => {
    setGameSessionPlayers(event.data.players);
  }

  const handlePositionsUpdateEvent = (event: MessageEvent<PositionsUpdateEvent>) => {
    setGameSessionPlayers(event.data.players);
  }

  //Handling connection
  useEffect(() => {

    if (!ws.current) {
      ws.current =  connectWebSocketServer();

      ws.current.onmessage = (event: MessageEvent) => {
        const data = getParsedEventData(event);

        if (!data) return;

        if (data.event === GameServerEventSuccessEnum.CONNECT) {
          handleConnectEvent(event)
        }

        if (data.event === GameServerEventSuccessEnum.JOIN_GAME) {
          handleJoinGameEvent(event)
        }

        if (data.event === GameServerActionsEventEnum.PLAYER_CONNECT) {
          handlePlayerConnectEvent(event);
        }

        if (data.event === GameServerActionsEventEnum.PLAYERS_POSITIONS_UPDATE) {
          handlePositionsUpdateEvent(event)
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
                <div className="bg-white flex flex-col p-4">
                    <BaseButton
                      className="w-full"
                      variant="outlined"
                      onClick={() => {
                        showSelectCharacter(true);
                      }}
                      color="primary"
                    >
                      Start game
                    </BaseButton>
                  </div>
                <GameStatistics
                  className="grow"
                  nickname={player ? player.nickname : ''}
                  playersCount={playersCount}
                ></GameStatistics>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
