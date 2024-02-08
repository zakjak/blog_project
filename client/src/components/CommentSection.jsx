import React, { useEffect, useState } from 'react'
import { Button, Textarea } from 'flowbite-react'
import { useSelector } from 'react-redux'
import Comment from './Comment'

function CommentSection({ postId }) {
    const [comment, setComment] = useState('')
    const { currentUser } = useSelector(state => state.user)
    const [comments, setComments] = useState([])

    const submitComment = async (e) => {
        e.preventDefault()
        const rawData = {
            postId: postId,
            comment,
            userId: currentUser._id
        }
        const res= await fetch('/api/comment/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(rawData)
        })

        const data = await res.json()
        if(res.ok){
            setComment('')
            setComments([data, ...comments])
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try{
                const res = await fetch(`/api/comment/getComments/${postId}`)
                const data = await res.json()

                if(res.ok){
                    setComments(data)
                }
            }catch(err){
                console.log(err)
            }

        }
        getComments()
    }, [postId])

    const formatCount = (count) => {
        if(count >= 1000000){
            return (count / 1000000).toFixed(1) + 'M'
        }else if (count >= 1000){
            return (count / 1000).toFixed(1) + 'K'
        }else{
            return count?.toString()
        }
    }


  return (
    <div className='w-[85%] mx-auto mb-4'>
        <form onSubmit={submitComment}>
            <div className="border-b pb-4 border-gray-400 mb-5">
                    {
                        comments.totalComments ? (
                            <h1>Comments: {formatCount(comments?.totalComments)} </h1>
                        ): (
                            <p>No comments</p>
                        )
                    }
                
                
            </div>
           
                <div className='flex gap-2 mb-4'>
                    <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder='Enter comment...' id='comment' />
                    <Button type='submit' color='dark' className=''>Submit</Button>
                </div>
                {
                    comments?.comments?.map(comment =>(
                        <Comment key={comment?._id} comments={comment} />
                    ))
                }
              
        </form>
    </div>
  )
}

export default CommentSection