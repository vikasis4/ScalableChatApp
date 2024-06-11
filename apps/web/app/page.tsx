"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";



export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div className="">


      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="text-3xl m-4 bg-emerald-400 p-4 rounded-md"
        />
        <button
          onClick={(e) => sendMessage(message)}
        >
          Send
        </button>
      </div>
      <div>
        {messages.map((e) => (
          <li>{e}</li>
        ))}
      </div>
    </div>
  );
}
