"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";


interface GeneralProviderProp {
  children?: React.ReactNode;
}

interface ISocketContext {
  data: any,
  room: any,
  setRoom: React.Dispatch<React.SetStateAction<{ currentRoomId: string, isPopUpSelected: boolean }>>
  setData: React.Dispatch<React.SetStateAction<{ id: string, name: string; email: string; isAuthenticated: boolean; room: any }>>
}

const GeneralContext = React.createContext<ISocketContext | null>(null);

export const useGeneral = () => {
  const state = useContext(GeneralContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const GeneralProvider: React.FC<GeneralProviderProp> = ({ children }) => {

  const [data, setData] = useState({
    id: '',
    name: '',
    email: '',
    room: [],
    isAuthenticated: false
  });

  const [room, setRoom] = useState({
    currentRoomId: 'null',
    isPopUpSelected: false,
  })

  const socket = useSocket();

  useEffect(() => {
    var token = localStorage.getItem('token');
    async function run() {
      var res = await fetch('http://localhost:8001/auth/verifyToken/' + token);
      var result = await res.json()
// console.log(result);

      if (result.status === 'true') {
        setData({
          id: result.user.id,
          email: result.user.email,
          name: result.user.username,
          isAuthenticated: true,
          room: result.user.room
        })
      }
    }
    run()
  }, [])

  //////////// JOIN ROOM /////////
  useEffect(() => {
    if (socket.socket && data.isAuthenticated) {
      var id_arr: string[] = [];
      data.room.forEach((id_data: any) => {
        id_arr.push(id_data.roomId)
      })
      socket.joinRoom(id_arr)
    }
  }, [data, socket.socket])


  return (
    <GeneralContext.Provider value={{ data, setData, room, setRoom }}>
      {children}
    </GeneralContext.Provider>
  );
};
