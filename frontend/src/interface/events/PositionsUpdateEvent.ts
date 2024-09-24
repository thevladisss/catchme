
import {WebsocketCustomEvent} from "./WebsocketCustomEvent";
import {Player} from "../Player";

export type PositionsUpdateEvent = WebsocketCustomEvent & {
  players: Player[];
}
