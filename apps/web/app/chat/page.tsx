'use client'
import React from 'react'
import { useGeneral } from '../../context/General'
import { useRouter } from 'next/navigation';
import AddUser, { AddUserQuery } from '../../components/AddUser';
import ChatList from '../../components/ChatList';
import MessageList from '../../components/MessageList';

function page() {

  const general = useGeneral();
  const router = useRouter()

  React.useEffect(() => {
    if (!general.data.isAuthenticated) {
      router.push('/')
    }
  }, [general.data])

  return (
    <div className='bg-gray-400 h-screen w-screen flex justify-center items-center'>
      <div className='bg-white w-4/5 h-4/5 flex justify-center items-center rounded-md shadow-md'>
        {
          general.room.isPopUpSelected ?
            <div className=' bg-gray-200 h-full w-1/2 rounded-bl-md rounded-tl-md'>
              <AddUserQuery />
            </div>
            :
            <div className=' bg-gray-200 h-full w-1/2 rounded-bl-md rounded-tl-md'>
              <AddUser />
              <ChatList />
            </div>
        }
        <div className=' bg-white h-full w-full rounded-md'>
          <MessageList />
        </div>
      </div>
    </div>
  )
}

export default page