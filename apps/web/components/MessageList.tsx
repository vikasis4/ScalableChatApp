import React from 'react'
import { useGeneral } from '../context/General'
import AddMessage from './AddMessage';
import { useSocket } from '../context/SocketProvider';

function MessageList() {

    const general = useGeneral();
    const socket = useSocket();

    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (messagesEndRef.current) {
            console.log('SCROLLED');
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [socket.messages])

    React.useEffect(() => {
        if (general.room.currentRoomId != 'null') {
            async function run() {
                var res = await fetch('http://localhost:8001/message/fetch/' + general.room.currentRoomId + '/1');
                var response = await res.json();
                if (response.status == 'true') {
                    socket.setMessages(response.messages)
                } else {
                    alert('Something went wrong')
                }
            }
            run()
        }
    }, [general.room.currentRoomId])

    return (
        <div className='w-full h-full flex justify-center items-center'>
            {
                general.room.currentRoomId == 'null' ?
                    <h1>Select Chat to Start</h1>
                    :
                    <div className='flex flex-col justify-between items- h-full w-full p-4'>
                        <div ref={messagesEndRef} className='my-4 pr-2 flex flex-col justify-start w-full h-full gap-2 overflow-y-auto'>
                            <Message socket={socket} data={socket.messages} my_id={general.data.id} />
                        </div>
                        <AddMessage room_id={general.room.currentRoomId} my_id={general.data.id} />
                    </div>
            }
        </div>
    )
}

function Message({ data, my_id, socket }: any) {

    var my_style = 'p-2 bg-blue-500 text-white float-right rounded-bl-md rounded-tl-md rounded-tr-md shadow-lg text-xs'
    var oth_style = 'p-2 bg-pink-600 text-white float-left rounded-br-md rounded-tl-md rounded-tr-md shadow-lg text-xs'

    var [render, setState] = React.useState<any>([])

    React.useEffect(() => {
        if (socket.messages.length > 0) {
            var tempData: any = []
            socket.messages.forEach((_data: any) => {
                tempData.push(
                    <div key={_data.id} className='w-full'>
                        <h1 className={_data.userId === my_id ? my_style : oth_style}>{_data.message}</h1>
                    </div>
                )
                })
            setState([...render, ...tempData]);
        }
    }, [data])

    return (
        data.length > 0 ?
            render.map((t: any) => t)
            :
            <div></div>
    )
}

export default MessageList