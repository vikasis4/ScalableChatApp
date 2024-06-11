"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import Auth from "../components/Auth";


export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div className="bg-gray-300 h-screen w-screen flex justify-center items-center">
      <Auth />
    </div>
  );
}
