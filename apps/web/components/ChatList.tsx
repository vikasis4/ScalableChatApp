import React from 'react'
import { useGeneral } from '../context/General'
import roomName from '../utils/roomName';

function ChatList() {

  const general = useGeneral();

  return (
    <div className='py-8 px-4'>
      {
        general.data.room.map((data: any) => {
          return <ChatComp key={data.id} data={data} general={general} />
        })
      }
    </div>
  )
}

function ChatComp({ data, general }: any) {

  var result = roomName(data.users, general.data.id);

  const handleClick = ()=>{
    general.setRoom({
      currentRoomId: data.roomId,
    isPopUpSelected: false,
    })
  }

  return (
    <div className='p-2 bg-white items-center text-xs flex justify-between px-2 rounded-md shadow-md w-full h-full'>
      <div>
        <h1>{result.name}</h1>
      </div>
      <button onClick={handleClick} className='py-1 bg-green-700 shadow-md rounded-md hover:cursor-pointer px-2 text-white'>Open Chat</button>
    </div>
  )
}

export default ChatList