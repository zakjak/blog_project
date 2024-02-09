import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { HiDotsHorizontal } from "react-icons/hi";
import { Dropdown } from 'flowbite-react'

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
    <div className=''>
        <div className="flex justify-between items-center mb-2">
            <div className='flex gap-2'>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img src={user.profilePicture} alt="" />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className='text-black text-sm dark:text-gray-300'>{user.username}</span>
                        <span className='text-gray-400'>-</span>
                        <span className='text-xs text-gray-400'>
                            {moment(comments.createdAt).fromNow()}
                        </span>
                    </div>
                    <span className='text-sm '>
                        {comments.comment}
                    </span>
                </div>
            </div>
            <Dropdown className='cursor-pointer' label="" dismissOnClick={false} renderTrigger={() => <HiDotsHorizontal />}>
                <Dropdown.Item>Dashboard</Dropdown.Item>
            </Dropdown>
        </div>
        <div className=""></div>
    </div>
  )
}

export default Comment