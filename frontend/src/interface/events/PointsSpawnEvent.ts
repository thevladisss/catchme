import {WebsocketCustomEvent} from "./WebsocketCustomEvent";
import {Point} from "../Point";

export type PointsSpawnEvent = WebsocketCustomEvent & {
  points: Point[]
}
