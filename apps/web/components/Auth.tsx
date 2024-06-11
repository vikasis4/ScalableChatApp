import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGeneral } from '../context/General';
import { useRouter } from 'next/navigation';

function Auth() {

    const general = useGeneral();
    const router = useRouter()


    const handleAuth = async (credentialResponse: any) => {
        var data = await jwtDecode<any>(credentialResponse.credential);
        await fetch('http://localhost:8001/auth/handleAuth', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                email: data.email,
                key: data.jti,
                username: data.name
            }),
        }).then(async (resposne) => {
            var result = await resposne.json();
            console.log(result);
            function run() {
                localStorage.setItem('token', result.data.token);
                
                general.setData(prev => ({
                    ...prev,
                    id:result.data.user.id,
                    email: result.data.user.email,
                    name: result.data.user.username,
                    room: result.data.user.room,
                    isAuthenticated: true,
                }))
            }
            result.status === 'true' ? run() : alert('Something went wrong');
        })
    }

    React.useEffect(() => {
        if (general.data.isAuthenticated) {
            router.push('/chat')
        }
    }, [general.data])

    return (
        <div className='h-1/2 w-1/2 bg-white shadow-md rounded-md flex justify-center items-center'>
            <GoogleLogin
                onSuccess={handleAuth}
                onError={() => { alert('Something went wrong') }}
            />
        </div >
    )
}

export default Auth