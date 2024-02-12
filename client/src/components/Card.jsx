import { Link } from 'react-router-dom'
import { postViews } from '../lib/Common'
import { useEffect } from 'react'

function Card({ post }) {


    const handleClick = () => {
      postViews(post._id)
      window.history.pushState(`/article/${post._id}`)
      window.location.reload()
    }

  return (
    <Link onClick={handleClick}  to={`/article/${post._id}`} className='w-full opacity-85 rounded-t-lg drop-shadow-2xl bg-[#10172B] cursor-pointer hover:opacity-100 transition-all duration-100'>
        <img className='w-full rounded-t-md h-[11em] object-cover' src={post?.image} alt="" />
        <div className=" mt-1 p-4 flex flex-col gap-1 justify-between items-start">
            <h1 className='font-semiboldtext-lg line-clamp-2'>{post?.title}</h1>
            <div className='line-clamp-3 font-thin text-[.65em] text-gray-400' dangerouslySetInnerHTML={{__html: post?.content}}></div>
            <span className='bg-black px-2 rounded-md text-white text-sm tracking-wider'>{post?.category}</span>
        </div>
    </Link>
  )
}

export default Card