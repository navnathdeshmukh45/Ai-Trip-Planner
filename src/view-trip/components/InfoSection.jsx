import React from 'react'
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  return (
    <div>
      <img src="/placeholder.jpeg" className='h-[340px] w-full object-cover rounded-xl' />

    <div className='flex justify-between items-center'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className="font-bold text-2xl ">
          {trip?.userSelection?.destination || 'Trip Details'}
        </h2>
        <div className="text-gray-600 flex gap-5">
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xm md:text-md'> 📅 Duration: {trip?.userSelection?.days || '0'} days</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500  text-xm md:text-md'> 💸 Budget: {trip?.userSelection?.budget || 'Not specified'}</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500  text-xm md:text-md'> 🌍 Travelers: {trip?.userSelection?.travelers || 'Not specified'}</h2>
        </div>
      </div>
      <button className='size-6'><IoIosSend /></button>
 
      </div>   
    </div>
  )
}

export default InfoSection