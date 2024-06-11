"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface GeneralProviderProp {
  children?: React.ReactNode;
}

interface ISocketContext {
  data: any,
  setData: React.Dispatch<React.SetStateAction<{ name: string; email: string; isAuthenticated: boolean; room:any }>>
}

const GeneralContext = React.createContext<ISocketContext | null>(null);

export const useGeneral = () => {
  const state = useContext(GeneralContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};

export const GeneralProvider: React.FC<GeneralProviderProp> = ({ children }) => {

  const [data, setData] = useState({
    name: '',
    email: '',
    room:[],
    isAuthenticated: true
  })

  useEffect(() => {
    var token = localStorage.getItem('token');
    async function run() {
      var res = await fetch('http://localhost:8001/auth/verifyToken/' + token);
      var result = await res.json()
      if (result.status === 'true') {
        setData({
          email: result.user.email,
          name: result.user.name,
          isAuthenticated: true,
          room: result.user.room
        })
      }
    }
    run()
  }, [])


  return (
    <GeneralContext.Provider value={{ data, setData }}>
      {children}
    </GeneralContext.Provider>
  );
};
