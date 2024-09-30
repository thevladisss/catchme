const { uniqueId } = require("lodash/util");

//TODO: REMOVE
 function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


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
 * @return {Player}
 */
const initializePlayer = (connection) => {

  const playerId = uniqueId(), color = getRandomColor(), nickname = `Player ${playerId}`;

  Players.set(connection, {
    playerId,
    nickname,
    left: 0,
    top: 0,
    color,
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
