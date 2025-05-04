import React from "react";
import useWebSocket from "react-use-websocket";
import { WebsocketLastJsonMessageType } from "../src/websocket/webSocket";
import { createContext } from "./contextApiFactory";

const currentIpAddress = "192.168.1.9";
const socketUrl = `ws://${currentIpAddress}:81/`;

type WebSocketContextType = {
  sendJsonMessage: ReturnType<
    typeof useWebSocket<WebsocketLastJsonMessageType>
  >["sendJsonMessage"];
  lastJsonMessage: WebsocketLastJsonMessageType | null;
};

const [useContext, ContextProvider] = createContext<WebSocketContextType>();

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { sendJsonMessage, lastJsonMessage } =
    useWebSocket<WebsocketLastJsonMessageType>(socketUrl, {
      shouldReconnect: () => true,
      share: true,
    });

  return (
    <ContextProvider value={{ sendJsonMessage, lastJsonMessage }}>
      {children}
    </ContextProvider>
  );
};

export const useSharedWebSocket = () => {
  const context = useContext();
  if (!context) {
    throw new Error(
      "useSharedWebSocket must be used within a WebSocketProvider"
    );
  }
  return context;
};
