"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface GeneralProviderProp {
  children?: React.ReactNode;
}

interface ISocketContext {
  data: any,
  room: any,
  setRoom: React.Dispatch<React.SetStateAction<{ currentRoomId: string, isPopUpSelected: boolean }>>
  setData: React.Dispatch<React.SetStateAction<{id:string, name: string; email: string; isAuthenticated: boolean; room: any }>>
}

const GeneralContext = React.createContext<ISocketContext | null>(null);

export const useGeneral = () => {
  const state = useContext(GeneralContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const GeneralProvider: React.FC<GeneralProviderProp> = ({ children }) => {

  const [data, setData] = useState({
    id:'',
    name: '',
    email: '',
    room: [],
    isAuthenticated: false
  });

  const [room, setRoom] = useState({
    currentRoomId: 'null',
    isPopUpSelected: false,
  })

  useEffect(() => {
    var token = localStorage.getItem('token');
    async function run() {
      var res = await fetch('http://localhost:8001/auth/verifyToken/' + token);
      var result = await res.json()
            
      if (result.status === 'true') {
        setData({
          id:result.user.id,
          email: result.user.email,
          name: result.user.username,
          isAuthenticated: true,
          room: result.user.room
        })
      }
    }
    run()
  }, [])


  return (
    <GeneralContext.Provider value={{ data, setData, room, setRoom }}>
      {children}
    </GeneralContext.Provider>
  );
};
