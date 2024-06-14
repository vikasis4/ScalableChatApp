import React from 'react'
import { useSocket } from '../context/SocketProvider';

function AddMessage({ room_id, my_id }: any) {

    const [message, setMessage] = React.useState('');
    const socket = useSocket()

    const handleClick = async () => {
        socket.sendMessage(message, room_id, my_id)
        setMessage('')
    }

    return (
        <div className='flex h-12 w-full'>
            <input
                className='bg-gray-200 w-full mr-2 rounded-md shadow-md p-2'
                type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleClick} className='bg-blue-500 px-4 rounded-md text-white hover:cursor-pointer'>Send</button>
        </div>
    )
}

export default AddMessage