const { uniqueId } = require("lodash/util");

/**
 * @typedef Player {{
 *   playerId: string
 *   nickname: string
 *   left: number;
 *   top: number;
 *   color: string
 * }}
 */
/**
 *
 * @type {Map<WebSocket, Player>}
 */
const Players = new Map();

/**
 *
 * @param connection {WebSocket}
 * @param player {{ nickname: string; color:string }}
 * @return {Player}
 */
const initializePlayer = (connection, player) => {
  Players.set(connection, {
    playerId: uniqueId(),
    nickname: player.nickname,
    left: 0,
    top: 0,
    color: player.color,
  });

  return Players.get(connection);
};

/**
 *
 * @param connection {WebSocket}
 * @param left {number}
 * @param top {number}
 * @return { { left: number; top: number; } }
 */
const updatePlayerPosition = (connection, left, top) => {
  const player = Players.get(connection);

  if (player) {
    Players.set(connection, { ...player, left, top });

    return { left, top };
  }

  return { left: player.left, top: player.top };
};

const removePlayer = (connection) => {
  if (Players.has(connection)) {
    Players.delete(connection);

    return true;
  }

  return false;
};

/**
 *
 * @return {Map<WebSocket, Player>}
 */
const getAllPlayers = () => {
  return Players;
};

/**
 *
 * @param ws {WebSocket}
 * @return {Player | undefined}
 */
const getPlayer = (ws) => {
  return Players.get(ws);
};

/**
 *
 * @return { Record<string, { left: number; top: number; }> }
 */
const getPlayersPositions = () => {
  return [...Players.values()].reduce((accum, player) => {
    accum[player.playerId] = { left: player.left, top: player.top };

    return accum;
  }, {});
};

module.exports = {
  initializePlayer,
  removePlayer,
  getAllPlayers,
  getPlayer,
  updatePlayerPosition,
  getPlayersPositions,
};
