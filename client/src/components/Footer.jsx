import React from 'react'
import { FaRegCopyright } from "react-icons/fa6";

function Footer() {
  
  return (
    <div className='w-full gap-2 bg-gray-800 h-14 flex justify-center items-center'>
      <FaRegCopyright />
      <span>{new Date().getFullYear()}</span>
      <span>Gh Media</span>
    </div>
  )
}

export default Footer