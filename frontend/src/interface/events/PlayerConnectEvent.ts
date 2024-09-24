import {WebsocketCustomEvent} from "./WebsocketCustomEvent";
import {Player} from "../Player";

export type PlayerConnectEvent = WebsocketCustomEvent & {
  players: Player[]
};
