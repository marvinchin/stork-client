import socketio from "socket.io-client";

import { newMessageEvent } from "./ActionCreators/TradeActionCreators";
import config from "../config";

const NEW_MESSAGE_EVENT = "new-message";
const socket = socketio(config.SOCKET_URL);

function sendSocketEvent(event, data) {
  socket.emit(event, data);
}

export function setUser(user) {
  sendSocketEvent("set-user", user);
}

export function unsetUser() {
  sendSocketEvent("unset-user");
}

export const socketMiddleware = store => {
  socket.on(NEW_MESSAGE_EVENT, tradeId => {
    store.dispatch(newMessageEvent(tradeId));
  });

  return next => action => {
    return next(action);
  };
};
