const { uniqueId } = require("lodash/util");
/**
 *
 * @type {Map<WebSocket, {
 *  id: string;
 *  createdAt: number;
 * }>}
 */
const Clients = new Map();

/**
 *
 * @param connection
 * @return { {id: string, createdAt: number }}
 */
const storeConnection = (connection) => {
  const id = uniqueId(),
    createdAt = Date.now();

  Clients.set(connection, { id, createdAt });

  return Clients.get(connection);
};

/**
 *
 * @param connection {WebSocket}
 * @return {boolean}
 */
const removeConnection = (connection) => {
  if (Clients.has(connection)) {
    Clients.delete(connection);

    return true;
  }

  return false;
};

const getConnectionsCount = () => {
  return Clients.size;
};

/**
 *
 * @return {Map<WebSocket, {id: string, createdAt: number}>}
 */
const getAllConnections = () => {
  return Clients;
};

module.exports = {
  storeConnection,
  removeConnection,
  getConnectionsCount,
  getAllConnections,
};
