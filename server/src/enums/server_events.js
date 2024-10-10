//Notifying all clients on certain client's on actions

const NEW_USER_CONNECT = "new_user_connect";

const USER_DISCONNECT = "user_disconnect";

const PLAYER_CONNECT = "player_connect";

const PLAYER_LEFT = "player_left";

const PLAYERS_POSITIONS_UPDATE = "players_positions_update";


//Responding to user actions
const CONNECT_SUCCESS = "connect_success";

const DISCONNECT_SUCCESS = "disconnect_success";

const JOIN_GAME_SUCCESS = "join_game_success";

const POINTS_APPEAR = "points_appear"

const POINT_PICK = "point_pick"

const PAUSE_GAME_SUCCESS = "pause_game_success";

const QUIT_GAME_SUCCESS = "quit_game_success";

const MOVE_SUCCESS = "user_moved_success";

const LOG_MESSAGE = "log_message"


module.exports = {
  NEW_USER_CONNECT,
  USER_DISCONNECT,
  PLAYER_CONNECT,
  PLAYER_LEFT,
  PLAYERS_POSITIONS_UPDATE,

  CONNECT_SUCCESS,
  DISCONNECT_SUCCESS,
  JOIN_GAME_SUCCESS,
  PAUSE_GAME_SUCCESS,
  QUIT_GAME_SUCCESS,
  MOVE_SUCCESS,
  POINT_PICK,
  POINTS_APPEAR,
  LOG_MESSAGE
};
