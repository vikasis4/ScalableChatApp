"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: string, roomId: string, userId: string) => any;
  joinRoom: (roomIds: string[]) => any;
  messages: string[];
  socket: any,
  setMessages: React.Dispatch<React.SetStateAction<string[]>>
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<any[]>([]);


  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg, roomId, userId) => {
      if (socket) {
        console.log("Send Message", msg);
        socket.emit("event:message", { message: msg, roomId, userId });
      }
    }, [socket]);

  const joinRoom: any = useCallback(
    (roomIds: string[]) => {
      if (socket) {
        console.log("Joining Rooms ", roomIds);
        socket.emit("event:joinRoom", { roomIds });
      }
    }, [socket]);

  const onMessageRec = useCallback((msg: string) => {
    console.log("From Server Msg Rec", msg);
    const { message, userId, roomId } = JSON.parse(msg);
    // setMessages((prev) => [...prev, {message, userId, roomId}]);
    setMessages([{message, userId, roomId, id:JSON.stringify(Math.random()*1000000)}]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageRec);

    setSocket(_socket);

    return () => {
      _socket.off("message", onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages, setMessages, joinRoom, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
