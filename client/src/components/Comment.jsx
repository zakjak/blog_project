import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Dropdown } from 'flowbite-react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

function Comment({ comments }) {
    const [user, setUser] = useState({})
    const { currentUser } = useSelector(state => state.user)
    const [readMore, setReadMore] = useState(false)

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

    useEffect(() => {
        const textContainer = document.querySelector('.text-container')
        const text = document.getElementById('clamp-text')

        const lineHeight = parseFloat(getComputedStyle(text).lineHeight)
        const maxLines = 2

        const fullHeight = lineHeight * maxLines

        if(text.clientHeight > fullHeight){
            textContainer.style.maxHeight = `${fullHeight}px`
        }

    }, [])

    const handleToggle = () => {
        setReadMore(!readMore)
    }

    const commentClasses = classNames({
        'text-sm': true,
        'overflow-hidden': !readMore,
        'max-h-16': !readMore
    })

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
                    <div className="text-container" id='clamp-text'>
                        <span dangerouslySetInnerHTML={{__html: comments.comment}} className={commentClasses}></span>
                        {comments.comment.split('\n').length > 1 && (
                            <span className='text-sm font-semibold cursor-pointer' onClick={handleToggle}>
                                {readMore ? 'Read Less' : 'Read more'}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className='cursor-pointer' >
            <Dropdown 
                label="" 
                dismissOnClick={false} 
                renderTrigger={() => <span><HiOutlineDotsVertical /></span>}
                >
                    {
                        currentUser._id === comments.userId  ? (
                            <>
                            <Dropdown.Item>Delete</Dropdown.Item> 
                            <Dropdown.Item>Report</Dropdown.Item> 
                            <Dropdown.Item>Update</Dropdown.Item>
                            </>
                        ) : (
                            <Dropdown.Item>Report</Dropdown.Item> 
                        )
                    }
                </Dropdown>
            </div>
        </div>
        <div className=""></div>
    </div>
  )
}

export default Comment