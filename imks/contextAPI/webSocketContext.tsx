import React, { createContext, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { WebsocketLastJsonMessageType } from "../src/websocket/webSocket";

const currentIpAddress = "192.168.1.9";
const socketUrl = `ws://${currentIpAddress}:81/`;

type WebSocketContextType = {
  sendJsonMessage: ReturnType<
    typeof useWebSocket<WebsocketLastJsonMessageType>
  >["sendJsonMessage"];
  lastJsonMessage: WebsocketLastJsonMessageType | null;
};

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<WebsocketLastJsonMessageType>(socketUrl, {
      shouldReconnect: () => true,
      share: true,
    });

  return (
    <WebSocketContext.Provider value={{ sendJsonMessage, lastJsonMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useSharedWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useSharedWebSocket must be used within a WebSocketProvider"
    );
  }
  return context;
};
