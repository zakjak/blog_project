import { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { useSelector } from 'react-redux'
import Comment from './Comment'
import { formatCount } from '../lib/Common'

function CommentSection({ postId }) {
    const [comment, setComment] = useState([])
    const { currentUser } = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const [showMore, setShowMore] = useState(true)

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
            setComment([])
            getComments()
        }

       
    }

    useEffect(() => {
        getComments()
    }, [postId])



    const handleChange = (e) => {
        const paragraphs = e.target.innerText.split('\n')

        const updatedContent = paragraphs.map((para) => (
            `<p>${para}</p>`
        ))

        setComment(updatedContent)
    }

    const handleShowMore = async () => {
        const startIndex = comments.comments.length

        try{
            const res = await fetch(`/api/comment/getComments/${postId}?startIndex=${startIndex}`)
            const data = await res.json()
            console.log(data.comments.comments)
            
            comments
            if(res.ok){
                setComments((prev) => [...prev.comments])
                console.log(comments)
                if(data.comments.comments.length < 9){
                    setShowMore(false)
                }
            }
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='w-[85%] mx-auto mb-4'>
        <form>
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
                    <span style={{height: '3rem', border: '1px solid gray', borderRadius: '5px', outline: 'none', padding: '3px 4px', fontSize: '.8rem', fontWeight: '300', overflow: 'hidden'}} onInput={handleChange} content={comment} contentEditable className='w-full text-area editableDiv' />
                    <Button onClick={submitComment} color='dark' className=''>Submit</Button>
                </div> 
        </form>
        {
            comments?.comments?.map(comment =>(
                <Comment key={comment?._id} comments={comment} />
            ))
        }
        <div className='flex justify-center'>
            <Button className='dark:text-black text-white' onClick={handleShowMore} >Show more comments</Button>
        </div>
    </div>
  )
}

export default CommentSection