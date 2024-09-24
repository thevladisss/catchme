import {WebsocketCustomEvent} from "./WebsocketCustomEvent";
import {Player} from "../Player";

export type JoinGameEvent = WebsocketCustomEvent & {
  playerId: string;
  players: Record<string, Player>
  nickname: string;
  color: string;
};
