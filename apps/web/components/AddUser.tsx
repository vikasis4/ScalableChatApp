'use client'
import React from 'react'
import { useGeneral } from '../context/General'
import validRoomRequest from '../utils/vaildRoomRequest';

function AddUser() {

    const general = useGeneral();

    return (
        <div className='shadow-md h-12 w-full flex px-4 justify-between items-center'>
            <h1>{general.data.name}</h1>
            <div className='flex gap-2'>

            <h1 onClick={() => general.setRoom(prev => ({ ...prev, isPopUpSelected: true }))} className='bg-blue-400 text-white px-2 rounded-sm shadow-md hover:cursor-pointer'>+ Add User</h1>
            <h1 onClick={() => { localStorage.removeItem('token'); location.reload() }} className='bg-red-400 text-white px-2 rounded-sm shadow-md hover:cursor-pointer'>Log Out</h1>
            </div>
        </div>
    )
}

export function AddUserQuery() {

    const general = useGeneral();
    const [text, setText] = React.useState('');
    const [user, setUser] = React.useState({
        isAvailable: false,
        email: '',
        name: '',
        userId: ''
    });

    
    const handleChange = (e: any) => { setText(e.target.value) }

    const handleClick = async () => {

        var verify = validRoomRequest(general.data.room, text);

        if (verify) {
            alert('User Already exsists in Chat');
            return
        }

        var res = await fetch('http://localhost:8001/auth/finduser/' + text);
        var result = await res.json();
        if (result.status === 'true') {
            setUser({
                isAvailable: true,
                email: text,
                name: result.user.username,
                userId: result.user.id
            })
            return
        }
        alert('User Not Found')
    }

    const handleRoomClick = async () => {
        const res = await fetch('http://localhost:8001/room/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId1: general.data.id,
                userId2: user.userId,
                name: 'default'
            })
        })
        var response = await res.json();
        if (response.status === 'true') {
            location.reload()
        } else {
            alert('Somwthing went wrong')
        }
    }

    return (
        <div className='p-4'>
            <input type='text' className='shadow-md p-1 w-full rounded-md' onChange={handleChange} value={text} />
            <div className='gap-2 flex my-4 justify-end items-center'>
                <h1 onClick={handleClick} className='text-center bg-blue-400 text-white px-2 rounded-sm shadow-md hover:cursor-pointer w-1/3'>Search</h1>
                <h1 onClick={() => general.setRoom(prev => ({ ...prev, isPopUpSelected: false }))} className='text-center bg-red-400 text-white px-2 rounded-sm shadow-md hover:cursor-pointer w-1/3'>Cancel</h1>
            </div>

            {
                user.isAvailable ?
                    <div className='flex justify-start items-start gap-2 flex-col  text-xs bg-white p-2 rounded-md mt-12 shadow-md'>
                        <h1>Email :- {user.email}</h1>
                        <h1>Username :- {user.name}</h1>
                        <h1 onClick={handleRoomClick} className='text-center py-1 bg-green-700 text-white px-2 rounded-sm shadow-md hover:cursor-pointer w-1/3'>Start Chat</h1>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default AddUser