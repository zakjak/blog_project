import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { HiDotsHorizontal } from "react-icons/hi";

function Comment({ comments }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch(`/api/user/${comments?.userId}`)
            const data = await res.json()
            
            if(res.ok){
                setUser(data)
            }
        }
        getUsers()
    }, [])

  return (
    <div className='flex mb-2 justify-between'>
        <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={user.profilePicture} alt="" />
            </div>
            <div className="flex flex-col">
                <span className='text-sm '>
                    {comments.comment}
                </span>
                <span className='text-xs text-gray-400'>
                    {moment(comments.createdAt).fromNow()}
                </span>
            </div>
        </div>
        <div className=''>
            <HiDotsHorizontal className='cursor-pointer' />
        </div>
    </div>
  )
}

export default Comment