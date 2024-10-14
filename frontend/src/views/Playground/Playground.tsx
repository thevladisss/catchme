import "./Playground.css";
import BaseButton from "../../components/base/BaseButton";
import PlaygroundPanel from "../../components/PlaygroundPanel";
import GameContainer from "../../components/GameContainer";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { connectWebSocketServer } from "../../service/websocket";
import { GameClientEventEnum } from "../../enums/GameClientEventEnum";
import { GameServerActionsEventEnum } from "../../enums/GameServerActionsEventEnum";
import { GameServerEventSuccessEnum } from "../../enums/GameServerEventSuccessEnum";
import { Player } from "../../interface/Player";
import { Connection } from "../../interface/Connection";
import { GameSession } from "../../interface/GameSession";
import { JoinGameEvent } from "../../interface/events/JoinGameEvent";
import { PlayerConnectEvent } from "../../interface/events/PlayerConnectEvent";
import { PositionsUpdateEvent } from "../../interface/events/PositionsUpdateEvent";
import { PointsSpawnEvent } from "../../interface/events/PointsSpawnEvent";

export default function Playground(props?: React.HTMLProps<any>) {
  const handlePositionChange = (position: { left: number; top: number }) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN)
      sendPlayerMoveEvent(position);
  };

  const [player, setPlayer] = useState<GameSession | null>(null);

  const updateScore = (value: number) => {

      setPlayer((player) => {
        return player ?  {
          ...player,
          score: value
        } : player;
      })
  }

  const [players, setGameSessionPlayers] = useState<Player[]>([]);

  const playersCount = useMemo(() => {
    return players.length;
  }, [players]);

  const ws = useRef<WebSocket | null>(null);

  const [connectionMetaData, setCurrentConnection] =
    useState<Connection | null>(null);

  const handleStartGame = () => {
    if (ws.current?.readyState === WebSocket.OPEN) sendJoinGameEvent();
  };

  const sendSocketEvent = (
    event: string,
    payload: Record<string, any> = {},
  ) => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          event,
          ...payload,
        }),
      );
    }
  };

  const sendJoinGameEvent = () => {
    sendSocketEvent(GameClientEventEnum.PLAYER_JOIN);
  };

  const sendQuitGameEvent = () => {
    sendSocketEvent(GameClientEventEnum.PLAYER_JOIN);
  };

  const sendPlayerMoveEvent = (position: { left: number; top: number }) => {
    sendSocketEvent(GameClientEventEnum.PLAYER_MOVE, position);
  };

  const getParsedEventData = (event: MessageEvent): any | null => {
    try {
      return JSON.parse(event.data);
    } catch {
      return null;
    }
  };

  const handleConnectEvent = (
    event: MessageEvent<{ connectionId: string; createdAt: string }>,
  ) => {
    setCurrentConnection({
      connectionId: event.data.connectionId,
      createdAt: event.data.createdAt,
    });
  };

  const handleJoinGameEvent = (event: MessageEvent<JoinGameEvent>) => {
    setPlayer({
      playerId: event.data.playerId,
      players: event.data.players,
      nickname: event.data.nickname,
      color: event.data.color,
      score: 0
    });
  };

  const handlePlayerConnectEvent = (
    event: MessageEvent<PlayerConnectEvent>,
  ) => {
    setGameSessionPlayers(event.data.players);
  };

  const handlePositionsUpdateEvent = (
    event: MessageEvent<PositionsUpdateEvent>,
  ) => {
    setGameSessionPlayers(event.data.players);
  };

  const [points, setPoints] = useState<any[]>([]);

  const handlePointsSpawnEvent = (event: MessageEvent<PointsSpawnEvent>) => {
    setPoints(event.data.points);
  };

  const [gameLogs, setLogs] = useState<string[]>([]);

  const handleLogMessageEvent = (event: MessageEvent<{ message: string }>) => {
    setLogs((prevState) => {
      return [event.data.message, ...prevState];
    });
  };

  //Handling connection
  useEffect(() => {
    if (!ws.current) {
      ws.current = connectWebSocketServer();

      ws.current.onmessage = (event: MessageEvent) => {
        const data = getParsedEventData(event);

        let eventWithData = event;

        if (data) {
          eventWithData = { ...event, data };
        }

        if (data.event === GameServerEventSuccessEnum.CONNECT) {
          handleConnectEvent(eventWithData);
        }

        if (data.event === GameServerEventSuccessEnum.JOIN_GAME) {
          handleJoinGameEvent(eventWithData);
        }

        if (data.event === GameServerActionsEventEnum.PLAYER_CONNECT) {
          handlePlayerConnectEvent(eventWithData);
        }

        if (
          data.event === GameServerActionsEventEnum.PLAYERS_POSITIONS_UPDATE
        ) {
          handlePositionsUpdateEvent(eventWithData);
        }

        if (data.event === GameServerActionsEventEnum.POINTS_APPEAR) {
          handlePointsSpawnEvent(eventWithData);
        }

        if (data.event == GameServerActionsEventEnum.POINT_PICK) {
          //update handler
          updateScore((eventWithData.data as any).score)
        }

        if (data.event === GameServerActionsEventEnum.LOG_MESSAGE) {
          handleLogMessageEvent(eventWithData);
        }
      };
    }

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return (
    <div>
      <div style={{ width: "1000px" }} className="px-4 mx-auto">
        <PlaygroundPanel
          isInGame={Boolean(player)}
          score={player ? player.score : 0}
          onStartGame={handleStartGame}
        ></PlaygroundPanel>
        <GameContainer
          id={connectionMetaData ? connectionMetaData.connectionId : ""}
          players={players}
          points={points}
          onPositionChange={handlePositionChange}
        ></GameContainer>
      </div>
    </div>
  );
}
