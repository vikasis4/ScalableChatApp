'use client'
import React from 'react'
import { useGeneral } from '../../context/General'
import { useRouter } from 'next/navigation';

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
        <div className=' bg-emerald-500 h-full w-1/2'>

        </div>
        <div className=' bg-red-400 h-full w-full'>

        </div>
      </div>
    </div>
  )
}

export default page