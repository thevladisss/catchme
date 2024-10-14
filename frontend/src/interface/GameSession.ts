import {Player} from "./Player";

export type GameSession = {
  playerId: string;
  players: Record<string, Player>;
  nickname: string;
  color: string;
  score: number
}
