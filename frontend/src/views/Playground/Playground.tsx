import "./Playground.css"
import BaseButton from "../../components/base/BaseButton";
import GameStatistics from "../../components/GameStatistics";
import GameContainer from "../../components/GameContainer";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import React, {useEffect, useMemo, useRef, useState} from "react";
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
import {PointsSpawnEvent} from "../../interface/events/PointsSpawnEvent";

export default function Playground(props?: React.HTMLProps<any>) {

  const handlePositionChange = (position: { left: number; top: number }) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN)
      sendPlayerMoveEvent(position)
  };

  const [player, setPlayer] = useState<GameSession | null>(null);

  const [players, setGameSessionPlayers] = useState<Player[]>([])

  const playersCount = useMemo(() => {
    return players.length
  }, [players])

  const ws = useRef<WebSocket | null>(null)

  const [connectionMetaData, setCurrentConnection] = useState<Connection | null>(null);

  const handleSaveCharacter = () => {
    if (ws.current?.readyState === WebSocket.OPEN)
      sendJoinGameEvent();
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

  const sendJoinGameEvent = () => {
      sendSocketEvent(GameClientEventEnum.PLAYER_JOIN)
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

  const [points, setPoints] = useState<any[]>([])

  const handlePointsSpawnEvent = (event: MessageEvent<PointsSpawnEvent>) => {
    setPoints(event.data.points as any)
  }

  //Handling connection
  useEffect(() => {

    if (!ws.current) {
      ws.current =  connectWebSocketServer();

      ws.current.onmessage = (event: MessageEvent) => {

        console.log(event)
        const data = getParsedEventData(event);

        let eventWithData = event;

        if (data) {
          eventWithData = {...event, data}
        }

        if (data.event === GameServerEventSuccessEnum.CONNECT) {
          handleConnectEvent(eventWithData)
        }

        if (data.event === GameServerEventSuccessEnum.JOIN_GAME) {
          handleJoinGameEvent(eventWithData)
        }

        if (data.event === GameServerActionsEventEnum.PLAYER_CONNECT) {
          handlePlayerConnectEvent(eventWithData);
        }

        if (data.event === GameServerActionsEventEnum.PLAYERS_POSITIONS_UPDATE) {
          handlePositionsUpdateEvent(eventWithData)
        }

        if(data.event === "points_appear") {
          handlePointsSpawnEvent(eventWithData)
        }
      };
    }

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return (
    <div>
      <Box className="playground-container">
          <Grid container columns={12}>
            <Grid size={10}>
              <GameContainer
                id={connectionMetaData ? connectionMetaData.connectionId : ""}
                players={players}
                points={points}
                onPositionChange={handlePositionChange}
              ></GameContainer>
            </Grid>
            <Grid className="playground-meta" size="grow">
                <div className="bg-white flex flex-col p-4">
                  {player ?
                    <BaseButton variant="contained">
                      Pause Game
                    </BaseButton>
                    :
                    <BaseButton
                      className="w-full"
                      variant="contained"
                      onClick={handleSaveCharacter}
                      color="primary"
                    >
                      Start game
                    </BaseButton>
                  }
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
  );
}
